import {
    CalendarIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    Cog6ToothIcon,
  } from '@heroicons/react/24/outline'


  const navigation = [
    { name: 'Clients', href: '/dashboard/clients', icon: HomeIcon },
    { name: 'Appointments', href: '/dashboard/appointments', icon: UsersIcon },
    { name: 'Billings', href: '/dashboard/billings', icon: FolderIcon},
    { name: 'Analytics', href: '/dashboard/analytics', icon: CalendarIcon},
];
  const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H' },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T' },
    { id: 3, name: 'Workcation', href: '#', initial: 'W'},
  ]

  const settings={
    name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon 
  }
  export { navigation, teams, settings };