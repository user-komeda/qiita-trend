import MainContent from '@/app/component/MainContent'
import Items from '@/app/features/routes/items/Items'

/** 詳細ページ */
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  return <MainContent childComponent={<Items id={id} />}></MainContent>
}
export default Page
