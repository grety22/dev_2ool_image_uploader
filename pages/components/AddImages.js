import React, { useCallback, useState, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuid } from 'uuid'
import { db, storage } from '../../firebase'
import { addDoc, arrayUnion, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore'
import { async } from '@firebase/util'
import { ref, getDownloadURL, uploadBytes } from '@firebase/storage' 
import Card from './Card'
import Image from 'next/image'

export default function AddImages() {
    const unique_id = uuid();
    const [selectedImgs, setSelectedImgs] = useState([]);
    const captionRef = useRef(null)
    const uploadRenamed = async() => {
        const docRef = await addDoc(collection(db, "pattern"), {
            caption: captionRef.current.value,
            timestamp: serverTimestamp()
        })
        await Promise.all(
            selectedImgs.map(img => {
                const imageRef = ref(storage, `pattern/${docRef.id}/${img.path}`)
                uploadBytes(imageRef, img, "data_url").then(async() => {
                    const downloadURL = await getDownloadURL(imageRef)
                    await updateDoc(doc(db, "pattern", docRef.id), {
                        imgs:arrayUnion(downloadURL)
                    })
                })
            })
        )
        captionRef.current.value=''
        setSelectedImgs([])
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                setSelectedImgs((prevState) => [
                    ...prevState,
                    { id: index, src: e.target.result },
                ]);
            };
            reader.readAsDataURL(file);
            console.log(file);
            return file;
        });
    }, []);

    const {    
            getRootProps,
            getInputProps,
            acceptedFiles,
            open,
            isDragAccept,
            isFocused,
            isDragReject,
            isDragActive,
        } = useDropzone({
            accept: 'image/*',
            onDrop,
            noClick: true,
            noKeyboard: true,
    })

    // useEffect(() => {
    //     selectedImgs.forEach(file => URL.revokeObjectURL(file.preview));
    // }, [selectedImgs]);
    
    const selected_imgs = acceptedFiles.map((file) => (
        <div className="bg-white p-2 shadow-3xl rounded-lg text-center flex items-center flex-col justify-between" key={unique_id}>
            <div className="group bg-white pt-2 pr-2 pb-4 pl-4 border cursor-pointer rounded-bl-full text-center ml-auto hover:border-[#4843D9]" key={unique_id}>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-1 stroke-[#77808C] group-hover:stroke-[#4843D9] group-hover:stroke-2 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
            <img src={file.preview} className="w-48 h-auto my-0 mx-auto" alt=""/>
            <p className="w-48 h-auto break-words text-[#77808C] border-t-2 block bg-[#F9FAFB] mt-4 mb-0 py-2 " alt="">{file.name}</p>
        </div>
    ))
    
    return (
        <>
            <Card bgColor={'bg-white'} shadow={'shadow-3xl'}>
                <div {...getRootProps({ isDragAccept, isFocused, isDragReject })} className={`
                    bg-right-bottom
                    bg-contain
                    bg-no-repeat
                    bg-upload-img-gray
                    bg-[#F9FAFB]
                    mx-8
                    mt-14
                    mb-4
                    text-center 
                    h-96 
                    rounded-lg
                    border-dashed
                    border-2
                    border-[#e7eaed]
                    flex 
                    justify-center 
                    items-center
                    cursor-pointer
                    group
                    focus-visible:border-slate-100
                    transition ease-in-out delay-50
                    hover:border-[#4843D9] duration-300
                    hover:bg-[#EEF2FF]
                    hover:bg-upload-img-color
                    ${isDragActive ? `border-[#4843D9] bg-upload-img-color` : `border-[#e7eaed] bg-upload-img-gray`}
                    `}>
                    <input {...getInputProps()} />
                    { isDragActive ?
                        <p className='text-[#77808C] text-xl absolute mt-10'>drop your images here ...</p> :
                        <>
                            <p className='text-[#77808C] text-xl absolute mt-10'>drag your images here ...</p><br/>
                            <p className='text-[#77808C] text-xl absolute mt-28'>or click <span className='text-[#4843D9] font-extrabold hover:underline hover:underline-offset-8'>HERE</span></p>
                        </>
                    }
                </div>
                <p className='text-[#77808C] text-lg ml-8 mb-10'>supported image types: <span className='font-bold'>png, svg, jpg</span></p>
            </Card>
            <Card shadow={'none'} grid={'grid grid-cols-3 gap-4'}>{ selected_imgs }</Card>
        </>
    )
}
