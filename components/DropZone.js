'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import FilePreview from './FilePreview'
import styles from '../styles/DropZone.module.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const DropZone = ({ data, dispatch, document_type }) => {
    const { data: session } = useSession()
    const router = useRouter()

    // onDragEnter sets inDropZone to true
    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true })
    }

    // onDragLeave sets inDropZone to false
    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
    }

    // onDragOver sets inDropZone to true
    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()

        // set dropEffect to copy i.e copy of the source item
        e.dataTransfer.dropEffect = 'copy'
        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true })
    }

    // onDrop sets inDropZone to false and adds files to fileList
    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        // get files from event on the dataTransfer object as an array
        let file = e.target.files[0]

        // ensure a file or files are dropped
        if (file) {
            const existingFile = data.file.name
            file = existingFile !== file.name ? file : data.file

            dispatch({ type: 'ADD_FILE_TO_LIST', file })
            dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false })
            uploadDocument(file)
        }
    }

    // handle file selection via input element
    const handleFileSelect = (e) => {
        let file = e.target.files[0]

        // ensure a file or files are selected
        if (file) {
            const existingFile = data.file.name
            file = existingFile !== file.name ? file : data.file

            // dispatch action to add selected file or files to fileList
            dispatch({ type: 'ADD_FILE_TO_LIST', file })
            uploadDocument(file)
        }
    }

    const uploadDocument = async (file) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = async () => {
                const response = await fetch('/api/file/new', {
                    method: 'POST',
                    body: JSON.stringify({
                        image: reader.result,
                        type: document_type,
                        userId: session?.user.id,
                    }),
                })

                if (response.ok) {
                    console.log('Files uploaded successfully.')
                    router.push('/')
                } else {
                    console.log(
                        'Experienced a problem while uploading the files.'
                    )
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="">
            <div
                className="dropzone"
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragEnter={(e) => handleDragEnter(e)}
                onDragLeave={(e) => handleDragLeave(e)}
            >
                {/* <Image
                    src="../public/assets/images/upload.svg"
                    alt="upload"
                    height={50}
                    width={50}
                /> */}

                <input
                    id="fileSelect"
                    type="file"
                    multiple={false}
                    className={styles.files}
                    onChange={(e) => handleFileSelect(e)}
                />
                <label className="blue_btn" htmlFor="fileSelect">
                    Select a single file
                </label>

                <h3 className="light_desc">
                    or drag &amp; drop your files here
                </h3>
            </div>
            {/* <FilePreview fileData={data} /> */}
            {/* {data.fileList.length == 2 && (
                <button className={styles.uploadBtn} onClick={uploadDocuments}>
                    Upload
                </button>
            )} */}
        </section>
    )
}

export default DropZone
