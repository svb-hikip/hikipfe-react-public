import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { addNewClient } from '../../apis/ClientAPIs';


const AddNewClient = ({isOpen, setIsOpen}) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        alternatenumber: '',
        description: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addNewClient(formData);
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to add client: ', error);
        }
    }
    return (
        <Transition show={isOpen} as={Fragment} >
            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)} >
                <TransitionChild 
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <TransitionChild
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration:700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                                    <form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl" onSubmit={handleSubmit}>
                                        <div className='flex-1'>
                                            <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                                <div className="block items-start justify-around space-y-2">
                                                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                                                        Add New Client
                                                    </DialogTitle>
                                                    <p className="text-sm text-gray-500">
                                                        Fill in the details below to add a new client.
                                                    </p>
                                                </div>
                                                <div className="flex h-5 items-center justify-end">
                                                    <button type="button"
                                                            className="relative text-gray-400 hover:text-gray-500"
                                                            onClick={() => setIsOpen(false)}
                                                    >
                                                        <span className="relative justify-end" />
                                                        <span className="sr-only">Close Panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="client-firstname" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        FirstName
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="text"
                                                        name="client-firstname"
                                                        id="client-firstname"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.firstname}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="client-lastname" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        LastName
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="text"
                                                        name="client-lastname"
                                                        id="client-lastname"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.lastname}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="client-email" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Email
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="email"
                                                        name="client-email"
                                                        id="client-email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="client-number" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Phone Number
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="tel"
                                                        name="client-number"
                                                        id="client-number"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.phonenumber}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="client-alt-number" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Alternate Number
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="tel"
                                                        name="client-alt-number"
                                                        id="client-alt-number"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.alternatenumber}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="client-description" className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                                                    Description
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <textarea
                                                    id="client-description"
                                                    name="client-description"
                                                    rows={3}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                                                <div className="flex justify-end space-x-3">
                                                    <button
                                                        type="button"
                                                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                    Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                    >
                                                    Add Client
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddNewClient;