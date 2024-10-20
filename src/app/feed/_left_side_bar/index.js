import PPandCover from "./cover_and_pp";

export default function LeftSideBar({profileStats}){


    if(profileStats.is_logged_in !== true){
        return(
            <>Please Log In</>
        )
    }

    return(
        <>
            <PPandCover data={profileStats} />
        </>
    )
}

