import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import App2 from './App2';

describe('App2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <App2 />
      </BrowserRouter>,
    );
    expect(baseElement).toBeTruthy();
  });
});
