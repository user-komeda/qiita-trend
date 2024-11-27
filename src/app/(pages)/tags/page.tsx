import MainContent from '@/app/component/MainContent'
import Tags from '@/app/features/routes/tags/Tags'

/** 詳細ページ */
const Page = (): JSX.Element => {
  return <MainContent childComponent={<Tags />}></MainContent>
}
export default Page
