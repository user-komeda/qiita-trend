import { Alert } from '@mui/material'

import StackRow from '@/app/component/StackRow'
import { BASE_URL, GET_ALL_TAG_URL } from '@/app/const/path'
import fetchWithJwt from '@/app/util/fetchWithJwt'

/**
 *Tags
 */
const Tags = async () => {
  const result = await fetchWithJwt<TagsData[]>(`${BASE_URL}${GET_ALL_TAG_URL}`)
  if (!result.ok) {
    return <Alert severity="error">{result.message}</Alert>
  }
  const resultDataList = result.data
  return (
    <div>
      <StackRow tagList={resultDataList} />
    </div>
  )
}
export default Tags
