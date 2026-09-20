import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'
import { AppProviders } from '@/app/AppProviders'

/**
 * render() com os providers globais ja aplicados.
 * Use este no lugar do render da testing-library em todos os testes.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: AppProviders, ...options })
}

export { screen, within, waitFor, fireEvent, act } from '@testing-library/react'
