import { FaBox, FaShapes } from 'react-icons/fa6';
import { MdShelves, MdStorage } from 'react-icons/md';
import { PiListMagnifyingGlassBold } from 'react-icons/pi';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <FaShapes />,
  },
  {
    title: 'product',
    path: '/products',
    icon: <FaBox />,
  },
  {
    title: 'racks',
    path: '/racks',
    icon: <MdShelves />,
  },
  {
    title: 'retained samples',
    path: '/retained-samples',
    icon: <MdStorage />,
  },
  {
    title: 'referenced samples',
    path: '/referenced-samples',
    icon: <MdStorage />,
  },
  {
    title: 'audit trail',
    path: '/audit-trail',
    icon: <PiListMagnifyingGlassBold />,
  },
];

export default navConfig;
