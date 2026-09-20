import type { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { theme } from '@/styles/theme'

interface AppProvidersProps {
  children: ReactNode
}

/**
 * Concentra todos os providers globais (tema, futuros contexts de dominio).
 * Um unico lugar para envolver tanto o app real quanto os testes.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}
