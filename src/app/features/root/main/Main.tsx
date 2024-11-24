import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'
import { BASE_URL, GET_ALL_ITEM_API_URL } from '@/app/const/const'
import { ItemsData } from '@/app/types/ItemsData'

/** Main */
const Main = async (): Promise<JSX.Element> => {
  const resultDataList = (await (
    await fetch(`${BASE_URL}${GET_ALL_ITEM_API_URL}`, {
      next: { revalidate: 3600 },
    })
  ).json()) as ItemsData[]

  return (
    <List>
      {resultDataList.map((resultData) => {
        return (
          <ListItemComponent
            key={resultData.id}
            keyId={resultData.id}
            primary={resultData.title}
          ></ListItemComponent>
        )
      })}
    </List>
  )
}
export default Main
