'use client'
import {
  Stack,
  Pagination as MuiPagination,
  PaginationItem,
  Alert,
} from '@mui/material'
import { useSearchParams } from 'next/navigation'

import NextLink from '@/app/component/NextLink'
import { BASE_URL_CLIENT } from '@/app/const/path'

const getHref = (page: number | null, searchParamsString: string) => {
  const params = new URLSearchParams(searchParamsString)

  if (page === null || page === 1) {
    params.delete('page')
  } else {
    params.set('page', Math.min(page, 100).toString())
  }

  const queryString = params.toString()
  return queryString ? `${BASE_URL_CLIENT}?${queryString}` : BASE_URL_CLIENT
}

export const Pagination = ({ count }: { count: number }) => {
  const searchParams = useSearchParams()
  const searchParamsString = searchParams.toString()
  const page = Number(searchParams.get('page')) || 1
  const displayCount = Math.min(count, 100)

  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      {count > 100 && (
        <Alert severity="warning">
          Qiita APIの制限により、101ページ目以降は表示できません。
        </Alert>
      )}
      <MuiPagination
        size="large"
        count={displayCount}
        page={page > 100 ? 100 : page}
        renderItem={(item) => (
          <PaginationItem
            component={NextLink}
            href={getHref(item.page, searchParamsString)}
            {...item}
          />
        )}
      />
    </Stack>
  )
}
