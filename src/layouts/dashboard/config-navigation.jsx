import { FaBox, FaShapes } from 'react-icons/fa6';
import { PiListMagnifyingGlassBold } from 'react-icons/pi';
import { MdShelves, MdStorage, MdAdminPanelSettings } from 'react-icons/md';

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
  {
    title: 'manage user',
    path: '/manage-user',
    icon: <MdAdminPanelSettings />,
  },
];

export default navConfig;
