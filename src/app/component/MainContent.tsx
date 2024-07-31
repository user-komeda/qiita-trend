import { Container, Toolbar } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  childComponent: ReactNode
}

/** MainContent */
const MainContent = ({ childComponent }: Props): JSX.Element => {
  return (
    <Container>
      <Toolbar />
      {childComponent}
    </Container>
  )
}
export default MainContent
