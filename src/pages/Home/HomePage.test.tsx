import { HomePage } from './HomePage'
import { renderWithProviders, screen } from '@/test/render'

describe('HomePage', () => {
  it('renderiza o titulo principal', () => {
    renderWithProviders(<HomePage />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'EstudoFront' }),
    ).toBeInTheDocument()
  })
})
