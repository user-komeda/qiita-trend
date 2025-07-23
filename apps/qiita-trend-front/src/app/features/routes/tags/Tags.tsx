import StackRow from '@/app/component/StackRow'
import { BASE_URL, GET_ALL_TAG_URL } from '@/app/const/const'

/**
 *Tags
 */
const Tags = async () => {
  const resultDataList = (await (
    await fetch(`${BASE_URL}${GET_ALL_TAG_URL}`, {
      next: { revalidate: 3600 },
    })
  ).json()) as TagsData[]
  return (
    <div>
      <StackRow tagList={resultDataList} />
    </div>
  )
}
export default Tags
