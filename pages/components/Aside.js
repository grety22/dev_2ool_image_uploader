import React from 'react'

export default function Aside({ removeAll, btnClass }) {
    return (
        <div className='w-full fixed top-20 z-0'>
            <div className='max-w-6xl flex flex-col mx-auto my-0'>
                <div className='w-52 h-[28rem] p-4 rounded-l-lg rounded-br-lg shadow-3xl bg-white ml-auto'>
                    <div className="border-b border-[#e7eaed] pb-6">
                        <label htmlFor="pattern" className="mb-4 block text-sm text-[#77808C]">renaming pattern :</label>
                        <input
                            type="text"
                            name="pattern"
                            id="pattern"
                            placeholder=''
                            autoComplete="given-name"
                            className="mb-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 text-sm border border-[#e7eaed] rounded-lg"
                        />
                        <button className={btnClass}>RENAME</button>
                    </div>
                    <div className="border-b border-[#e7eaed] py-6">
                        <button className={btnClass} onClick={removeAll}>DELETE ALL</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
