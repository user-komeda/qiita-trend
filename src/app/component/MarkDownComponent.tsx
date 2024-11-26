import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 *markDownTextを受け取り、htmlにて表示する
 *
 * @param markDownText - markDownText
 *
 * @returns - React Element
 */
const MarkDownComponent = ({
  markDownText,
}: {
  markDownText: string
}): JSX.Element => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markDownText}</ReactMarkdown>
  )
}
export default MarkDownComponent
