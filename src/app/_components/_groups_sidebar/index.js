import groups_data from "./groups_data"
import GroupCard from "./group_card"
import Stack from '@mui/material/Stack';

export default function GroupsSidebar({handleFeedTypeFilterChange}){
    return(
        <Stack spacing={2}>
            {
                groups_data.map((group,index) => {
                    return <GroupCard handleFeedTypeFilterChange={handleFeedTypeFilterChange} key={index} group={group} />
                })
            }
        </Stack>
    )
}