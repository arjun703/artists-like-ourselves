import { Paper, Stack, Container, Grid, Skeleton } from "@mui/material"
import Education from "./education";
import { useState, useEffect } from "react";
import AcademicFiles from "./academic_files";
import { pOSTRequest, getRequest, uPDATErequest, dELETErequest } from '@/app/_components/file_upload';

export default function Academics({username}) {

    const [educations, setEducations] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [editable, setIsEditable] = useState(false)
    
    useEffect(() => {
        async function fetchAcademics() {
            try {
                const data = await getRequest('/api/academics/?username='+username); // Adjust the API endpoint URL as needed
                setIsLoading(false)
                setIsEditable(data.editable)
                setEducations(data.educations)
                setAcademicFiles(data.academicFiles)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchAcademics();
    }, []);


    const handleAddEducation = async (eduInfo) => {
        const formData = new FormData();
        formData.append('info', JSON.stringify(eduInfo));
        const result = await pOSTRequest(formData, '/api/academics/education/')
        if (result.success) {
            setTimeout(() => {
                setEducations(prevEducations => [
                    result.education,
                    ...prevEducations
                ]);
            }, 100)
            console.log("new educations")
            console.log(educations)
            return true
        } else {
            return false
            alert(result.msg)
        }
    }

    const handleEditEducation = async (education) => {
        const formData = new FormData();
        formData.append('education', JSON.stringify(education));
        const result = await uPDATErequest(formData, '/api/academics/education/')
        if (result.success) {
            setTimeout(() => {
                setEducations(prevEducations => {
                    prevEducations = prevEducations.filter(pe => pe.id !== result.education.id)
                    return [
                        result.education,
                        ...prevEducations
                    ]
                });
            }, 100)
            return true;
        } else {
            return false;
            alert(result.msg)
        }
    }

    const handleDeleteEducation = async (id) => {
        const formData = new FormData();
        formData.append('education_id', id);
        const response = await dELETErequest(formData, '/api/academics/education/')
        if (response.success && response.education_id === id) {
            setEducations(prevEducations => prevEducations.filter(pe => pe.id !== id))
            return true;
        }
    }

    const [academicFiles, setAcademicFiles] = useState([])

    const handleAddAcademicFile = async (type, file, description) => {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('file', file);
        formData.append('description', description);
        const result = await pOSTRequest(formData, '/api/academics/files/')
        if (result.success) {
            setTimeout(() => {
                setAcademicFiles(prevAcademicFiles => {
                    return [
                        result.academicFile,
                        ...prevAcademicFiles
                    ]
                });
            }, 100)
            return true;
        } else {
            alert(result.msg)
            return false;
        }
    }

    const handleEditAcademicFile = async (academicInfo) => {
        const formData = new FormData();
        formData.append('academic_info', JSON.stringify(academicInfo));
        const result = await uPDATErequest(formData, '/api/academics/files/')
        if (result.success) {
            setTimeout(() => {
                setAcademicFiles(prevAcademicFiles => {
                    prevAcademicFiles = prevAcademicFiles.filter(pa => pa.id !== result.academicFile.id)
                    return [
                        result.academicFile,
                        ...prevAcademicFiles
                    ]
                });
            }, 100)
            return true;
        } else {
            alert(result.msg)
            return false;
        }
    }

    const handleDeleteAcademicFile = async (id) => {
        const formData = new FormData();
        formData.append('academic_info_id', id);
        const response = await dELETErequest(formData, '/api/academics/files')
        if (response.success && response.academic_info_id === id) {
            setAcademicFiles(prevAcademicFiles => prevAcademicFiles.filter(paf => paf.id !== id))
            return true
        }else{
            return false
        }
    }

    return (
        <>
            {
                isLoading ?
                    (
                        <>
                            <DisplaySkeleton />
                        </>
                    ) : (
                        <Stack spacing={2}>
                            <Education
                                isEditable={editable}
                                educations={educations}
                                handleAddEducation={handleAddEducation}
                                handleEditEducation={handleEditEducation}
                                handleDeleteEducation={handleDeleteEducation}
                            />
                            <AcademicFiles
                                isEditable={editable}
                                academicFiles={academicFiles}
                                handleEditAcademicFile={handleEditAcademicFile}
                                handleAddAcademicFile={handleAddAcademicFile}
                                handleDeleteAcademicFile={handleDeleteAcademicFile}
                            />
                        </Stack>
                    )
            }
        </>
    )
}

function DisplaySkeleton() {
    return (
        <>
            <Stack spacing={2}>
                <Paper sx={{ padding: { md: 3, xs: 1 } }}>
                    <Grid container sx={{ alignItems: 'center', margin: 0, marginBottom: '20px' }} >
                        <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                        <Grid item auto><Skeleton variant="circular" width={40} height={40} /></Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ padding: 1 }}>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ padding: 1 }}>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ padding: 1 }}>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper sx={{ padding: { md: 3, xs: 1 } }}>
                    <Grid container sx={{ alignItems: 'center', margin: 0, marginBottom: '20px' }} >
                        <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                        <Grid item auto><Skeleton variant="circular" width={40} height={40} /></Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ padding: 1 }}>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ padding: 1 }}>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{ padding: 1 }}>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                                <Grid item xs><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Stack>
        </>
    )
}