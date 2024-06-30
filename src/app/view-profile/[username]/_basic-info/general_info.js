import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
export default function basicInfo({basicInfo}){
    
    const genders = {
        male: 'Male',
        female: 'Female',
        rather_not_say: 'Rather not Say'
    }
    
    return(
        <Paper sx={{ p: '0 20px 20px 20px' }}>
            <h3 style={{ marginBottom: '10px', color: '#333' }}>General Info</h3>
            <Box>
                <div style={{ marginBottom: '10px' }}>
                    <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Name:</span>
                    <span className="general-info-value">{basicInfo?.name}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Date of Birth:</span>
                    <span className="general-info-value">{basicInfo?.date_of_birth}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Gender:</span>
                    <span className="general-info-value">{genders[basicInfo?.gender]}</span>
                </div>
                <div>
                    <span className="general-info-label" style={{ fontWeight: 'bold', marginRight: '10px' }}>Identification Number / Passport Number:</span>
                    <span className="general-info-value">{basicInfo?.identification_number}</span>
                </div>
            </Box>
        </Paper>
    )
}