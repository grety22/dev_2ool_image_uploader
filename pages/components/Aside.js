import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import copy from 'copy-to-clipboard';

export default function Aside({ removeAll, btnClass, downloadAll, pattern, btnEnable, myFiles }) {
    let listUpdated = []
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenTB, setIsOpenTB] = useState(false)

    function closeModal() {setIsOpen(false); copy(listUpdated);}  
    function openModal() {setIsOpen(true)}

    function closeModalTB() {setIsOpenTB(false); copy(component);}  
    function openModalTB() {setIsOpenTB(true)}

    const list = myFiles?.map(file => (
        // TODO add option to change this folder
        listUpdated.push("employer-logos/"+file.updated),
        <div key={file.path}><span className='text-sm'>{`employer-logos/${file.updated},`}</span><br/></div>
    ))

    const component = `[trilogy_landing_core_section section_id="" template_style="trilogy_landing_core_section--stack" bg_section_style="light" section_settings="" section_paddings="regular" section_margins="regular" section_titles_align="default" col_classes_title="col-xs-12" col_classes_content="col-xs-12" title="T3VyJTIwQm9vdCUyMENhbXAlMjBMZWFybmVycyUyMEFyZSUyMCUzQ3NwYW4lMjBjbGFzcyUzRCUyMnRleHQtbm93cmFwJTIyJTNFaW4lMjBEZW1hbmQlM0MlMkZzcGFuJTNF" sub_title="" hr_position="none" title_tag="span" subtitle_tag="span" content_raw="T3VyJTIwZW1wbG95ZXItY29tcGV0aXRpdmUlMjBsZWFybmVycyUyMGhhdmUlMjByZWNlaXZlZCUyMGpvYiUyMG9mZmVycyUyMGZyb20lMjB0aG91c2FuZHMlMjBvZiUyMGdsb2JhbCUyMG9yZ2FuaXphdGlvbnMuJTIwQXMlMjB5b3UlMjB0YWtlJTIwdGhlJTIwbmV4dCUyMHN0ZXBzJTIwaW4lMjB5b3VyJTIwY2FyZWVyJTJDJTIweW91JUUyJTgwJTk5bGwlMjBoYXZlJTIwZXhjbHVzaXZlJTIwYWNjZXNzJTIwdG8lMjBqb2IlMjByZWZlcnJhbHMlMjBmcm9tJTIwJTNDc3Ryb25nJTNFb3VyJTIwbmV0d29yayUyMG9mJTIwJTNDc3BhbiUyMGNsYXNzJTNEJTIydGV4dC1ub3dyYXAlMjIlM0UyNTAlMkIlMjBwYXJ0bmVycyUzQyUyRnNwYW4lM0UlM0MlMkZzdHJvbmclM0Uu" section_settings_inner_bg="light"][trilogy_landing_carousel_logos template_style="trilogy_landing_carousel_logos--v1" logos_autocomplete="${listUpdated}"][/trilogy_landing_core_section]`

    return (
        <div className='w-full fixed top-20 z-0'>
            <div className='max-w-6xl flex flex-col mx-auto my-0'>
                <div className='w-52 h-[28rem] rounded-lg shadow-3xl bg-white ml-auto'>
                    <div className="border-b border-[#e7eaed] text-center">
                        <p className="block text-md bg-[#f5f8fa] text-[#77808C] font-medium rounded-t-lg py-3 border-b">Select renaming pattern</p>
                        <div className='flex items-baseline pt-4'>
                            <label htmlFor="pattern" className="block text-sm text-[#77808C] text-left pl-5 py-4">Pattern</label>
                            <input
                                ref={pattern}
                                type="text"
                                name="pattern"
                                id="pattern"
                                placeholder='_color'
                                autoComplete="pattern"
                                className="
                                    pl-4
                                    bg-[#f5f8fa]
                                    mb-6
                                    mx-4
                                    focus:ring-indigo-500 
                                    focus:border-indigo-500 
                                    w-2/4
                                    h-8 
                                    text-sm border 
                                    border-[#e7eaed]
                                    placeholder-slate-400
                                    rounded
                                    focus:outline-none focus:border-[#4843D9] focus:ring-1 focus:ring-[#4843D9]
                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                    invalid:border-pink-500 invalid:text-pink-600
                                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                    focus:bg-white
                                "
                            />
                        </div>
                        {/* <button className={btnClass} onClick={renameAll}>RENAME ALL</button>  */}
                    </div>
                    <div className="pt-6 pb-3 text-center">
                        <button className={btnClass} onClick={removeAll}>Delete all</button>
                    </div>
                    <div className="border-b border-[#e7eaed] pt-3 pb-6 text-center">
                        <button disabled={btnEnable} className={btnClass} onClick={downloadAll}>Download All</button>
                    </div>
                    <div className="pt-6 pb-3 text-center">
                        <button disabled={btnEnable} className={`${btnClass} disabled:text-[#77808C] disabled:border-[#77808C] border-2 border-pink-600 bg-white text-pink-600`} onClick={openModal}>Download List</button>
                    </div>
                    <div className="pt-3 pb-6 text-center">
                        <button disabled={btnEnable} className={`${btnClass} disabled:text-[#77808C] disabled:border-[#77808C] border-2 border-pink-600 bg-white text-pink-600`} onClick={openModalTB}>Get  textblock</button>
                    </div>
                </div>
            </div>
            {/* MODAL List*/}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-8/12 max-w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-[#77808C] pb-2"
                        >
                            Employer Logos List <span className='text-[#4843D9] text-sm'>{`(${listUpdated.length} logos)`}</span>
                        </Dialog.Title>
                        <div className="mt-2 border-2 border-gray-300 rounded-lg p-4">
                            {list}
                        </div>

                        <div className="mt-4 text-right">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border-2 border-[#4843D9] bg-[#4843D9] px-4 py-2 text-sm font-medium text-white hover:bg-white hover:border-2 hover:text-[#4843D9] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                            >
                            COPY
                            </button>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
            {/* MODAL TextBlock*/}
            <Transition appear show={isOpenTB} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={closeModalTB}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-8/12 max-w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-[#77808C] pb-2"
                        >
                            Employer Logos Component
                        </Dialog.Title>
                        <div className="mt-2 border-2 border-gray-300 rounded-lg p-4 break-all">
                            {component}
                        </div>

                        <div className="mt-4 text-right">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border-2 border-[#4843D9] bg-[#4843D9] px-4 py-2 text-sm font-medium text-white hover:bg-white hover:border-2 hover:text-[#4843D9] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModalTB}
                            >
                            COPY
                            </button>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </div>
    )
}
