import { List, Stack } from '@mui/material'

import Chip from '@/app/component/Chip'
import ListItemComponent from '@/app/component/ListItemComponent'

/**
 *記事につけられているタグを表示
 *
 * @param tagList - tagList
 *
 * @returns - JSX Element
 */
const TagList = ({ tagList }: { tagList: string[] }): JSX.Element => {
  return (
    <List component={Stack} direction={'row'} spacing={3}>
      {tagList.map((tag, index) => {
        return (
          <ListItemComponent
            key={index}
            keyId={index}
            childComponent={<Chip text={tag}></Chip>}
          />
        )
      })}
    </List>
  )
}
export default TagList
