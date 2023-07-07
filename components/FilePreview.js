import React, { useEffect, useState } from 'react'
import styles from '../styles/FilePreview.module.css'
import Image from 'next/image'

const FilePreview = ({ fileData }) => {
    const [image, setImage] = useState(null)
    const [passport, setPassport] = useState(null)

    const items = {
        0: {
            item: image,
            setter: setImage,
        },
        1: {
            item: passport,
            setter: setPassport,
        },
    }
    // useEffect(() => {
    //     [0, 1].forEach((idx) => {
    //         const reader = new FileReader()
    //         reader.readAsDataURL(items[idx]['item'])
    //         reader.onload = () => {
    //             items[idx]['setter'](reader.result)
    //         }
    //         render.onload()
    //     })
    // }, [fileData])

    // const imageShower = (file, idx) => {
    //     // const image = new Image()
    //     // image.src = URL.createObjectURL(file)
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = () => {
    //         items[idx]['setter'](reader.result)
    //     }
    // }

    return (
        <div className={styles.fileList}>
            <div className={styles.fileContainer}>
                {fileData.fileList.map((f) => {
                    console.log('file', f)
                    return (
                        <div>
                            <Image
                                src={f}
                                height={50}
                                width={200}
                                alt={f.name}
                                className="object-contain"
                            />
                            <p>{f.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// <ol key={f.lastModified}>
//     <image src={f} />
//     <ul className={styles.fileList}>
//         <p>{f.name}</p>
//         <div key={f.name} className={styles.fileName}>
//             {showFile(f)}
//         </div>
//     </ul>
// </ol>
export default FilePreview
