import { Card } from './Card'
import { FC, useEffect, useState } from 'react'
import { StudentIntro } from '../models/StudentIntro'
import * as Web3 from '@solana/web3.js'

const STUDENT_INTRO_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf'

export const StudentIntroList: FC = () => {
    const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([])
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))

    useEffect(() => {
            connection.getProgramAccounts(
                new Web3.PublicKey(STUDENT_INTRO_PROGRAM_ID)
            ).then(async (accounts) => {
                const  studentintros: StudentIntro[] = accounts.reduce((accum: StudentIntro[], {pubkey, account }) => {
                    const studentintro = StudentIntro.deserialize(account.data)
                    if(!studentintro){
                        return accum
                    }

                    return [...accum, studentintro]
                }, [])
                
                setStudentIntros(studentintros)
            })
    }, [])
    
    return (
        <div>
            {
                studentIntros.map((studentIntro, i) => <Card key={i} studentIntro={studentIntro} /> )
            }
        </div>
    )
}