import { Typography } from '@mui/material'

import MarkDownComponent from '@/app/component/MarkDownComponent'
import { BASE_URL, GET_ALL_ITEM_API_URL } from '@/app/const/Const'
import { ItemsData } from '@/app/types/ItemsData'

import TagList from './TagList'

/**
 *取得した記事詳細を表示
 *
 * @param id - id
 *
 * @returns - React Element
 */
const Items = async ({ id }: { id: string }): Promise<JSX.Element> => {
  const resultData = (await (
    await fetch(`${BASE_URL}${GET_ALL_ITEM_API_URL}${id}`, {
      next: { revalidate: 3600 },
    })
  ).json()) as ItemsData
  return (
    <div>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
        {resultData.title}
      </Typography>
      <TagList tagList={resultData.tags}></TagList>

      <MarkDownComponent markDownText={resultData.body}></MarkDownComponent>
    </div>
  )
}
export default Items
