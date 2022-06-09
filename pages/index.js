import React, { useState, useRef } from 'react'

import AddImages from './components/AddImages'
import Header from './components/Header'
import Aside from './components/Aside'
// Firebase Imports  
import { db, storage } from '../firebase'
import { addDoc, arrayUnion, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from '@firebase/storage'

import JSZip from "jszip";
import { saveAs } from 'file-saver';

export default function Home() {
    const [myFiles, setMyFiles] = useState([])

    const patternRef = useRef(null)

    // Upload to Firebase 
    const uploadImages = async() => {
      const docRef = await addDoc(collection(db, "images"), {
        pattern: patternRef.current.value,
        timestamp: serverTimestamp()
      })
      await Promise.all(
          myFiles.map(img => {
              const imageRef = ref(storage, `images/${docRef.id}/${img.path}`)
              uploadBytes(imageRef, img, "data_url").then(async() => {
                  const downloadURL = await getDownloadURL(imageRef)
                  await updateDoc(doc(db, "images", docRef.id), {
                      imgs:arrayUnion(downloadURL)
                  })
              })
          })
      )
      setMyFiles([])
    }

    const onDropHandler = (droppedFiles) => { setMyFiles(droppedFiles) }

    const btnClass = myFiles.length > 0 ? 'w-4/5 h-10 bg-[#4843D9] rounded-full mx-4 text-white font-bold border-2 border-[#4843D9] hover:bg-white hover:border-[#4843D9] hover:text-[#4843D9]' : 'w-4/5 h-10 bg-white rounded-full mx-4 text-[#77808C] font-bold border-2 border-[#77808C] cursor-not-allowed'

    const btnEnable = myFiles.length > 0 ? '' : 'disabled'

    const removeAllImages = () => { myFiles.length > 0 && setMyFiles([]) }

    const downloadAllImages = () => {
        console.log("Files downloaded successfully 🥳 🎉 🍰")
        const zip = new JSZip();

        var downloadedFolder = zip.folder("employer-logos");
        var zipFilename = "images.zip";

        myFiles?.map(file => {downloadedFolder.file(file.updated, file.preview, {base64: true})})

        zip.generateAsync({ type: 'blob' }).then(function (content) {
            console.log(content) //delete this line
            saveAs(content, zipFilename);
        });
    }

    return (
        <div className='flex flex-col justify-center items-center mt-20 font-sans'>
            <Header />
            <AddImages myFiles={myFiles} onDropFiles={onDropHandler} pattern={patternRef}/>
            <Aside myFiles={myFiles} downloadAll={downloadAllImages} removeAll={removeAllImages} btnClass={btnClass} pattern={patternRef} btnEnable={btnEnable}/>
        </div>
    )
}
