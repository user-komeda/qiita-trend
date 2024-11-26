import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'
import {
  BASE_URL,
  BASE_URL_CLIENT,
  GET_ITEMS_BY_TAG_URL,
} from '@/app/const/Const'
import { ItemsData } from '@/app/types/ItemsData'
import replaceUrlParameter from '@/app/util/replaceUrlParameter'

/** TagItems */
const TagItems = async ({
  tagName,
}: {
  tagName: string
}): Promise<JSX.Element> => {
  const resultDataList = (await (
    await fetch(
      replaceUrlParameter(
        `${BASE_URL}${GET_ITEMS_BY_TAG_URL}`,
        'tagName',
        tagName,
      ),
      {
        next: { revalidate: 3600 },
      },
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
