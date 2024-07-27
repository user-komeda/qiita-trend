import MailIcon from '@mui/icons-material/Mail'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'

const DrawerList = (
  <Box sx={{ width: 250 }} role="presentation">
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => {
        return (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon></MailIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text) => {
        return (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon></MailIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  </Box>
)
export default DrawerList
