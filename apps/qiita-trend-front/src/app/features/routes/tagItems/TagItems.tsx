import { Alert, List } from '@mui/material'
import { ItemsSchemaType } from '@qiita-trend/schema'

import ListItemComponent from '@/app/component/ListItemComponent'
import {
  BASE_URL,
  BASE_URL_CLIENT,
  GET_ITEMS_BY_TAG_URL,
} from '@/app/const/path'
import fetchWithJwt from '@/app/util/fetchWithJwt'
import replaceUrlParameter from '@/app/util/replaceUrlParameter'

/** TagItems */
const TagItems = async ({ tagName }: { tagName: string }) => {
  const result = await fetchWithJwt<ItemsSchemaType>(
    replaceUrlParameter(
      `${BASE_URL}${GET_ITEMS_BY_TAG_URL}`,
      ':tagName',
      tagName,
    ),
  )

  if (!result.ok) {
    return <Alert severity="error">{result.message}</Alert>
  }

  const resultDataList = result.data

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
