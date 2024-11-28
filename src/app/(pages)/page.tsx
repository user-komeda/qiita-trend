import { ReadonlyURLSearchParams } from 'next/navigation'

import MainContent from '../component/MainContent'
import Main from '../features/routes/main/Main'

/**
 *Home
 */
const Home = async ({
  searchParams,
}: {
  searchParams: Promise<ReadonlyURLSearchParams>
}): Promise<JSX.Element> => {
  const params = await searchParams
  return (
    <>
      <MainContent
        childComponent={
          <Main startDate={params.startDate} endDate={params.endDate}></Main>
        }
      ></MainContent>
    </>
  )
}
export default Home
