import { getLoggedInUsername } from "@/app/api/utils"
import { Button } from "@mui/joy";
import Link from "next/link";
export  default  function Header(){
    const {token_exists, username } = getLoggedInUsername();
    if(token_exists){
        return(
            <div style={{backgroundColor:'white', display:'flex', minHeight: '70px', justifyContent:'center', alignItems:'center'}}>
                Welcome @{username}
            </div>
        )
    }else{
        return(
            <div style={{backgroundColor:'white', display:'flex', minHeight: '70px', justifyContent:'center', alignItems:'center'}}>
                <Link href="/login">
                    <Button sx={{minWidth: '250px'}}>Sign In</Button>
                </Link>
            </div>
        )
    }
}