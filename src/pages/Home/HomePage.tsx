import styled from 'styled-components'

const Container = styled.main`
  padding: ${({ theme }) => theme.spacing.xl};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.textPrimary};
`

/**
 * Placeholder. A Home real e o primeiro trabalho seu.
 */
export function HomePage() {
  return (
    <Container>
      <Title>EstudoFront</Title>
    </Container>
  )
}
