import { List } from '@mui/material'

import ListItemComponent from '@/app/component/ListItemComponent'

/** Main */
const Main = (): JSX.Element => {
  const shouldFixResponse = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '19']
  return (
    <List>
      {shouldFixResponse.map((key) => {
        return (
          <ListItemComponent
            key={Number(key)}
            primary="aaaaaaaaaaaaaaaaaaaaaaa"
          ></ListItemComponent>
        )
      })}
    </List>
  )
}
export default Main
