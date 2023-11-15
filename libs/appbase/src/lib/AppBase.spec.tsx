import { render } from '@testing-library/react';

import AppBase from './AppBase';

describe('AppBase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppBase />);
    expect(baseElement).toBeTruthy();
  });
});
