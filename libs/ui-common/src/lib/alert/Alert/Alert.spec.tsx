import { render, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('should render without crashing', () => {
    const setMessage = vi.fn();
    render(<Alert message="Test message" setMessage={setMessage} />);
  });

  it('should call setMessage with null when closed', () => {
    const setMessage = vi.fn();
    const { getByRole } = render(
      <Alert message="Test message" setMessage={setMessage} />,
    );

    fireEvent.click(getByRole('button'));
    expect(setMessage).toHaveBeenCalledWith(null);
  });

  it('should call setMessage with null when closed due to clickaway', () => {
    const setMessage = vi.fn();
    const { getByRole } = render(
      <Alert message="Test message" setMessage={setMessage} />,
    );

    fireEvent.click(getByRole('button'), { reason: 'clickaway' });
    expect(setMessage).toHaveBeenCalledWith(null);
  });
});
