import { Fragment, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { addNewClient } from '../../apis/ClientAPIs';


const AddNewClient = ({isOpen, setIsOpen}) => {
    const [formData, setFormData] = useState({
        client_type: 'Adult',
        billing_type: 'Insurance',
        contact: {
            legal_first_name: '',
            legal_last_name: '',
            relationship: 'Child',
            client_portal_access: true,
            client: '',
            contactphone_set: [
                {
                    phone_number: '',
                    type: 'Home',
                    voice: true,
                    text: true,
                    contact: ''
                }
            ],
            contactemail_set: [
                {
                    email: '',
                    type: 'Home',
                    permission: true,
                    contact: ''
                }
            ]
        },
        uuid: ''
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
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80" />
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
                                                <div className="block items-start justify-around space-y-1">
                                                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                                                        Add New Client
                                                    </DialogTitle>
                                                    <p className="text-sm text-gray-500">
                                                        Fill in the details below to add a new client.
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-end">
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
                                                    <label htmlFor="legal_first_name" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        First Name
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="text"
                                                        name="legal_first_name"
                                                        id="legal_first_name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.contact.legal_first_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="legal_last_name" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Last Name
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="text"
                                                        name="legal_last_name"
                                                        id="legal_last_name"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.contact.legal_last_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="email" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Email
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.contact.contactemail_set.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="phone_number" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Phone Number
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="tel"
                                                        name="phone_number"
                                                        id="phone_number"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.contact.contactphone_set.phone_number}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="client_type" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Client Type
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <select
                                                        name="client_type"
                                                        id="client_type"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        value={formData.client_type}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="Adult">Adult</option>
                                                        <option value="Minor">Minor</option>
                                                        <option value="Couple">Couple</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="billing_type" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Billing Type
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <select
                                                        name="billing_type"
                                                        id="billing_type"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        value={formData.billing_type}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="Insurance">Insurance</option>
                                                        <option value="Self Pay">Self Pay</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="relationship" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Relationship
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="text"
                                                        name="relationship"
                                                        id="relationship"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        value={formData.contact.relationship}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                                                <div>
                                                    <label htmlFor="client_portal_access" className='block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5'>
                                                        Client Portal Access
                                                    </label>
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <input 
                                                        type="checkbox"
                                                        name="client_portal_access"
                                                        id="client_portal_access"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        checked={formData.contact.client_portal_access}
                                                        onChange={(e) => setFormData({ ...formData, client_portal_access: e.target.checked })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 sm:px-6">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                            >
                                                Save
                                            </button>
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