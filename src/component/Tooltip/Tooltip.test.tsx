import React from 'react';
import { render, getByTestId, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip, { ToolTipPosition } from './Tooltip';

const setup = (props: any = null) => render(<Tooltip {...props} />);

const testID = 'tooltip-idsss';

const createTarget = () => {
  const id = 'target-id';
  const target = document.createElement('div');
  target.id = id;
  target.textContent = 'Test Target';
  document.querySelector('body').appendChild(target);
  return id;
};

describe('Tooltip', () => {
  // BeforeAll
  beforeAll(() => {
    const overlayRoot = document.createElement('div');
    overlayRoot.id = 'overlay-root';
    document.querySelector('html').appendChild(overlayRoot);
  });

  test('Render The tooltip', async () => {
    const target = createTarget();
    // para que necesito las otras props?
    setup({
      testID,
      target,
      message: 'Test',
      position: ToolTipPosition.bottom,
    });
    // ver esta forma de seleccionar elementos
    const tooltip = getByTestId(
      document.querySelector('#overlay-root'),
      testID,
    );
    expect(tooltip).toBeTruthy();
  });

  test('Show the tooltip', async () => {
    const target = createTarget();
    setup({
      testID,
      target,
      message: 'Test',
      // para que utilizar el enum en este caso ?
      position: ToolTipPosition.bottom,
    });
    const tooltip = getByTestId(
      document.querySelector('#overlay-root'),
      testID,
    );

    const targetElement = document.querySelector(`#${target}`);
    userEvent.hover(targetElement);
    await waitFor(
      () => {
        expect(tooltip).toHaveClass('show');
      },
      { interval: 100 },
    );
  });

  test('Hide the tooltip', async () => {
    const target = createTarget();
    setup({
      testID,
      target,
      message: 'Test',
      position: ToolTipPosition.bottom,
    });
    const tooltip = getByTestId(
      document.querySelector('#overlay-root'),
      testID,
    );

    const targetElement = document.querySelector(`#${target}`);
    userEvent.hover(targetElement);
    userEvent.unhover(targetElement);
    await waitFor(
      () => {
        expect(tooltip).not.toHaveClass('show');
      },
      { interval: 100 },
    );
  });
});
