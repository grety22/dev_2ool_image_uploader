import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Card from './Card'


export default function AddImages({ myFiles, onDropFiles, pattern }) {
    var allImgsURL = []

    const rename = useCallback((torename) => {
        var oldName = torename.name
        var addPattern = oldName.replace(/(\.[\w\d_-]+)$/i, `${pattern.current.value ? pattern.current.value : '_color'}$1`);
        var toLower = addPattern.toLowerCase()
        var removeWhitespaces = toLower.replace(/\s+/g, '_')
        var addDash = removeWhitespaces.replace(/-/g, '_')
        var rmDoubleDash = addDash.replace('___', '_')
        var periodash = rmDoubleDash.replace('._', '_')
        var comma = periodash.replace(',', '')
        allImgsURL.push(comma)
        return comma;
    },[pattern, allImgsURL])

    const onDrop = useCallback(acceptedFiles => {
        onDropFiles([...myFiles, ...acceptedFiles.map(file => 
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                updated: rename(file, pattern),
            }),
        )])
    }, [myFiles, onDropFiles, pattern, rename])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
          'image/*': []
        },
        onDrop,
    });

    const removeFile = file => () => {
        const newFiles = [...myFiles]
        newFiles.splice(newFiles.indexOf(file), 1)
        onDropFiles(newFiles)
    }

    const checkEspecialChar = (esp_char) => {
        let find_char = esp_char.indexOf(",")
        let esp_class =  find_char > 0 ? "border border-pink-500" : ""
        return esp_class
    }

    const selected_imgs = myFiles?.map(file => (
            <div className={`bg-white p-2 shadow-3xl rounded-lg text-center flex items-center flex-col justify-between ${checkEspecialChar(file.name)}`} key={file.path}>
                <div className='flex flex-row-reverse mb-4'>
                    <div onClick={removeFile(file)} className="group bg-white pt-2 pr-2 pb-4 pl-4 border cursor-pointer rounded-bl-full text-center ml-auto hover:border-[#4843D9]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-1 stroke-[#77808C] group-hover:stroke-[#4843D9] group-hover:stroke-2 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                    {checkEspecialChar(file.name) !== '' ? <p className='text-pink-600 text-xs text-left'>Please check this img doesnt exist already in repo like : <a className='font-medium hover:underline hover:underline-offset-4' rel="noreferrer" href='https://github.com/TrilogyMarketing/Websites/tree/master/CodingBootcamp/media/svg-icons/employer-logos' target="_blank">{file.name}</a></p> : ""}
                </div>
                <div className='w-48 h-24'>
                    <a href={file.preview} download={file.updated} alt="">
                        <img src={file.preview} className="w-48 h-auto my-0 mx-auto hover:w-44" alt=""/>
                    </a>
                </div>
                <p className="w-fit h-auto break-all text-[#77808C] text-sm border-t-2 block bg-[#F9FAFB] mt-4 mb-0 p-2" alt="">{file.updated}</p>
            </div>
    ))

    return (
        <>
            <Card bgColor={'bg-white'} shadow={'shadow-3xl'}>
                <div {...getRootProps()} className={`
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
            <p className='block mb-8 text-[#77808C]'>{myFiles?.length > 0 ? <span>you dropped <span className='text-[#4843D9] font-bold'>{myFiles?.length || 0}</span> images</span> : ""}</p>
            {/* <button className="bg-red btn" onClick={downloadAll}>Download All</button> */}
            <Card shadow={'none'} grid={'grid grid-cols-3 gap-6'}>{ selected_imgs }</Card>
        </>
    )
}
