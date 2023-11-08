import { render, fireEvent } from '@testing-library/react';
import CTAButton from './CTAButton';

describe('CTAButton', () => {
  it('renders the button with the correct text', () => {
    const { getByText } = render(
      <CTAButton onClick={() => void 0}>Click me!</CTAButton>,
    );
    expect(getByText('Click me!')).toBeInTheDocument();
  });

  it('calls the onClick function when clicked', () => {
    const handleClick = vi.fn();
    const { getByRole } = render(
      <CTAButton onClick={handleClick}>Click me!</CTAButton>,
    );
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables the button when loading is true', () => {
    const { getByRole } = render(<CTAButton onClick={() => void 0} loading />);
    expect(getByRole('button')).toBeDisabled();
  });

  it('disables the button when disabled is true', () => {
    const { getByRole } = render(<CTAButton onClick={() => void 0} disabled />);
    expect(getByRole('button')).toBeDisabled();
  });
});
