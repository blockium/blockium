// component
import Iconify from "../../components/Iconify";
import { NavMenuItem } from "../../components/NavSection";

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <Iconify icon={name} width={22} height={22} />
);

const navConfig: NavMenuItem[] = [
  {
    title: "painel",
    path: "/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  // {
  //   title: "painel2",
  //   path: "/app/dashboard-minimalui",
  //   icon: getIcon("eva:pie-chart-2-fill"),
  // },
  {
    title: "agenda",
    path: "/app/calendar",
    icon: getIcon("akar-icons:calendar"),
  },
  {
    // title: "atendimentos",
    title: "faturamento",
    path: "/app/customerServices",
    // icon: getIcon("fa-solid:hand-holding-heart"),
    icon: getIcon("bi:credit-card-2-back-fill"),
  },
  {
    title: "clientes",
    path: "/app/customers",
    icon: getIcon("bi:people-fill"),
  },
  {
    title: "gestão",
    path: "#",
    icon: getIcon("ant-design:setting-filled"),
    // info: "test",
    children: [
      {
        title: "despesas",
        path: "/app/costs",
        icon: getIcon("entypo:wallet"),
      },
      {
        title: "serviços & metas",
        path: "/app/services",
        icon: getIcon("clarity:target-solid"),
      },
      {
        title: "formas de pagamento",
        path: "/app/payTypes",
        icon: getIcon("bi:credit-card-2-back-fill"),
      },
      {
        title: "locais",
        path: "/app/places",
        icon: getIcon("ic:baseline-place"),
      },
      {
        title: "parceiros",
        path: "/app/partners",
        icon: getIcon("dashicons:businessperson"),
      },
    ],
  },
  // {
  //   title: "login",
  //   path: "/auth/login",
  //   icon: getIcon("eva:lock-fill"),
  // },
  // {
  //   title: "register",
  //   path: "/auth/signup",
  //   icon: getIcon("eva:person-add-fill"),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: getIcon("eva:alert-triangle-fill"),
  // },
];

export default navConfig;
