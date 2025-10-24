import { nanoid } from "nanoid";
import {
  FaBook,
  FaCode,
  FaCreditCard,
  FaBriefcase,
  FaUserTie,
  FaShoppingCart,
  FaLightbulb,
  FaRocket,
  FaHeadset,
  FaGraduationCap,
  FaCloud,
  FaMobile,
  FaDatabase,
  FaChartLine,
  FaCogs,
  FaUsers,
  FaFileAlt,
  FaVideo,
  FaNewspaper,
  FaGlobe,
} from "react-icons/fa";

const sublinks = [
  {
    pageId: nanoid(),
    page: "products",
    links: [
      {
        id: nanoid(),
        label: "content management",
        icon: <FaFileAlt />,
        url: "/products/content-management",
      },
      {
        id: nanoid(),
        label: "digital assets",
        icon: <FaCloud />,
        url: "/products/digital-assets",
      },
      {
        id: nanoid(),
        label: "authentication",
        icon: <FaUsers />,
        url: "/products/authentication",
      },
      {
        id: nanoid(),
        label: "API builder",
        icon: <FaCode />,
        url: "/products/api-builder",
      },
      {
        id: nanoid(),
        label: "webhooks",
        icon: <FaCogs />,
        url: "/products/webhooks",
      },
      {
        id: nanoid(),
        label: "analytics",
        icon: <FaChartLine />,
        url: "/products/analytics",
      },
    ],
  },
  {
    pageId: nanoid(),
    page: "solutions",
    links: [
      {
        id: nanoid(),
        label: "developers",
        icon: <FaCode />,
        url: "/solutions/developers",
      },
      {
        id: nanoid(),
        label: "content managers",
        icon: <FaUserTie />,
        url: "/solutions/content-managers",
      },
      {
        id: nanoid(),
        label: "business teams",
        icon: <FaBriefcase />,
        url: "/solutions/business-teams",
      },
      {
        id: nanoid(),
        label: "ecommerce",
        icon: <FaShoppingCart />,
        url: "/solutions/ecommerce",
      },
      {
        id: nanoid(),
        label: "mobile apps",
        icon: <FaMobile />,
        url: "/solutions/mobile-apps",
      },
      {
        id: nanoid(),
        label: "enterprise",
        icon: <FaDatabase />,
        url: "/solutions/enterprise",
      },
    ],
  },
  {
    page: "resources",
    pageId: nanoid(),
    links: [
      {
        id: nanoid(),
        label: "documentation",
        icon: <FaBook />,
        url: "/resources/documentation",
      },
      {
        id: nanoid(),
        label: "tutorials",
        icon: <FaGraduationCap />,
        url: "/resources/tutorials",
      },
      {
        id: nanoid(),
        label: "blog",
        icon: <FaNewspaper />,
        url: "/resources/blog",
      },
      {
        id: nanoid(),
        label: "webinars",
        icon: <FaVideo />,
        url: "/resources/webinars",
      },
    ],
  },
  {
    page: "company",
    pageId: nanoid(),
    links: [
      {
        id: nanoid(),
        label: "about us",
        icon: <FaGlobe />,
        url: "/company/about",
      },
      {
        id: nanoid(),
        label: "careers",
        icon: <FaRocket />,
        url: "/company/careers",
      },
      {
        id: nanoid(),
        label: "support",
        icon: <FaHeadset />,
        url: "/company/support",
      },
      {
        id: nanoid(),
        label: "partners",
        icon: <FaLightbulb />,
        url: "/company/partners",
      },
    ],
  },
  {
    page: "pricing",
    pageId: nanoid(),
    links: [
      {
        id: nanoid(),
        label: "plans",
        icon: <FaCreditCard />,
        url: "/pricing/plans",
      },
      {
        id: nanoid(),
        label: "enterprise",
        icon: <FaBriefcase />,
        url: "/pricing/enterprise",
      },
    ],
  },
];

// Sidebar navigation data
export const sidebarLinks = [
  {
    id: nanoid(),
    page: "products",
    url: "/products",
  },
  {
    id: nanoid(),
    page: "solutions",
    url: "/solutions",
  },
  {
    id: nanoid(),
    page: "resources",
    url: "/resources",
  },
  {
    id: nanoid(),
    page: "company",
    url: "/company",
  },
  {
    id: nanoid(),
    page: "pricing",
    url: "/pricing",
  },
  {
    id: nanoid(),
    page: "documentation",
    url: "/docs",
  },
  {
    id: nanoid(),
    page: "sign in",
    url: "/signin",
  },
];

// Widget/Feature cards data for submenu
export const submenuWidgets = {
  products: {
    featured: {
      title: "New: Content API v2",
      description: "Experience faster queries and better performance",
      url: "/products/content-api-v2",
      icon: <FaRocket />,
    },
    cta: {
      title: "Explore all products",
      url: "/products/all",
    },
  },
  solutions: {
    featured: {
      title: "Case Study: Enterprise Success",
      description: "How Fortune 500 companies scale with Strapi",
      url: "/solutions/case-studies",
      icon: <FaChartLine />,
    },
    cta: {
      title: "View all solutions",
      url: "/solutions/all",
    },
  },
  resources: {
    featured: {
      title: "Getting Started Guide",
      description: "Learn the basics in 10 minutes",
      url: "/resources/getting-started",
      icon: <FaGraduationCap />,
    },
    cta: {
      title: "Browse all resources",
      url: "/resources/all",
    },
  },
  company: {
    featured: {
      title: "We're Hiring!",
      description: "Join our global team of innovators",
      url: "/company/careers",
      icon: <FaUsers />,
    },
    cta: {
      title: "Learn more about us",
      url: "/company/about",
    },
  },
};

export default sublinks;
