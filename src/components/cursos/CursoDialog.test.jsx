import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CursoDialog from './CursoDialog';

describe('CursoDialog', () => {
  it('shows the form in creation mode and submits a new course', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(
      <CursoDialog
        open={true}
        onClose={() => {}}
        onSave={onSave}
        curso={null}
      />
    );

    expect(screen.getByText('Nuevo Curso')).toBeInTheDocument();
    const codigoInput = screen.getByLabelText('Código');
    const tituloInput = screen.getByLabelText('Título');
    const creditosInput = screen.getByLabelText('Créditos');

    await user.clear(codigoInput);
    await user.type(codigoInput, 'CS101');
    await user.clear(tituloInput);
    await user.type(tituloInput, 'Programación');
    await user.clear(creditosInput);
    await user.type(creditosInput, '4');

    await user.click(screen.getByRole('button', { name: 'Guardar' }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith({
      codigo: 'CS101',
      titulo: 'Programación',
      creditos: 4,
    });
  });

  it('loads the values of an existing course in edit mode', () => {
    render(
      <CursoDialog
        open={true}
        onClose={() => {}}
        onSave={() => {}}
        curso={{ id: 1, codigo: 'MAT200', titulo: 'Álgebra', creditos: 3 }}
      />
    );

    expect(screen.getByText('Editar Curso')).toBeInTheDocument();
    expect(screen.getByLabelText('Código')).toHaveValue('MAT200');
    expect(screen.getByLabelText('Título')).toHaveValue('Álgebra');
    expect(screen.getByLabelText('Créditos')).toHaveValue(3);
  });
});
