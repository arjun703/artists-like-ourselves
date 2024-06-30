'use client'
import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Popover, Popper, Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { pOSTRequest, getRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';
import { Router } from 'next/router';

export default function Search({onBackClick, isAtLeastLg}) {

    const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
    
    const [suggestions, setSuggestions] = useState([]);
    
    const [suggestionsFetched, setSuggestionsFetched] = useState(false)

    const [query, setQuery]  = useState('')

    useEffect( () => {

        setAnchorEl(document.getElementById('input-and-auto-complete'))

        const fetchSuggestions = async () => {
            
            try {
                setSuggestions([])
                setIsFetchingSuggestions(true);
                setSuggestionsFetched(false)
                const data = await getRequest('/api/search?query='+encodeURIComponent(query)); // Adjust the API endpoint URL as needed
                setIsFetchingSuggestions(false)
                setSuggestionsFetched(true)
                let suggestions = data.suggestions
                if(suggestions.length){
                    setSuggestions([...new Set([...suggestions.map(s => s.name).slice(0, 4), ...suggestions.map(s => s.sport).slice(0, 4)])]);
                }
            } catch (error) {
                alert(error.message)
            }
        };

        if(query != ''){
            fetchSuggestions();
        }else{
            setSuggestions([])
            setSuggestionsFetched(false)
        }

        const handleBodyClick = (event) => {
            // Check if the clicked element is not the input or autocomplete component
            handleClose()
        };

        document.body.addEventListener('click', handleBodyClick);

    }, [query])

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClose = () => {
        setTimeout(()=> {setAnchorEl(null)}, 100)
    }

    return (
        <>
            <Grid container alignItems={'center'}>
                {
                    !isAtLeastLg &&
                    <Grid sx={{textAlign: 'center'}} onClick={onBackClick} item auto xs={1.5}>
                        <IconButton> <ArrowBackIcon/></IconButton>
                    </Grid>
                }
                <Grid item xs={9.5}>
                    <Paper
                        component="form"
                        id="input-and-auto-complete"
                        sx={{ p: '2px 4px', borderRadius: '25px', display: 'flex', alignItems: 'center', width: '100%' }}
                    >
                        <InputBase
                            sx={{ ml: 1, p: '8px', flex: 1}}
                            placeholder="Search artists"
                            autoFocus={isAtLeastLg ? false : true}
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <div >
                            { isFetchingSuggestions && 
                                <Popper 
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    sx={{p: 1}}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                >   
                                    <Paper elevation={3} sx={{padding: '10px', textAlign: 'center'}}>
                                        <SuggestionsLoadingUI /> 
                                    </Paper>
                                </Popper> 
                            }
                            { suggestionsFetched  && 
                                <Popper
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    sx={{p: 1, minWidth: '350px', maxWidth: '90%'}}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Paper elevation={5} sx={{padding: '10px 0'}}>
                                        <AutoCompleteSuggestions ss={suggestions}/> 
                                    </Paper>
                                </Popper>
                            }
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

function DisplayNoSuggestions(){
    return(
        <div style={{padding:'20px 0', textAlign:'center'}}>
            No Suggestion!
        </div>
    );
}

import { useRouter } from 'next/navigation';

function Suggestion({s}){
    const router = useRouter()
    const handleClick = (s) => {router.push('/search/'+encodeURIComponent(s))}
    return(
        
        <ListItemButton onClick={()=>{ handleClick(s)}}>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary={s} />
        </ListItemButton>
    )
}

function DisplaySuggestions({ss}){
    
    return(
        <List
            sx={{ width: '100%', zIndex: 9999, maxWidth: '400px', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {
                ss.map((suggestion, index) => ( <Suggestion key={index} s={suggestion} /> ) )
            }
        </List>
    );
}



function AutoCompleteSuggestions({ss}){
    
    return(
        <>
            {
                ss.length
                    ? <DisplaySuggestions ss={ss} />
                    : <DisplayNoSuggestions />
            }      
            
        </>
    );
}

function SuggestionsLoadingUI(){
    return(
        <>
            <div>Loading</div>
        </>
    )
}
