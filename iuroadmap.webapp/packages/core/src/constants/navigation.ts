import { RoutePaths } from './routes';
import { FeaturePms } from './featurePms';
import { MenuIconsWeb } from './iconsWeb';
import { MenuIconsMobile } from './iconsMobile';
import { Translations } from '../i18n/translation';



export interface IURoadmapMenuItem {
  roles: readonly string[] | string[];
  permissions?: readonly string[];
  path: string;
  pathMobile: string;
  title: string;
  iconWeb: string;
  iconMobile: string;
  isPro?: boolean;
  children?: IURoadmapMenuItem[];
  isDisplayVerticalNav?: boolean;
  isDisplayVerticalNavMobile?: boolean;
}

export interface IURoadmapMenu {
  key: string;
  groupName: string;
  items: IURoadmapMenuItem[];
  activeMobile?: boolean;
  iconWeb?: string;
  iconMobile?: string;
  active?: boolean;
  pathMobile?: string;
}

export const navigation: IURoadmapMenu[] = [
  {
    activeMobile: true,
    active: true,
    iconWeb: MenuIconsWeb.layoutDashboard,
    iconMobile: MenuIconsMobile.DASHBOARD,
    key: 'dashboard-menu',
    groupName: 'Overview',
    items: [
      {
        roles: FeaturePms.dashboard.view,
        path: RoutePaths.web.dashboard.root,
        pathMobile: RoutePaths.mobile.dashboard.root,
        title: Translations.sidebar.dashboard,
        iconWeb: MenuIconsWeb.layoutDashboard,
        iconMobile: MenuIconsMobile.DASHBOARD,
        isDisplayVerticalNav: true,
        isDisplayVerticalNavMobile: false,
      }
    ],
  },
  {
    activeMobile: true,
    active: true,
    iconWeb: MenuIconsWeb.map,
    iconMobile: MenuIconsMobile.MAP,
    key: 'features-menu',
    groupName: 'Features',
    items: [
      {
        roles: FeaturePms.roadmap.view,
        permissions: FeaturePms.roadmap.permissions.view,
        path: '',
        pathMobile: '',
        title: 'Roadmap',
        iconWeb: MenuIconsWeb.map,
        iconMobile: MenuIconsMobile.MAP,
        isDisplayVerticalNav: true,
        isDisplayVerticalNavMobile: false,
        children: [
          {
            roles: FeaturePms.roadmap.view,
            permissions: FeaturePms.roadmap.permissions.view,
            path: RoutePaths.web.dashboard.explore,
            pathMobile: RoutePaths.mobile.dashboard.explore,
            title: 'Explore Majors',
            iconWeb: MenuIconsWeb.graduationCap,
            iconMobile: MenuIconsMobile.GRADUATION,
            isDisplayVerticalNav: true,
            isDisplayVerticalNavMobile: false,
          },
          {
            roles: FeaturePms.roadmap.view,
            permissions: FeaturePms.roadmap.permissions.view,
            path: RoutePaths.web.dashboard.myCourses,
            pathMobile: RoutePaths.mobile.dashboard.myCourses,
            title: 'My Roadmaps',
            iconWeb: MenuIconsWeb.map,
            iconMobile: MenuIconsMobile.MAP,
            isDisplayVerticalNav: true,
            isDisplayVerticalNavMobile: false,
          },
          {
            roles: FeaturePms.roadmap.manage,
            permissions: FeaturePms.roadmap.permissions.manage,
            path: RoutePaths.web.admin.roadmaps,
            pathMobile: RoutePaths.mobile.admin.roadmaps,
            title: 'Manage Roadmaps',
            iconWeb: MenuIconsWeb.map,
            iconMobile: MenuIconsMobile.MAP,
            isDisplayVerticalNav: true,
            isDisplayVerticalNavMobile: false,
          },
        ]
      },
      {
        roles: FeaturePms.course.manage,
        permissions: FeaturePms.course.permissions.manage,
        path: '',
        pathMobile: '',
        title: 'Courses',
        iconWeb: MenuIconsWeb.bookOpen,
        iconMobile: MenuIconsMobile.BOOK,
        isDisplayVerticalNav: true,
        isDisplayVerticalNavMobile: false,
        children: [
          {
            roles: FeaturePms.course.manage,
            permissions: FeaturePms.course.permissions.manage,
            path: RoutePaths.web.admin.courses,
            pathMobile: RoutePaths.mobile.admin.courses,
            title: 'Manage Courses',
            iconWeb: MenuIconsWeb.bookOpen,
            iconMobile: MenuIconsMobile.BOOK,
            isDisplayVerticalNav: true,
            isDisplayVerticalNavMobile: false,
          }
        ]
      },
      {
        roles: FeaturePms.community.view,
        path: '',
        pathMobile: '',
        title: 'Community & Mentorship',
        iconWeb: MenuIconsWeb.users,
        iconMobile: MenuIconsMobile.USERS,
        isDisplayVerticalNav: true,
        isDisplayVerticalNavMobile: false,
        children: [
          {
            roles: FeaturePms.community.view,
            path: RoutePaths.web.dashboard.findMentors,
            pathMobile: RoutePaths.mobile.dashboard.findMentors,
            title: 'Find Mentors',
            iconWeb: MenuIconsWeb.users,
            iconMobile: MenuIconsMobile.USERS,
            isDisplayVerticalNav: true,
            isDisplayVerticalNavMobile: false,
          },
          {
            roles: FeaturePms.community.chat,
            path: '/dashboard/chat-mentors',
            pathMobile: 'DashboardChatMentors',
            title: 'Chat with Mentors',
            iconWeb: MenuIconsWeb.messageCircle,
            iconMobile: MenuIconsMobile.MESSAGE,
            isPro: true,
            isDisplayVerticalNav: true,
            isDisplayVerticalNavMobile: false,
          },
          {
            roles: FeaturePms.community.mentor_hub,
            path: RoutePaths.web.mentor.dashboard,
            pathMobile: RoutePaths.mobile.mentor.dashboard,
            title: 'Mentor Hub',
            iconWeb: MenuIconsWeb.panelTop,
            iconMobile: MenuIconsMobile.PANEL,
            isDisplayVerticalNav: true,
            isDisplayVerticalNavMobile: false,
          },
        ]
      },
    ],
  },
  {
    activeMobile: true,
    active: true,
    iconWeb: MenuIconsWeb.folder,
    iconMobile: MenuIconsMobile.FOLDER,
    key: 'system-menu',
    groupName: 'Administration',
    items: [
      {
        roles: FeaturePms.system.admin,
        permissions: FeaturePms.system.permissions.admin,
        path: RoutePaths.web.admin.departments,
        pathMobile: RoutePaths.mobile.admin.departments,
        title: 'Departments',
        iconWeb: MenuIconsWeb.folder,
        iconMobile: MenuIconsMobile.FOLDER,
        isDisplayVerticalNav: true,
        isDisplayVerticalNavMobile: false,
      },
    ],
  },
];

export const appMenuConfig = navigation;

