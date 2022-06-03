import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../../firebase"
import Image from 'next/image'

export default function ImagesRenamed() {
    const [imgs, setImgs] = useState([])
    
    const renameImgs = (img) => {
        const rename_imgs = img.imgs?.map(file => (
            <div key={file.id} >
                <Image src={file} width={200} height={100} alt=""/>
            </div>
        ))
        return rename_imgs
    }

    useEffect(() => {
        const collectionRef = collection(db, "pattern")
        const q = query(collectionRef, orderBy("timestamp", "desc"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setImgs(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime()})))
        })
        return unsubscribe
    },[])

    return (
        <div>
            {imgs.map(img =>
                <div key={img.id}>
                    <div>
                        {img.caption}
                    </div>
                    <div>
                        {renameImgs(img)}
                    </div>
                </div>
            )}
        </div>
    )
}
