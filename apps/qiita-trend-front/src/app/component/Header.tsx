import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
} from '@mui/material'
import React, { ReactNode } from 'react'

import { DRAWER_WIDTH } from '@/app/const/const'

interface Props {
  title: string
  childComponent: ReactNode
}

/**
 *Header
 */
const Header = ({ title, childComponent }: Props) => {
  return (
    <header>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${DRAWER_WIDTH.toString()}px)` },
            ml: { sm: `${DRAWER_WIDTH.toString()}px` },
          }}
        >
          {' '}
          <Toolbar>
            {childComponent}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Button color="inherit" component="a" href="/api/login">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  )
}
export default Header
