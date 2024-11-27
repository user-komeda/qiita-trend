import { Chip as _Chip, Avatar } from '@mui/material'

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

/**
 *AvatarChip
 */
export const AvatarChip = ({
  text,
  avatarText,
}: {
  text: string
  avatarText: string
}): JSX.Element => {
  return (
    <_Chip
      label={text}
      avatar={
        <Avatar sx={{ width: '45px !important', height: '45px !important' }}>
          {avatarText}
        </Avatar>
      }
      sx={{
        flex: '1 1 100px',
        justifyContent: 'space-between !important',
        marginBottom: '10px !important',
        paddingTop: '25px',
        paddingBottom: '25px',
      }}
    />
  )
}
export default Chip
