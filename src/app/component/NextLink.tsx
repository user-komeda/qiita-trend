import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'
interface Props {
  href: string
  children: JSX.Element
}
/**
 *NextJSLInk
 *
 * @param href - href
 *
 * @returns - JSX Element
 */
const NextLink = ({ href, children }: Props): JSX.Element => {
  return (
    <Link href={href} passHref legacyBehavior>
      <MuiLink underline="none" sx={{ marginLeft: '0 !important' }}>
        {children}
      </MuiLink>
    </Link>
  )
}
export default NextLink
