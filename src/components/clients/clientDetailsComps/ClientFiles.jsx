import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';

const ClientFiles = () => {
    const [files, setFiles] = useState([
        { id: 1, name: 'file1.txt' },
        { id: 2, name: 'file2.txt' },
        { id: 3, name: 'file3.txt' },
    ]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFiles([...files, { id: Date.now(), name: file.name }]);
        }
    };

    const deleteFile = (id) => {
        setFiles(files.filter(file => file.id !== id));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Client File List</h2>
            <ul className="divide-y divide-gray-200">
                {files.map(file => (
                    <li key={file.id} className="flex items-center justify-between py-2">
                        <span className="text-gray-900">{file.name}</span>
                        <button
                            onClick={() => deleteFile(file.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-6 border border-dashed border-gray-300 p-6 flex items-center justify-center">
                <div className="text-center">
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer block mb-2 text-indigo-600 font-semibold"
                    >
                        <svg
                            className="w-12 h-12 text-gray-400 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <span className="block">Upload a file</span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                        />
                    </label>
                    <p className="text-sm text-gray-600">or drag and drop</p>
                </div>
            </div>
        </div>
    );
};

export default ClientFiles;
