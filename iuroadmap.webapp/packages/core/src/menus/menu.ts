import { RoutePaths } from '../constants/routes';
import { FeaturePms } from '../constants/featurePms';
import { MenuIconsWeb } from '../constants/iconsWeb';
import { MenuIconsMobile } from '../constants/iconsMobile';
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

export const navigation: IURoadmapMenu[] = [
  {
    activeMobile: true,
    active: true,
    iconWeb: MenuIconsWeb.layoutDashboard,
    iconMobile: MenuIconsMobile.DASHBOARD,
    key: 'dashboard-menu',
    groupName: Translations.navigation.overview,
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
    groupName: Translations.navigation.features,
    items: [
      {
        roles: FeaturePms.roadmap.view,
        permissions: FeaturePms.roadmap.permissions.view,
        path: '',
        pathMobile: '',
        title: Translations.sidebar.roadmap,
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
            title: Translations.sidebar.exploreMajors,
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
            title: Translations.sidebar.myRoadmaps,
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
            title: Translations.sidebar.manageRoadmaps,
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
        title: Translations.sidebar.courses,
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
            title: Translations.sidebar.manageCourses,
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
        title: Translations.sidebar.mentorship,
        iconWeb: MenuIconsWeb.users,
        iconMobile: MenuIconsMobile.USERS,
        isDisplayVerticalNav: true,
        isDisplayVerticalNavMobile: false,
        children: [
          {
            roles: FeaturePms.community.view,
            path: RoutePaths.web.dashboard.findMentors,
            pathMobile: RoutePaths.mobile.dashboard.findMentors,
            title: Translations.sidebar.findMentors,
            iconWeb: MenuIconsWeb.users,
            iconMobile: MenuIconsMobile.USERS,
            isDisplayVerticalNav: true,
            isDisplayVerticalNavMobile: false,
          },
          {
            roles: FeaturePms.community.chat,
            path: '/dashboard/chat-mentors',
            pathMobile: 'DashboardChatMentors',
            title: Translations.sidebar.chatWithMentors,
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
            title: Translations.sidebar.mentorHub,
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
    groupName: Translations.navigation.administration,
    items: [
      {
        roles: FeaturePms.system.admin,
        permissions: FeaturePms.system.permissions.admin,
        path: RoutePaths.web.admin.departments,
        pathMobile: RoutePaths.mobile.admin.departments,
        title: Translations.sidebar.departments,
        iconWeb: MenuIconsWeb.folder,
        iconMobile: MenuIconsMobile.FOLDER,
        isDisplayVerticalNav: true,
        isDisplayVerticalNavMobile: false,
      },
    ],
  },
];

export const appMenuConfig = navigation;

