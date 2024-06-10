import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import classNames from '../../layout/dashboardComps/helper';

const notesLists = [
  { id: 1, title: 'Progress Notes', description: 'These are general notes which can be taken during appointments with the clients. These notes are visible to all other clinicians in the organization', users: '621 users', url: 'progress' },
  { id: 2, title: 'Clinician Notes', description: 'These are notes which maintain Clinician Patient confidentiality. They are not visible to anyone except the note taker.', users: '1200 users', url: 'clinician' },
  { id: 3, title: 'Diagnosis and Treatment', description: 'Last message sent 4 days ago', users: '2740 users', url: 'dnt' },
];

export default function ClientNotes() {
  const [selectedNotesList, setSelectedNotesList] = useState(notesLists[0]);
  const data = useLoaderData();
  const navigate = useNavigate();
  const { clientId } = useParams();

  useEffect(() => {
    navigate(`/dashboard/clients/${clientId}/notes/${selectedNotesList.url}`);
  }, [selectedNotesList, navigate, clientId]);

  return (
    <fieldset>
      <RadioGroup
        value={selectedNotesList}
        onChange={setSelectedNotesList}
        className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4"
      >
        {notesLists.map((notesList) => (
          <Radio
            key={notesList.id}
            value={notesList}
            aria-label={notesList.title}
            aria-description={`${notesList.description} to ${notesList.users}`}
            className={({ focus }) =>
              classNames(
                focus ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                !focus ? 'border-gray-300' : '',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
              )
            }
          >
            {({ checked, focus }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <span className="block text-sm font-medium text-gray-900">{notesList.title}</span>
                    <span className="mt-1 flex items-center text-sm text-gray-500">{notesList.description}</span>
                    <span className="mt-6 text-sm font-medium text-gray-900">{notesList.users}</span>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-indigo-600')}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    checked ? 'border-indigo-600' : 'border-transparent',
                    focus ? 'border' : 'border-2',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
