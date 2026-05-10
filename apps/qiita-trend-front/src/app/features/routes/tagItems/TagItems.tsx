import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'
import {
  BASE_URL,
  BASE_URL_CLIENT,
  GET_ITEMS_BY_TAG_URL,
} from '@/app/const/path'
import { ItemsData } from '@/app/types/ItemsData'
import fetchWithJwt from '@/app/util/fetchWithJwt'
import replaceUrlParameter from '@/app/util/replaceUrlParameter'

/** TagItems */
const TagItems = async ({ tagName }: { tagName: string }) => {
  const resultDataList = (await (
    await fetchWithJwt(
      replaceUrlParameter(
        `${BASE_URL}${GET_ITEMS_BY_TAG_URL}`,
        ':tagName',
        tagName,
      ),
    )
  ).json()) as ItemsData[]

  return (
    <List>
      {resultDataList.map((resultData) => {
        return (
          <ListItemComponent
            key={resultData.id}
            keyId={resultData.id}
            primary={resultData.title}
            href={`${BASE_URL_CLIENT}/items/${resultData.id}`}
          ></ListItemComponent>
        )
      })}
    </List>
  )
}
export default TagItems
