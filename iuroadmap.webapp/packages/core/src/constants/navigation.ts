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
        path: RoutePaths.web.roadmap.exploreRoadmaps,
        pathMobile: RoutePaths.mobile.roadmap.exploreRoadmaps,
        title: Translations.sidebar.exploreRoadmaps,
        iconWeb: MenuIconsWeb.graduationCap,
        iconMobile: MenuIconsMobile.GRADUATION,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.view,
        path: RoutePaths.web.roadmap.exploreCourses,
        pathMobile: RoutePaths.mobile.roadmap.exploreCourses,
        title: Translations.sidebar.exploreCourses,
        iconWeb: MenuIconsWeb.compass,
        iconMobile: MenuIconsMobile.COMPASS,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.view,
        path: RoutePaths.web.roadmap.myRoadmaps,
        pathMobile: RoutePaths.mobile.roadmap.myRoadmaps,
        title: Translations.sidebar.myRoadmaps,
        iconWeb: MenuIconsWeb.route,
        iconMobile: MenuIconsMobile.ROUTE,
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
        roles: FeaturePms.roadmap.manage,
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
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.manage,
        path: RoutePaths.web.config.course.root,
        pathMobile: RoutePaths.mobile.config.course.root,
        title: Translations.sidebar.catalogCourses,
        iconWeb: MenuIconsWeb.library,
        iconMobile: MenuIconsMobile.LIBRARY,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.manage,
        path: RoutePaths.web.config.courseCategory.root,
        pathMobile: RoutePaths.mobile.config.courseCategory.root,
        title: Translations.sidebar.courseCategories,
        iconWeb: MenuIconsWeb.palette,
        iconMobile: MenuIconsMobile.PALETTE,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.manage,
        path: RoutePaths.web.config.lecturer.root,
        pathMobile: RoutePaths.mobile.config.lecturer.root,
        title: Translations.sidebar.lecturers,
        iconWeb: MenuIconsWeb.presentation,
        iconMobile: MenuIconsMobile.TEACHER,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.manage,
        path: RoutePaths.web.config.courseOffering.root,
        pathMobile: RoutePaths.mobile.config.courseOffering.root,
        title: Translations.sidebar.courseOfferings,
        iconWeb: MenuIconsWeb.calendarRange,
        iconMobile: MenuIconsMobile.CALENDAR,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.manage,
        path: RoutePaths.web.config.grading,
        pathMobile: RoutePaths.mobile.config.grading,
        title: Translations.sidebar.grading,
        iconWeb: MenuIconsWeb.award,
        iconMobile: MenuIconsMobile.AWARD,
      },
      {
        ...displayInNavigation,
        roles: FeaturePms.roadmap.manage,
        path: RoutePaths.web.config.commentModeration,
        pathMobile: RoutePaths.mobile.config.commentModeration,
        title: Translations.sidebar.commentModeration,
        iconWeb: MenuIconsWeb.shieldCheck,
        iconMobile: MenuIconsMobile.SHIELD,
      },
    ],
  },
];

export const appMenuConfig = navigation;
