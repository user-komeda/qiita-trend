'use client'

import { createTheme } from '@mui/material/styles'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { forwardRef, AnchorHTMLAttributes } from 'react'

type LinkBehaviorProps = Omit<NextLinkProps, 'href'> &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: NextLinkProps['href']
  }

/**
 * MUI のコンポーネントの `component` prop を経由して、
 * next/link を使うためのフォワーディングコンポーネント。
 * テーマ側で `defaultProps.component` に指定することで、
 * 各コンポーネントから `component={Link}` を渡す必要がなくなる。
 */
// eslint-disable-next-line react-refresh/only-export-components
const LinkBehavior = forwardRef<HTMLAnchorElement, LinkBehaviorProps>(
  function LinkBehavior(props, ref) {
    const { href, ...other } = props
    return <NextLink ref={ref} href={href} {...other} />
  },
)

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
})
