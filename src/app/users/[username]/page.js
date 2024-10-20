import ProfileBasicInfo from "./profile_basic_info";

export default function User({params}){

    return(
      <>
        <ProfileBasicInfo username={params.username} />
      </>
    )
}