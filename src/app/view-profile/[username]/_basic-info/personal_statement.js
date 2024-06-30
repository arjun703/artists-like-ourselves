import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, Tooltip, Button } from '@mui/material';

export default function PersonalStatement({ basicInfo }) {
    const [expanded, setExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);

    setTimeout(() => {
        // Measure the height of the content
        if(document.getElementById('personal_statement'))
        setContentHeight(document.getElementById('personal_statement').clientHeight);
    }, 1000);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const personalStatement = basicInfo?.personalStatement || ''

    return (
        
        <Paper sx={{ p: '0 20px 20px 20px', position: 'relative' }} >
            <Tooltip title="Info for coaches about athlete's collegiate goals and aspirations. This section will give you info for these questions:  What makes athlete a good candidate for coach's team? What makes this athlete different from other recruits in character, athletics and academics?">
                <h3 style={{ marginBottom: '10px', color: '#333' }}>Personal Statement</h3>
            </Tooltip>

            <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                <Typography id="personal_statement" sx={{ 
                    overflow: 'hidden', 
                    lineHeight: '25px',
                    WebkitLineClamp: expanded ? 'unset' : 8, 
                    display: '-webkit-box', 
                    WebkitBoxOrient: 'vertical' 
                }}>
                    {
                        personalStatement === ''
                           ? (
                                <>
                                    No Personal Statement Found
                                </>
                            )
                            :(
                                <>{ personalStatement }</>
                            )
                    }
                </Typography>
            </Box>
            {contentHeight >= 200 && !expanded && (
                    <Button 
                        onClick={toggleExpanded} 
                        color="primary" 
                        size="small" 
                    >
                        Read More
                    </Button>
                )}
                {expanded && (
                    <Button 
                        onClick={toggleExpanded} 
                        color="primary" 
                        size="small" 
                    >
                        Read Less
                    </Button>
                )}
        </Paper>
    );
}
