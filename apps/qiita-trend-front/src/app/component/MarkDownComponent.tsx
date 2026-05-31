import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdownSx: SxProps<Theme> = {
  lineHeight: 1.8,
  overflowWrap: 'break-word',
  '& h1': {
    fontSize: '2rem',
    fontWeight: 700,
    mt: 4,
    mb: 2,
    pb: 1,
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  '& h2': {
    fontSize: '1.5rem',
    fontWeight: 700,
    mt: 4,
    mb: 2,
    pb: 0.5,
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
  '& h3': {
    fontSize: '1.25rem',
    fontWeight: 700,
    mt: 3,
    mb: 1.5,
  },
  '& p': {
    my: 1.5,
  },
  '& ul, & ol': {
    pl: 3,
    my: 1.5,
  },
  '& li': {
    my: 0.5,
  },
  '& a': {
    color: 'primary.main',
    textDecoration: 'underline',
    overflowWrap: 'anywhere',
  },
  '& blockquote': {
    borderLeft: '4px solid',
    borderColor: 'divider',
    color: 'text.secondary',
    pl: 2,
    my: 2,
  },
  '& code': {
    bgcolor: 'grey.100',
    px: 0.5,
    py: 0.25,
    borderRadius: 1,
    fontSize: '0.875em',
  },
  '& pre': {
    bgcolor: 'grey.900',
    color: 'common.white',
    p: 2,
    borderRadius: 2,
    overflowX: 'auto',
    my: 2,
  },
  '& pre code': {
    bgcolor: 'transparent',
    color: 'inherit',
    p: 0,
  },
  '& table': {
    display: 'block',
    width: '100%',
    overflowX: 'auto',
    borderCollapse: 'collapse',
    my: 2,
  },
  '& th, & td': {
    border: '1px solid',
    borderColor: 'divider',
    px: 1.5,
    py: 1,
  },
  '& th': {
    bgcolor: 'grey.100',
    fontWeight: 700,
  },
  '& img': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 1,
  },
}

/**
 *markDownTextを受け取り、htmlにて表示する
 *
 * @param markDownText - markDownText
 *
 * @returns - React Element
 */
const MarkDownComponent = ({ markDownText }: { markDownText: string }) => {
  return (
    <Box sx={markdownSx}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
        {markDownText}
      </ReactMarkdown>
    </Box>
  )
}
export default MarkDownComponent
