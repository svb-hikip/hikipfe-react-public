import { useLoaderData } from 'react-router-dom';
import { Fragment, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import { BellIcon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIconMini, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function BillingDetail() {
  const { data: {
    uuid,
    number,
    date,
    client: {
      client_type,
      billing_type,
      contact: {
        contactphone_set,
        contactemail_set,
        legal_first_name,
        legal_last_name,
        relationship,
        client_portal_access,
      }
    },
    appointment: {
      client_name,
      billing_type: appointment_billing_type,
      client_type: appointment_client_type,
      all_day,
      start_datetime,
      duration,
      clinician_name,
      location_name,
      services_name,
      items_name,
    },
    line_items,
    payments,
    aggregate_pre_tax_value,
    aggregate_tax_value,
    aggregate_payment_value,
  } } = useLoaderData();

  const [selected, setSelected] = useState(moods[5])
  return (
    <div>
          {/* {JSON.stringify(data)} */}
          <p>UUID: {uuid}</p>
      <p>Number: {number}</p>
      <p>Date: {date}</p>
    </div>
  )
}
