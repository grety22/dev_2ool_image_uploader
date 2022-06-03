import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddImages from './components/AddImages'
import Header from './components/Header'
import ImagesRenamed from './components/ImagesRenamed'

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center mt-20 font-sans'>
      <Header/>
      <AddImages/>
    </div>
  )
}
