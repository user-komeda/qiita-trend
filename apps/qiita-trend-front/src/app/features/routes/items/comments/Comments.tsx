import { Alert, Divider, Paper } from '@mui/material'
import { CommentSchemaType } from '@qiita-trend/schema'

import { BASE_URL, GET_ITEM_COMMENTS_URL } from '@/app/const/path'
import { CommentPostArea } from '@/app/features/routes/items/comments/CommentPostArea'
import { CommentViewArea } from '@/app/features/routes/items/comments/CommentViewArea'
import fetchWithJwt from '@/app/util/fetchWithJwt'
import replaceUrlParameter from '@/app/util/replaceUrlParameter'

export const Comments = async ({ id }: { id: string }) => {
  const result = await fetchWithJwt<CommentSchemaType>(
    replaceUrlParameter(`${BASE_URL}${GET_ITEM_COMMENTS_URL}`, ':itemId', id),
  )
  if (!result.ok) {
    return <Alert severity="error">{result.message}</Alert>
  }
  const comments = result.data
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: '#fff',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CommentViewArea comments={comments} />
      <Divider />
      <CommentPostArea />
    </Paper>
  )
}
