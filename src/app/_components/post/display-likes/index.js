import { Accordion, AccordionDetails, Button } from "@mui/joy";
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { getRequest } from "../../file_upload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DisplayLikes({ post_id }) {
  const [likes, setLikes] = useState([]);
  const [likesPageNumber, setLikesPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [moreDataExists, setMoreDataExists] = useState(true);
  const router = useRouter();

  const fetchLikes = useEffect( () => {
    
    async function fetchData(){
      try {
        setIsLoading(true);
        const likesJSON = await getRequest(
          `/api/post/${post_id}/likes?page=${likesPageNumber}`
        );
        setLikes(likesJSON.likes); // Append new likes
        setMoreDataExists(likesJSON.moreDataExists); // Set whether more data exists
      } catch (error) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData()
  }, [likesPageNumber]);


  // Handler to increase page number
  const increaseLikesPageNumber = () => {
      setLikesPageNumber((prevPage) => prevPage + 1);
    
  };

  // Redirect to user profile on click
  const redirectToProfile = (username) => {
    router.push(`/users/${username}`);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <Divider>
        <Typography>Likers</Typography>
      </Divider>
      <div style={{ padding: "10px", marginTop:'5px' }}>
        <Grid container spacing={2}>
          {likes.map((liker, index) => (
            <Grid
              onClick={() => redirectToProfile(liker.username)}
              key={index}
              item
              xs={12}
              sm={6}
            >
              <div  style={{  borderRadius:'5px', border:'1px solid rgba(0, 0, 0, 0.1)', padding:'5px', cursor: "pointer", alignItems:'center',  display:'flex', gap: '10px' }}>
                <Avatar
                  alt={liker.name}
                  src={liker.profile_pic_src || ""}
                >
                  {!liker.profile_pic_src ? liker.username[0].toUpperCase() : ""}
                </Avatar>
                <Typography>{liker.name}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>

        {/* Load more button */}
        {moreDataExists && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: '10px' }}>
            <Button loading={isLoading} onClick={increaseLikesPageNumber}>
              View More 
            </Button>
          </div>
        )}

        {/* Display end of results */}
        {!moreDataExists && likes.length > 0 && (
          <Typography style={{ textAlign: "center", marginTop: '15px' }}>
            End of Results
          </Typography>
        )}

        {/* No likes found */}
        {!moreDataExists && likes.length === 0 && (
          <Typography style={{ textAlign: "center", marginTop: '10px' }}>
            No Likes Found
          </Typography>
        )}
      </div>
    </div>
  );
}
