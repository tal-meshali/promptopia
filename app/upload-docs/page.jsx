'use client'
import React, { useReducer, useState, useEffect } from 'react'
import DropZone from '@components/DropZone'
import styles from '../../styles/Home.module.css'
import { useSession } from 'next-auth/react'

export default function Home() {
    const { data: session } = useSession()
    const [documents, setDocuments] = useState({
        image: '',
        passport: '',
    })

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await fetch(`/api/${session?.user.id}`)
            const data = await response.json()
            setDocuments(data)
        }
        if (session?.user.id) fetchDocuments()
    }, [])

    // reducer function to handle state changes
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_IN_DROP_ZONE':
                return { ...state, inDropZone: action.inDropZone }
            case 'ADD_FILE_TO_LIST':
                return {
                    ...state,
                    fileList: state.fileList.concat(action.files),
                }
            default:
                return state
        }
    }

    // destructuring state and dispatch, initializing fileList to empty array
    const [data, dispatch] = useReducer(reducer, {
        inDropZone: false,
        file: ""
    })

    return (
        <div className=''>
            <h1 className="head_text text-left">
                <span className="blue_gradient">Drag And Drop File Upload</span>
            </h1>
                <DropZone data={data} dispatch={dispatch} />
        </div>
    )
}
