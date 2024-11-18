'use client'
import { Paper, Stack } from "@mui/material"
import { Island_Moments } from "next/font/google"
import { useEffect, useState } from "react"


import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import Link from "next/link";

export default function User({params}){

    const [wallet, setWallet] = useState([])
    const [isLoading, setIsLoading] = useState(false) 

    useEffect(()=> {

        async function fetchData(){
            const wallet = await fetch('/api/mywallet')
            const walletJSON = await wallet.json()
            setWallet(walletJSON) 
        }

        fetchData()

    }, [])

    if(isLoading){
        return <h1>Loading</h1>
    }

    if(!wallet.supportHistory){
        return(
            <Paper>
                <h2 style={{textAlign:'center', padding:'20px'}}>
                    No support history found
                </h2>
            </Paper>
        )
    }

    return(
      <Stack direction={'column'} sx={{marginTop:'20px'}} gap={3}>
        <Paper>
            <h2 style={{textAlign:'center'}}>
                Total Received:    
                ${wallet?.supportHistory?.reduce((total, transaction) => total + transaction.amount, 0)}
            </h2>
        </Paper>
        <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SN</TableCell>
                <TableCell>Supported By</TableCell>
                <TableCell>Amount (USD)</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wallet?.supportHistory?.map((s, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell> {/* Serial number */}
                  <TableCell>
                        <Link href={'/users/'+s.supported_by}>
                            {s.supported_by}
                        </Link>                    
                    </TableCell> {/* Supported By */}
                  <TableCell>{s.amount.toFixed(2)}</TableCell> {/* Amount */}
                  <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell> {/* Date */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Stack>
    )
}