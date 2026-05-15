import { Alert, Typography } from '@mui/material'

import MarkDownComponent from '@/app/component/MarkDownComponent'
import { BASE_URL, GET_ALL_ITEM_API_URL } from '@/app/const/path'
import TagList from '@/app/features/routes/items/TagList'
import { ItemsData } from '@/app/types/ItemsData'
import fetchWithJwt from '@/app/util/fetchWithJwt'

/**
 *取得した記事詳細を表示
 *
 * @param id - id
 *
 * @returns - React Element
 */
const Items = async ({ id }: { id: string }) => {
  const result = await fetchWithJwt<ItemsData>(
    `${BASE_URL}${GET_ALL_ITEM_API_URL}${id}`,
  )

  if (!result.ok) {
    return <Alert severity="error">{result.message}</Alert>
  }
  const resultData = result.data

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
