'use client'
import { Link as MuiLink } from '@mui/material'
import NextLinkBase from 'next/link'

import type { LinkProps as MuiLinkProps } from '@mui/material'
import type { ReactNode } from 'react'

type Props = Omit<MuiLinkProps, 'href' | 'component' | 'sx'> & {
  href: string
  children?: ReactNode
  isDisableMarginZero?: boolean
}

/**
 * NextJSLink
 */
const NextLink = ({ href, children, isDisableMarginZero, ...props }: Props) => {
  return (
    <MuiLink
      {...props}
      component={NextLinkBase}
      href={href}
      underline="none"
      sx={{
        marginLeft:
          isDisableMarginZero === true ? '15px !important' : '0 !important',
      }}
    >
      {children}
    </MuiLink>
  )
}

export default NextLink
