import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';

export const menuItems = [
  {
    path: '/usuarios',
    label: 'Usuarios',
    icon: PeopleIcon,
    roles: ['ADMIN'],
  },
  {
    path: '/estudiantes',
    label: 'Estudiantes',
    icon: SchoolIcon,
    roles: ['ADMIN', 'MANTENIMIENTO'],
  },
  {
    path: '/cursos',
    label: 'Cursos',
    icon: BookIcon,
    roles: ['ADMIN', 'MANTENIMIENTO'],
  },
];