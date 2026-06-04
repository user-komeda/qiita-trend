import { Stack } from '@mui/material'
import { ItemsDetailSchemaType } from '@qiita-trend/schema'

import Chip from '@/app/component/Chip'
import ListItemComponent from '@/app/component/ListItemComponent'
import { BASE_URL_CLIENT } from '@/app/const/path'

/**
 * 記事につけられているタグを表示
 *
 * @param tagList - tagList
 *
 * @returns - JSX Element
 */
const TagList = ({ tagList }: { tagList: ItemsDetailSchemaType['tags'] }) => {
  return (
    <Stack direction={'row'} spacing={3}>
      {tagList.map((tag, index) => {
        return (
          <ListItemComponent
            key={index}
            keyId={index}
            childComponent={<Chip text={tag.name}></Chip>}
            href={`${BASE_URL_CLIENT}/tags/${tag.name}/items`}
          />
        )
      })}
    </Stack>
  )
}
export default TagList
