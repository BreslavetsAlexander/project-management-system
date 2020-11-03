import { HomeOutlined, TableOutlined } from '@ant-design/icons';
import { ROUTES } from './routes';

export const MENU = [
  {
    title: 'Home',
    to: ROUTES.HOME,
    icon: HomeOutlined,
  },
  {
    title: 'Board',
    to: ROUTES.BOARD,
    icon: TableOutlined,
  },
];
