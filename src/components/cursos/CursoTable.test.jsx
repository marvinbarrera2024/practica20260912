import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CursoTable from './CursoTable';

describe('CursoTable', () => {
  const cursos = [
    { id: 1, codigo: 'CS101', titulo: 'Programación', creditos: 4 },
    { id: 2, codigo: 'MAT200', titulo: 'Álgebra', creditos: 3 },
  ];

  it('renders the courses and action buttons', () => {
    render(
      <CursoTable
        cursos={cursos}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText('Código')).toBeInTheDocument();
    expect(screen.getByText('Programación')).toBeInTheDocument();
    expect(screen.getByText('Álgebra')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('calls onEdit with the selected course', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(
      <CursoTable
        cursos={cursos}
        onEdit={onEdit}
        onDelete={() => {}}
      />
    );

    const row = screen.getByText('CS101').closest('tr');
    const buttons = within(row).getAllByRole('button');
    await user.click(buttons[0]);

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(cursos[0]);
  });

  it('calls onDelete with the course id', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <CursoTable
        cursos={cursos}
        onEdit={() => {}}
        onDelete={onDelete}
      />
    );

    const row = screen.getByText('MAT200').closest('tr');
    const buttons = within(row).getAllByRole('button');
    await user.click(buttons[1]);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(2);
  });
});
