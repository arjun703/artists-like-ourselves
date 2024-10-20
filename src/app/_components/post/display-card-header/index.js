import { Avatar, Box, CardHeader, List, ListItem, ListItemButton, ListItemIcon, ListItemText,  } from "@mui/material";
import calculatePostedAgo from "../../posted-ago";
import Link from "next/link";
import BasicPopover from "../../popovers";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';


export default function DisplayCardHeader({p}){
    return(
    <CardHeader
        avatar={
          <Link href={'/users/'+p.posted_by_username} style={{textDecoration:'none'}}>
            <Avatar src={p.profile_pic_src} aria-label="recipe">
              {
                p.posted_by_name.split(' ').map(a => a[0]).join('')
              }
            </Avatar>
          </Link>
        }
        action={
          <BasicPopover popoverContent={generatePopoverContent(p)} />
        }
        title={<Link style={{textDecoration:'none'}} href={'/users/'+p.posted_by_username}> {p.posted_by_name}</Link>}
        subheader={calculatePostedAgo(p.posted_ago_in_seconds)}
      />
    )
}


import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import EditPostButton from "../../modals/edit-post";
import DeletePostButton from "../../modals/delete-post";

function generatePopoverContent(p){
  return(
      <Box sx={{ width: '100%', minWidth:250, maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
              <List>
                {
                  p.is_editable === 1 ? (
                    <>
                      <EditPostButton post={p} />
                      <DeletePostButton post={p} />
                    </>
                  ): (
                    <></>
                  )
                }

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <OutlinedFlagIcon />
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItemButton>
                </ListItem>
              </List>
          </nav>
      </Box>
  )
}