import { render } from '@testing-library/react';

import IntlProvider from './IntlProvider';

describe('IntlProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IntlProvider />);
    expect(baseElement).toBeTruthy();
  });
});
