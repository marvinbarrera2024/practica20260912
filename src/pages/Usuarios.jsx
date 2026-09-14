import { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UsuarioTable from '../components/usuarios/UsuarioTable';
import UsuarioDialog from '../components/usuarios/UsuarioDialog';
import { usuarioService } from '../services/usuario.service';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchUsuarios = async () => {
    try {
      const data = await usuarioService.getAll();
      setUsuarios(data);
    } catch (err) {
      setErrorMsg('Error al cargar la lista de usuarios');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleCreate = () => {
    setSelectedUsuario(null);
    setDialogOpen(true);
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Desea eliminar este usuario?')) {
      try {
        await usuarioService.delete(id);
        fetchUsuarios();
      } catch (err) {
        setErrorMsg('Error al eliminar el usuario');
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedUsuario) {
        const payload = { ...data };
        if (!payload.password || payload.password.trim() === '') {
          delete payload.password;
        }
        const id = selectedUsuario.id || selectedUsuario._id;
        await usuarioService.update(id, payload);
      } else {
        await usuarioService.create(data);
      }
      setDialogOpen(false);
      fetchUsuarios();
    } catch (err) {
      setErrorMsg(err.response?.data?.mensaje || 'Error al guardar el usuario');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Gestión de Usuarios</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Nuevo Usuario
        </Button>
      </Box>

      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

      <UsuarioTable usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />

      <UsuarioDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        usuario={selectedUsuario}
      />
    </Box>
  );
}