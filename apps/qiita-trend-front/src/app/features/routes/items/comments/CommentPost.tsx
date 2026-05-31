'use client'
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp'
import ImageIcon from '@mui/icons-material/Image'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

const CommentPostHeader = () => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: 'center',
        px: 1.5,
        height: 48,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <IconButton size="small">
        <ImageIcon fontSize="small" />
      </IconButton>

      <IconButton size="small">
        <InsertEmoticonIcon fontSize="small" />
      </IconButton>

      <IconButton size="small">
        <HelpOutlineSharpIcon fontSize="small" />
      </IconButton>

      <Button
        variant="outlined"
        size="small"
        sx={{
          color: 'text.primary',
          borderColor: 'text.primary',
          borderRadius: 1,
          fontWeight: 700,
        }}
      >
        プレビュー
      </Button>
    </Stack>
  )
}

const CommentPostFooter = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        px: 2,
        pb: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
        0B / 100MB
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: '#2e7d00',
          fontWeight: 700,
          '&:hover': {
            bgcolor: '#256800',
          },
        }}
      >
        投稿する
      </Button>
    </Stack>
  )
}

export const CommentPost = () => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <CommentPostHeader />
      <TextField
        multiline
        minRows={6}
        fullWidth
        placeholder="テキストを入力"
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      />
      <CommentPostFooter />
    </Box>
  )
}
