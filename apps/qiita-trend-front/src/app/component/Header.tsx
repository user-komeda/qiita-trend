import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  Stack,
} from '@mui/material'
import React, { ReactNode } from 'react'

interface Props {
  title: string
  childComponent: ReactNode
}

/**
 *Header
 */
const Header = ({ title, childComponent }: Props) => {
  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          left: '12%',
          width: '88%',
        }}
      >
        <Toolbar>
          {childComponent}
          <Stack
            direction="row"
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {' '}
            <Stack>
              <Typography variant="h6" component="div">
                {title}
              </Typography>
            </Stack>
            <Stack>
              <Button color="inherit" component="a" href="/api/login">
                Login
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
export default Header
