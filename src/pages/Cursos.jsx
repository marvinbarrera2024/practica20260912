import { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CursoTable from '../components/cursos/CursoTable';
import CursoDialog from '../components/cursos/CursoDialog';
import { cursoService } from '../services/curso.service';

export default function Cursos() {
    const [cursos, setCursos] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchCursos = async () => {
        try {
            const data = await cursoService.getAll();
            setCursos(data);
        } catch (err) {
            setErrorMsg('Error al cargar la lista de cursos');
        }
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    const handleCreate = () => {
        setSelectedCurso(null);
        setDialogOpen(true);
    };

    const handleEdit = (curso) => {
        setSelectedCurso(curso);
        setDialogOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Desea eliminar este curso?')) {
            try {
                await cursoService.delete(id);
                fetchCursos();
            } catch (err) {
                setErrorMsg('Error al eliminar el curso');
            }
        }
    };

    const handleSave = async (data) => {
        try {
            if (selectedCurso) {
                const id = selectedCurso.id || selectedCurso._id;
                await cursoService.update(id, data);
            } else {
                await cursoService.create(data);
            }
            setDialogOpen(false);
            fetchCursos();
        } catch (err) {
            setErrorMsg(err.response?.data?.mensaje || 'Error al guardar el curso');
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Gestión de Cursos</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
                    Nuevo Curso
                </Button>
            </Box>

            {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

            <CursoTable cursos={cursos} onEdit={handleEdit} onDelete={handleDelete} />

            <CursoDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSave}
                curso={selectedCurso}
            />
        </Box>
    );
}