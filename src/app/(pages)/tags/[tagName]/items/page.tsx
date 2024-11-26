import MainContent from '@/app/component/MainContent'
import TagItems from '@/app/features/routes/tagItems/TagItems'

/** 詳細ページ */
const Page = async ({
  params,
}: {
  params: Promise<{ tagName: string }>
}): Promise<JSX.Element> => {
  const tagName = (await params).tagName
  return (
    <MainContent childComponent={<TagItems tagName={tagName} />}></MainContent>
  )
}
export default Page
