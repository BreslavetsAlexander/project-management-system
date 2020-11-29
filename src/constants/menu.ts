import { HomeOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
import { ROUTES } from './routes';

export const MENU = [
  {
    title: 'Home',
    to: ROUTES.HOME,
    icon: HomeOutlined,
  },
  {
    title: 'Projects',
    to: ROUTES.PROJECTS.LIST,
    icon: TableOutlined,
  },
  {
    title: 'Profile',
    to: ROUTES.PROFILE,
    icon: UserOutlined,
  },
];
