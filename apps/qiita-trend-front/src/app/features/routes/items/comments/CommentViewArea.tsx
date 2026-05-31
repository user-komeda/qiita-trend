import { Box, Divider } from '@mui/material'
import { CommentSchemaType } from '@qiita-trend/schema'

import { CommentView } from '@/app/features/routes/items/comments/CommentView'

export const CommentViewArea = ({
  comments,
}: {
  comments: CommentSchemaType
}) => {
  return (
    <>
      {comments.map((comment, index) => (
        <Box key={comment.id}>
          <Box sx={{ px: 7, py: 4 }}>
            <CommentView comment={comment} />
          </Box>
          {index !== comments.length - 1 && <Divider />}
        </Box>
      ))}
    </>
  )
}
