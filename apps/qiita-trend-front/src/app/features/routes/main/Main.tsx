import { Alert, Box, List } from '@mui/material'
import { PaginatedItemsSchemaType } from '@qiita-trend/schema'

import ListItemComponent from '@/app/component/ListItemComponent'
import {
  BASE_URL,
  BASE_URL_CLIENT,
  GET_ALL_ITEM_API_URL,
} from '@/app/const/path'
import { Pagination } from '@/app/features/component/pagination/Pagination'
import fetchWithJwt from '@/app/util/fetchWithJwt'

const buildSearchParams = (
  startDate?: string,
  endDate?: string,
  page?: string,
) => {
  const searchParams = new URLSearchParams()
  if (startDate && endDate) {
    searchParams.append('startDate', startDate)
    searchParams.append('endDate', endDate)
  }
  if (page) {
    searchParams.append('page', page)
  }
  return searchParams.toString()
}

const Main = async ({
  startDate,
  endDate,
  page,
}: {
  startDate?: string
  endDate?: string
  page?: string
}) => {
  const result = await fetchWithJwt<PaginatedItemsSchemaType>(
    `${BASE_URL}${GET_ALL_ITEM_API_URL}?${buildSearchParams(startDate, endDate, page)}`,
  )
  if (!result.ok) {
    return <Alert severity="error">{result.message}</Alert>
  }
  const { items, totalCount } = result.data
  return (
    <>
      <List>
        {items.map((resultData) => {
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
      <Box sx={{ mb: 2 }}>
        <Pagination count={Math.ceil(totalCount / 100)} />
      </Box>
    </>
  )
}
export default Main
