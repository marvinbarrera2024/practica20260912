import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EstudianteTable from '../components/estudiantes/EstudianteTable';
import EstudianteDialog from '../components/estudiantes/EstudianteDialog';
import EstudianteFilter from '../components/estudiantes/EstudianteFilter';
import { estudianteService } from '../services/estudiante.service';

export default function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0); // Base 0 para MUI (0 = Página 1)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({});

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Petición al servidor cuando cambie page, rowsPerPage o filters
  const fetchEstudiantes = useCallback(async () => {
    try {
      const response = await estudianteService.getAll({
        page: page + 1, // backend espera base 1 (1, 2, 3...)
        limit: rowsPerPage, // limite por página (10, 25...)
        ...filters
      });

      // Extraer datos de la estructura que retorna tu controlador Express
      setEstudiantes(response.datos || []);
      setTotal(response.totalDocumentos || 0);
    } catch (err) {
      setErrorMsg('Error al cargar la lista de estudiantes');
    }
  }, [page, rowsPerPage, filters]);

  useEffect(() => {
    fetchEstudiantes();
  }, [fetchEstudiantes]);

  // Manejador cuando el usuario hace clic en las flechas < >
  const handlePageChange = (event, newPage) => {
    setPage(newPage); // Al cambiar el estado 'page', el useEffect re-ejecuta fetchEstudiantes() automáticamente
  };

  // Manejador cuando cambia el selector "Filas por página" (10, 25...)
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Regresa a la primera página con el nuevo límite
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setPage(0); // Reinicia a página 1 al filtrar
  };

  const handleResetFilters = () => {
    setFilters({});
    setPage(0);
  };

  const handleCreate = () => {
    setSelectedEstudiante(null);
    setDialogOpen(true);
  };

  const handleEdit = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Desea eliminar este estudiante?')) {
      try {
        await estudianteService.delete(id);
        fetchEstudiantes();
      } catch (err) {
        setErrorMsg('Error al eliminar el estudiante');
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedEstudiante) {
        const id = selectedEstudiante.id || selectedEstudiante._id;
        await estudianteService.update(id, data);
      } else {
        await estudianteService.create(data);
      }
      setDialogOpen(false);
      fetchEstudiantes();
    } catch (err) {
      setErrorMsg(err.response?.data?.mensaje || 'Error al guardar el estudiante');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Gestión de Estudiantes</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Nuevo Estudiante
        </Button>
      </Box>

      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

      <EstudianteFilter onFilter={handleFilter} onReset={handleResetFilters} />

      <EstudianteTable
        estudiantes={estudiantes}
        total={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EstudianteDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        estudiante={selectedEstudiante}
      />
    </Box>
  );
}