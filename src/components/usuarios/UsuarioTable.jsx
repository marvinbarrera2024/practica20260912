import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UsuarioTable({ usuarios, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Rol</strong></TableCell>
            <TableCell align="right"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id || usuario._id}>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>
                <Chip
                  label={usuario.rol}
                  color={usuario.rol === 'ADMIN' ? 'primary' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit(usuario)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(usuario.id || usuario._id)}>
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