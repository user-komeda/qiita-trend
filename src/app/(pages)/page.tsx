import MainContent from '../component/MainContent'
import Main from '../features/routes/main/Main'

/**
 *Home
 */
const Home = (): JSX.Element => {
  return (
    <>
      <MainContent childComponent={<Main></Main>}></MainContent>
    </>
  )
}
export default Home
