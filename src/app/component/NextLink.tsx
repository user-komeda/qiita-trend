import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'
interface Props {
  href: string
  children: JSX.Element
  isDisableMarginZero?: boolean
}
/**
 *NextJSLInk
 *
 * @param href - href
 *
 * @returns - JSX Element
 */
const NextLink = ({
  href,
  children,
  isDisableMarginZero,
}: Props): JSX.Element => {
  const sx =
    isDisableMarginZero !== undefined && isDisableMarginZero
      ? { marginLeft: '15px !important' }
      : { marginLeft: '0 !important' }
  return (
    <Link href={href} passHref legacyBehavior>
      <MuiLink underline="none" sx={sx}>
        {children}
      </MuiLink>
    </Link>
  )
}
export default NextLink
