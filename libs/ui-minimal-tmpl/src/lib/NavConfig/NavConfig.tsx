import PieChartIcon from '@mui/icons-material/PieChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';

// component
import { NavMenuItem } from '../NavSection';

// ----------------------------------------------------------------------

export const navConfig: NavMenuItem[] = [
  {
    title: 'Painel',
    path: '/',
    icon: <PieChartIcon />,
  },
  {
    title: 'Calendário',
    path: '/calendar',
    icon: <CalendarMonthIcon />,
  },
  {
    title: 'Configurações',
    path: '#',
    icon: <SettingsIcon />,
    // info: "Configurações do sistema",
    // children: [
    //   {
    //     title: 'despesas',
    //     path: '/app/costs',
    //     icon: getIcon('entypo:wallet'),
    //   },
    //   {
    //     title: 'serviços & metas',
    //     path: '/app/services',
    //     icon: getIcon('clarity:target-solid'),
    //   },
    // ],
  },
];

export default navConfig;
