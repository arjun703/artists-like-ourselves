import GroupsSidebar from '@/app/_components/_groups_sidebar/'

export default function RightSidebar({handleFeedTypeFilterChange}){
    return(
        <>
            <GroupsSidebar handleFeedTypeFilterChange={handleFeedTypeFilterChange} />
        </>
    )
}