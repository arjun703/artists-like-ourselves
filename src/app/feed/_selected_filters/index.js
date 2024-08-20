import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { Grid } from '@mui/material';

export default function DisplaySelectedFiltersChips({filters, handleDelete}){
    return(
        <Card sx={{p: 2}}>
            <Grid container justifyContent={'center'} spacing={1}>
                {
                    filters.map( (filter, index) => {
                        return(
                            <Grid item auto>
                                <Chip
                                    key={index}
                                    color="success"
                                    label={filter}
                                    onClick={() => {handleDelete(filter)}}
                                    onDelete={() => {handleDelete(filter)}}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Card>
    )
}