import { Avatar, Box, Stack, Typography } from '@mui/material'

import { CommentPost } from '@/app/features/routes/items/comments/CommentPost'

export const CommentPostArea = () => {
  return (
    <Box sx={{ px: 7, py: 3 }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#d81b60',
            fontSize: 14,
          }}
        >
          米田
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography sx={{ mb: 1.5, fontSize: 16, fontWeight: 600 }}>
            コメントする
          </Typography>

          <CommentPost />
        </Box>
      </Stack>
    </Box>
  )
}
