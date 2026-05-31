import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import { CommentSchemaType } from '@qiita-trend/schema'

const CommentFooter = () => {
  return (
    <Stack direction="row" spacing={1} sx={{ mt: 3, alignItems: 'center' }}>
      <IconButton
        sx={{
          width: 44,
          height: 44,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <FavoriteBorderIcon />
      </IconButton>

      <Typography sx={{ fontSize: 14, color: '#0f61a8' }}>0</Typography>
    </Stack>
  )
}

const CommentHeader = ({ comment }: { comment: CommentSchemaType[number] }) => {
  return (
    <Stack
      component="div"
      direction="row"
      spacing={1}
      sx={{ mb: 2, alignItems: 'center' }}
    >
      <Typography component="span" sx={{ fontSize: 15, fontWeight: 500 }}>
        @{comment.user.id}
      </Typography>

      {comment.user.name && (
        <Typography
          component="span"
          sx={{ fontSize: 14, color: 'text.secondary' }}
        >
          ({comment.user.name})
        </Typography>
      )}

      <Typography
        component="span"
        sx={{ fontSize: 14, color: 'text.secondary' }}
      >
        {comment.created_at}
      </Typography>
    </Stack>
  )
}

export const CommentView = ({
  comment,
}: {
  comment: CommentSchemaType[number]
}) => {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Avatar
        src={comment.user.profile_image_url}
        sx={{
          width: 40,
          height: 40,
          fontSize: 14,
        }}
      >
        {comment.user.id.slice(0, 1).toUpperCase()}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <CommentHeader comment={comment} />
        <Typography
          sx={{
            whiteSpace: 'pre-wrap',
            lineHeight: 1.8,
            fontSize: 16,
            wordBreak: 'break-word',
          }}
        >
          {comment.body}
        </Typography>
        <CommentFooter />
      </Box>

      <IconButton size="small">
        <MoreHorizIcon />
      </IconButton>
    </Stack>
  )
}
