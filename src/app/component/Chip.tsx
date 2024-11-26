import { Chip as _Chip } from '@mui/material'

/**
 *Chip
 *
 * @param text - text
 *
 * @returns - JSX Element
 */
const Chip = ({ text }: { text: string }): JSX.Element => {
  return <_Chip label={text} />
}
export default Chip
