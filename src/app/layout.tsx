import { Box, CssBaseline } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ReactNode } from 'react'

import Header from './component/Header'
import SideMenu from './component/SideMenu'
import DrawerMenu from './features/drawer/DrawerMenu'
import HeaderMenu from './features/headerMenu/HeaderMenu'

/** metaData */
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

/** rootLayout */
const RootLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header
              title={'qiitaの殿堂'}
              childComponent={<HeaderMenu></HeaderMenu>}
            ></Header>{' '}
            <SideMenu childComponent={<DrawerMenu />}></SideMenu>
            {children}
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
export default RootLayout