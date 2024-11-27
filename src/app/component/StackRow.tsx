import Stack from '@mui/material/Stack'

import { AvatarChip } from './Chip'
import NextLink from './NextLink'

/**
 * StackRow
 */
const StackRow = ({ tagList }: { tagList: TagsData[] }): JSX.Element => {
  return (
    <Stack
      direction={'row'}
      spacing={2}
      sx={{
        flexWrap: 'wrap',
        margin: '0 auto',
        flexDirection: 'row',
      }}
    >
      {tagList.map((tag, index) => {
        return (
          <NextLink
            href={`/tags/${tag.id}/items`}
            key={index}
            isDisableMarginZero
          >
            <AvatarChip
              text={tag.id}
              key={index}
              avatarText={tag.itemsCount.toString()}
            ></AvatarChip>
          </NextLink>
        )
      })}
    </Stack>
  )
}
export default StackRow
