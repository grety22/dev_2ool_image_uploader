import React, { useState } from 'react'
import AddImages from './components/AddImages'
import Header from './components/Header'
import Aside from './components/Aside'

export default function Home() {
  const [myFiles, setMyFiles] = useState([])
  
  const onDropHandler = (droppedFiles) => { setMyFiles(droppedFiles) }

  const btnClass = myFiles.length > 0 ? 'w-full h-10 bg-[#4843D9] rounded-lg text-white font-bold border border-[#77808C] hover:bg-white hover:border-[#4843D9] hover:text-[#4843D9]' : 'w-full h-10 bg-[#77808C] rounded-lg text-white font-bold border border-[#77808C] cursor-not-allowed'

  const removeAllImages = () => { myFiles.length > 0 && setMyFiles([])}

  return (
    <div className='flex flex-col justify-center items-center mt-20 font-sans'>
      <Header />
      <AddImages myFiles={myFiles} onDropFiles={onDropHandler}/>
      <Aside removeAll={removeAllImages} btnClass={btnClass} />
    </div>
  )
}
