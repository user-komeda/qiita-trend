import MainContent from '@/app/component/MainContent'
import Tags from '@/app/features/routes/tags/Tags'

export const dynamic = 'force-dynamic' //動的にレンダリングする

/** 詳細ページ */
const Page = () => {
  return <MainContent childComponent={<Tags />}></MainContent>
}
export default Page
