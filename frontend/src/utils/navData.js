import {
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  CalendarMonthOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";

export const navItems = [
  {
    text: "Панель",
    icon: <HomeOutlined />,
    url: "dashboard",
  },
  {
    text: "Редагування",
    icon: null,
  },
  {
    text: "Закази на будинки",
    icon: <ShoppingCartOutlined />,
    url: "orders",
  },
  {
    text: "Запроси на проектування",
    icon: <Groups2Outlined />,
    url: "requests",
  },
  {
    text: "Будинки",
    icon: <MapsHomeWorkIcon />,
    url: "houses",
  },
  {
    text: "Статистика",
    icon: null,
  },
  {
    text: "Щомісячна статистика",
    icon: <CalendarMonthOutlined />,
    url: "monthly",
  },
  {
    text: "Розподіл",
    icon: <PieChartOutlined />,
    url: "breakdown",
  },
];
