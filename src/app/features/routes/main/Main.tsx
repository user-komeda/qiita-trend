import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'
import {
  BASE_URL,
  BASE_URL_CLIENT,
  GET_ALL_ITEM_API_URL,
} from '@/app/const/const'
import { ItemsData } from '@/app/types/ItemsData'

/** Main */
const Main = async ({
  startDate,
  endDate,
}: {
  startDate?: string
  endDate?: string
}) => {
  const searchParams = new URLSearchParams()

  if (startDate && endDate) {
    searchParams.append('startDate', startDate)
    searchParams.append('endDate', endDate)
  }
  const resultDataList = (await (
    await fetch(`${BASE_URL}${GET_ALL_ITEM_API_URL}?${searchParams.toString()}`)
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
export default Main
