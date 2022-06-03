import React from 'react'

export default function Header() {
    let date = new Date()
    return (
        <div className='w-full fixed top-0'>
            <div className="h-1 mb-2 bg-gradient-to-r from-violet-500 to-[#4843D9]"></div>
            <div className='max-w-5xl text-right flex flex-col mx-auto my-0'>
                <div className="mr-auto w-fit ">
                    <p className='text-xs text-[#4843D9] font-medium pb-1 block'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-2 stroke-[#4843D9] h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </p>
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
