import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Dialog } from './Dialog';

describe('Dialog component', () => {
  const title = 'Test Dialog';
  const contentText = 'Hello, world!';

  it('does not render when open is false', () => {
    render(
      <Dialog title={title} open={false} onClose={vi.fn()}>
        <p>{contentText}</p>
      </Dialog>
    );

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText(contentText)).toBeNull();
  });

  it('renders title and children when open is true', () => {
    render(
      <Dialog title={title} open={true} onClose={vi.fn()}>
        <p>{contentText}</p>
      </Dialog>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(contentText)).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();

    render(
      <Dialog title={title} open={true} onClose={onClose}>
        <p>{contentText}</p>
      </Dialog>
    );

    const backdrop = screen.getByRole('presentation');
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();

    render(
      <Dialog title={title} open={true} onClose={onClose}>
        <p>{contentText}</p>
      </Dialog>
    );

    const closeButton = screen.getByLabelText(/close dialog/i);
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stops propagation when clicking inside dialog container', () => {
    const onClose = vi.fn();

    render(
      <Dialog title={title} open={true} onClose={onClose}>
        <p>{contentText}</p>
      </Dialog>
    );

    const container = screen.getByRole('dialog');
    fireEvent.click(container);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('has correct accessibility attributes', () => {
    render(
      <Dialog title={title} open={true} onClose={vi.fn()}>
        <p>{contentText}</p>
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'dialog-title');

    const header = screen.getByText(title);
    expect(header.id).toBe('dialog-title');
  });
});
