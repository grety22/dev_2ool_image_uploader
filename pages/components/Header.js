import React from 'react'

export default function Header() {
    // let date = new Date()
    return (
        <div className='w-full fixed top-0'>
            <div className="h-1 mb-2 bg-gradient-to-r from-violet-500 to-[#4843D9]"></div>
            <div className='max-w-5xl text-right flex flex-col mx-auto my-0 group'>
                <div className="mr-auto w-fit">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                        <div className="w-2 h-2 rounded-full group-hover:animate-pulse bg-[#4843D9]"></div>
                        <div className="w-2 h-2 rounded-full group-hover:animate-pulse bg-[#4843D9]"></div>
                        <div className="w-2 h-2 rounded-full group-hover:animate-pulse bg-[#4843D9]"></div>
                    </div>
                </div>
                <div className="
                    mr-auto 
                    w-fit 
                    bg-gradient-to-r 
                    from-indigo-500 via-purple-500 to-pink-500
                    rounded-r-full 
                    rounded-bl-full 
                    p-0.5
                    hover:bg-gradient-to-l
                    from-indigo-500 via-purple-500 to-pink-500
                    ">
                    <p className='cursor-pointer text-xs text-[#4843D9] font-medium border p-4 rounded-r-full rounded-bl-full bg-white block'>
                        dev_2ool 
                        {/* <span className='text-xs text-[#77808C]'> {date.getFullYear()}</span> */}
                    </p>
                </div>
            </div>
        </div>
    )
}
