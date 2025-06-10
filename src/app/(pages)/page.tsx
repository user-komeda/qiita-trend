import MainContent from '@/app/component/MainContent'
import Main from '@/app/features/routes/main/Main'

/**
 *Home
 */
const Home = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string[] | string | undefined>>
}) => {
  const params = await searchParams

  return (
    <>
      <MainContent
        childComponent={
          <Main
            startDate={(params.startDate ?? '') as string}
            endDate={(params.endDate ?? '') as string}
          ></Main>
        }
      ></MainContent>
    </>
  )
}
export default Home
