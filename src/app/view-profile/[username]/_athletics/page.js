import AdditionalSport from "./additional_sport"
import PressOrInterview from "./press"
import Stack from '@mui/material/Stack';
import Training from "./training";
import Coach  from "./coach";
import Team from "./teams";
import { useState, useEffect } from "react";
import { pOSTRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';

export default function Athletics({username}){

    const [pressOrInterviews, setPressOrInterviews] = useState([]) 
    const [teams, setTeams] = useState([]) 
    const [coaches, setCoaches] = useState([]) 
    const [trainings, setTrainings] = useState([]) 
    const [additionalSports, setAdditionalSports] = useState([]) 
    const [isLoading, setIsLoading] = useState(true)
    const [editable, setIsEditable] = useState(false)
    useEffect(() => {
        async function fetchAthletics() {
            try {
                const response = await fetch('/api/athletics?username='+username); // Adjust the API endpoint URL as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setIsLoading(false)
                setIsEditable(data.editable)
                setPressOrInterviews(data.press_or_interviews)
                setAdditionalSports(data.additional_sports)
                setTrainings(data.trainings)
                setCoaches(data.coaches)
                setTeams(data.teams)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchAthletics();
    }, []);

    const handleAddNewPressOrInterview = async (pressOrInterviewInfo) => {
        const formData = new FormData();
        formData.append('press_or_interview_info', JSON.stringify(pressOrInterviewInfo));
        const result = await pOSTRequest(formData, '/api/athletics/press_or_interview/')
        if (result.success) {
            setTimeout(() => {
                setPressOrInterviews(prevState => [
                    result.press_or_interview,
                    ...prevState
                ]);
            }, 100)
            return true
        } else {
            return false
            alert(result.msg)
        }
    }
    

    const handleEditPressOrInterview=async(pressOrInterview)=>{
        
        const formData = new FormData();
        formData.append('press_or_interview', JSON.stringify(pressOrInterview));
        const result = await uPDATErequest(formData, '/api/athletics/press_or_interview/')
        if (result.success) {
            setTimeout(() => {
                setPressOrInterviews(prevState => {
                    prevState = prevState.filter(ps => ps.id !== result.press_or_interview.id)
                    return [
                        result.press_or_interview,
                        ...prevState
                    ]
                });
            }, 100)
            return true;
        } else {
            return false;
            alert(result.msg)
        }
    }

    
    const handleDeletePressOrInterview = async (id) => {
        const formData = new FormData();
        formData.append('press_or_interview_id', id);
        const response = await dELETErequest(formData, '/api/athletics/press_or_interview/')
        if (response.success && response.press_or_interview_id === id) {
            setPressOrInterviews(prevState => prevState.filter(ps => ps.id !== id))
            return true;
        }else{
            return false
        }
    }


    const handleAddNewAdditionalSport= async (additionalSPortInfo) => {
        const formData = new FormData();
        formData.append('additional_sport_info', JSON.stringify(additionalSPortInfo));
        const result = await pOSTRequest(formData, '/api/athletics/additional_sport/')
        if (result.success) {
            setTimeout(() => {
                setAdditionalSports(prevState => [
                    result.additional_sport,
                    ...prevState
                ]);
            }, 100)
            return true
        } else {
            return false
            alert(result.msg)
        }
    }
    

    const handleEditAdditionalSport=async(additionalSport)=>{
        
        const formData = new FormData();
        formData.append('additional_sport', JSON.stringify(additionalSport));
        const result = await uPDATErequest(formData, '/api/athletics/additional_sport/')
        if (result.success) {
            setTimeout(() => {
                setAdditionalSports(prevState => {
                    prevState = prevState.filter(ps => ps.id !== result.additional_sport.id)
                    return [
                        result.additional_sport,
                        ...prevState
                    ]
                });
            }, 100)
            return true;
        } else {
            return false;
            alert(result.msg)
        }
    }

    
    const handleDeleteAdditionalSport= async (id) => {
        const formData = new FormData();
        formData.append('additional_sport_id', id);
        const response = await dELETErequest(formData, '/api/athletics/additional_sport/')
        if (response.success && response.additional_sport_id === id) {
            setAdditionalSports(prevState => prevState.filter(ps => ps.id !== id))
            return true;
        }else{
            return false
        }
    }





    const handleAddNewTraining= async (trainingInfo) => {
        const formData = new FormData();
        formData.append('training_info', JSON.stringify(trainingInfo));
        const result = await pOSTRequest(formData, '/api/athletics/training/')
        if (result.success) {
            setTimeout(() => {
                setTrainings(prevState => [
                    result.training,
                    ...prevState
                ]);
            }, 100)
            return true
        } else {
            return false
            alert(result.msg)
        }
    }


    const handleEditTraining=async(training)=>{
        
        const formData = new FormData();
        formData.append('training', JSON.stringify(training));
        const result = await uPDATErequest(formData, '/api/athletics/training/')
        if (result.success) {
            setTimeout(() => {
                setTrainings(prevState => {
                    prevState = prevState.filter(ps => ps.id !== result.training.id)
                    return [
                        result.training,
                        ...prevState
                    ]
                });
            }, 100)
            return true;
        } else {
            return false;
            alert(result.msg)
        }
    }

    
    const handleDeleteTraining= async (id) => {
        const formData = new FormData();
        formData.append('training_id', id);
        const response = await dELETErequest(formData, '/api/athletics/training/')
        if (response.success && response.training_id === id) {
            setTrainings(prevState => prevState.filter(ps => ps.id !== id))
            return true;
        }else{
            return false
        }
    }





    const handleAddNewCoach= async (coachInfo) => {
        const formData = new FormData();
        formData.append('coach_info', JSON.stringify(coachInfo));
        formData.append('accredeted_coaching_license_file', coachInfo.accredeted_coaching_license_file);
        const result = await pOSTRequest(formData, '/api/athletics/coach/')
        if (result.success) {
            setTimeout(() => {
                setCoaches(prevState => [
                    result.coach,
                    ...prevState
                ]);
            }, 100)
            return true
        } else {
            return false
            alert(result.msg)
        }
    }


    const handleEditCoach=async(coach)=>{
        
        const formData = new FormData();
        formData.append('coach', JSON.stringify(coach));
        const result = await uPDATErequest(formData, '/api/athletics/coach/')
        if (result.success) {
            setTimeout(() => {
                setCoaches(prevState => {
                    prevState = prevState.filter(ps => ps.id !== result.coach.id)
                    return [
                        result.coach,
                        ...prevState
                    ]
                });
            }, 100)
            return true;
        } else {
            return false;
            alert(result.msg)
        }
    }

    
    const handleDeleteCoach= async (id) => {
        const formData = new FormData();
        formData.append('coach_id', id);
        const response = await dELETErequest(formData, '/api/athletics/coach/')
        if (response.success && response.coach_id === id) {
            setCoaches(prevState => prevState.filter(ps => ps.id !== id))
            return true;
        }else{
            return false
        }
    }



    const handleAddNewTeam= async (teamInfo) => {
        const formData = new FormData();
        formData.append('team_info', JSON.stringify(teamInfo));
        const result = await pOSTRequest(formData, '/api/athletics/team/')
        if (result.success) {
            setTimeout(() => {
                setTeams(prevState => [
                    result.team,
                    ...prevState
                ]);
            }, 100)
            return true
        } else {
            return false
            alert(result.msg)
        }
    }


    const handleEditTeam=async(team)=>{
        
        const formData = new FormData();
        formData.append('team', JSON.stringify(team));
        const result = await uPDATErequest(formData, '/api/athletics/team/')
        if (result.success) {
            setTimeout(() => {
                setTeams(prevState => {
                    prevState = prevState.filter(ps => ps.id !== result.team.id)
                    return [
                        result.team,
                        ...prevState
                    ]
                });
            }, 100)
            return true;
        } else {
            return false;
            alert(result.msg)
        }
    }

    const handleDeleteTeam= async (id) => {
        const formData = new FormData();
        formData.append('team_id', id);
        const response = await dELETErequest(formData, '/api/athletics/team/')
        if (response.success && response.team_id === id) {
            setTeams(prevState => prevState.filter(ps => ps.id !== id))
            return true;
        }else{
            return false
        }
    }

    return(
        <Stack spacing={2}>
            <Team
                isEditable={editable} 
                teams={teams}
                handleAddNew={handleAddNewTeam} 
                handleEdit={handleEditTeam} 
                handleDelete={handleDeleteTeam}
            />
            <Coach 
                isEditable={editable} 

                coaches={coaches}
                handleAddNew={handleAddNewCoach}
                handleEdit={handleEditCoach}
                handleDelete={handleDeleteCoach}
            />
            <Training 
            isEditable={editable} 
                trainings={trainings}
                handleAddNew={handleAddNewTraining}
                handleEdit={handleEditTraining}
                handleDelete={handleDeleteTraining}
            />
            <AdditionalSport
            isEditable={editable}  
                additionalSports={additionalSports}
                handleAddNew={handleAddNewAdditionalSport}
                handleEdit={handleEditAdditionalSport}
                handleDelete={handleDeleteAdditionalSport}
            />
            <PressOrInterview
            isEditable={editable}  
                pressesOrInterviews={pressOrInterviews}
                handleAddNewPressOrInterview={handleAddNewPressOrInterview}
                handleEditPressOrInterview={handleEditPressOrInterview}
                handleDeletePressOrInterview={handleDeletePressOrInterview}
            />
        </Stack>
    )
}