import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CursoTable({ cursos, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Código</strong></TableCell>
            <TableCell><strong>Título</strong></TableCell>
            <TableCell><strong>Créditos</strong></TableCell>
            <TableCell align="right"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cursos.map((curso) => (
            <TableRow key={curso.id || curso._id}>
              <TableCell>{curso.codigo}</TableCell>
              <TableCell>{curso.titulo}</TableCell>
              <TableCell>{curso.creditos}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit(curso)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(curso.id || curso._id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}