import { Link as MuiLink } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  href: string
  children: ReactNode
  isDisableMarginZero?: boolean
}
/**
 * NextJSLink
 *
 * @param href - href
 *
 * @returns - JSX Element
 */
const NextLink = ({ href, children, isDisableMarginZero }: Props) => {
  const sx =
    isDisableMarginZero !== undefined && isDisableMarginZero
      ? { marginLeft: '15px !important' }
      : { marginLeft: '0 !important' }
  return (
    <MuiLink href={href} underline="none" sx={sx}>
      {children}
    </MuiLink>
  )
}
export default NextLink
