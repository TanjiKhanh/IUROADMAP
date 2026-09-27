import { RoutePaths } from './routes';
import { FeaturePms } from './featurePms';
import { MenuIconsWeb } from './iconsWeb';
import { MenuIconsMobile } from './iconsMobile';
import { Translations } from '../i18n/translation';

export interface IURoadmapMenuItem {
  roles: readonly string[] | string[];
  path: string;
  pathMobile: string;
  title: string;
  iconWeb: string;
  iconMobile: string;
  isPro?: boolean;
  ignorePms?: boolean;
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

const displayInNavigation = {
  isDisplayVerticalNav: true,
  isDisplayVerticalNavMobile: false,
};

export const navigation: IURoadmapMenu[] = [
  {
    key: 'root-menu',
    groupName: Translations.navigation.root,
    iconWeb: MenuIconsWeb.layoutDashboard,
    iconMobile: MenuIconsMobile.DASHBOARD,
    active: true,
    activeMobile: true,
    items: [
      {
        ...displayInNavigation,
        roles: FeaturePms.dashboard.view,
        path: RoutePaths.web.dashboard.root,
        pathMobile: RoutePaths.mobile.dashboard.root,
        title: Translations.sidebar.dashboard,
        iconWeb: MenuIconsWeb.layoutDashboard,
        iconMobile: MenuIconsMobile.DASHBOARD,
      },
    ],
  },
  {
    key: 'roadmap-menu',
    groupName: Translations.navigation.roadmap,
    iconWeb: MenuIconsWeb.map,
    iconMobile: MenuIconsMobile.MAP,
    active: true,
    activeMobile: true,
    items: [
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.view,
        path: RoutePaths.web.roadmap.explore,
        pathMobile: RoutePaths.mobile.roadmap.explore,
        title: Translations.sidebar.exploreMajors,
        iconWeb: MenuIconsWeb.graduationCap,
        iconMobile: MenuIconsMobile.GRADUATION,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.view,
        path: RoutePaths.web.roadmap.myCourses,
        pathMobile: RoutePaths.mobile.roadmap.myCourses,
        title: Translations.sidebar.myRoadmaps,
        iconWeb: MenuIconsWeb.map,
        iconMobile: MenuIconsMobile.MAP,
      },
    ],
  },
  {
    key: 'mentorship-menu',
    groupName: Translations.navigation.mentorship,
    iconWeb: MenuIconsWeb.users,
    iconMobile: MenuIconsMobile.USERS,
    active: true,
    activeMobile: true,
    items: [
      // {
      //   ...displayInNavigation,
      //   roles: FeaturePms.community.view,
      //   path: RoutePaths.web.dashboard?.findMentors || '/find-mentors',
      //   pathMobile: RoutePaths.mobile.dashboard?.findMentors || 'FindMentors',
      //   title: Translations.sidebar.findMentors,
      //   iconWeb: MenuIconsWeb.users,
      //   iconMobile: MenuIconsMobile.USERS,
      // },
      {
        ...displayInNavigation,
        roles: FeaturePms.community.chat,
        path: '/dashboard/chat-mentors',
        pathMobile: 'DashboardChatMentors',
        title: Translations.sidebar.chatWithMentors,
        iconWeb: MenuIconsWeb.messageCircle,
        iconMobile: MenuIconsMobile.MESSAGE,
        isPro: true,
      },
    ],
  },
  {
    key: 'config-menu',
    groupName: Translations.navigation.config,
    iconWeb: MenuIconsWeb.folder,
    iconMobile: MenuIconsMobile.FOLDER,
    active: true,
    activeMobile: true,
    items: [
      {
        ...displayInNavigation,
        roles: FeaturePms.system.userAdmin,
        path: RoutePaths.web.config.user.root,
        pathMobile: RoutePaths.mobile.config.user.root,
        title: Translations.sidebar.users,
        iconWeb: MenuIconsWeb.users,
        iconMobile: MenuIconsMobile.USERS,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.system.roleAdmin,
        path: RoutePaths.web.config.role.root,
        pathMobile: RoutePaths.mobile.config.role.root,
        title: Translations.sidebar.roles,
        iconWeb: MenuIconsWeb.users,
        iconMobile: MenuIconsMobile.USERS,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.system.admin,
        path: RoutePaths.web.config.department.root,
        pathMobile: RoutePaths.mobile.config.department.root,
        title: Translations.sidebar.departments,
        iconWeb: MenuIconsWeb.folder,
        iconMobile: MenuIconsMobile.FOLDER,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.manage,
        path: RoutePaths.web.config.major.root,
        pathMobile: RoutePaths.mobile.config.major.root,
        title: Translations.sidebar.major,
        iconWeb: MenuIconsWeb.map,
        iconMobile: MenuIconsMobile.MAP,
      },
    ],
  },
];

export const appMenuConfig = navigation;
