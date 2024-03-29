// import {
//   HomePage,
//   AboutPage,
//   LoginPage,
//   RootAccount,
//   RootAddAccount,
//   RootEditAccount,
//   AdminProfilePage,
//   RegisterPage,
//   RootViewAccountPermissions,
//   AdminAllMembersPage,
//   AdminAllRoomsPage,
//   PostPage,
//   ContactPage,
//   ErrorPage,
//   UserProfilePage,
//   MyPostPage,
// } from "../pages";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RootAccount = lazy(() => import("../pages/RootAccount"));
const RootAddAccount = lazy(() => import("../pages/RootAddAccount"));
const RootEditAccount = lazy(() => import("../pages/RootEditAccount"));
const AdminProfilePage = lazy(() => import("../pages/AdminProfilePage"));
const AdminManagerBillPage = lazy(() =>
  import("../pages/AdminManagerBillPage")
);
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const RootViewAccountPermissions = lazy(() =>
  import("../pages/RootViewAccountPermissions")
);
const AdminAllMembersPage = lazy(() => import("../pages/AdminAllMembersPage"));
const AdminAllRoomsPage = lazy(() => import("../pages/AdminAllRoomsPage"));
const PostPage = lazy(() => import("../pages/PostPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage"));
const MyPostPage = lazy(() => import("../pages/MyPostPage"));
const PostDetailsPage = lazy(() => import("../pages/PostDetailsPage"));
const ManagerMyMotelPage = lazy(() => import("../pages/ManagerMyMotelPage"));
const ManagerMyBillPage = lazy(() => import("../pages/ManagerMyBillPage"));

const MyFavouritePostPage = lazy(() => import("../pages/MyFavouritePostPage"));
const AnotherProfilePage = lazy(() => import("../pages/AnotherProfilePage"));
const MotelPage = lazy(() => import("../pages/MotelPage"));
const AdminHomePage = lazy(() => import("../pages/AdminHomePage"));
const MotelDetailsPage = lazy(() => import("../pages/MotelDetailsPage"));
const ManagerRentRoomPage = lazy(() => import("../pages/ManagerRentRoomPage"));
const AdminAllRequestsPage = lazy(() =>
  import("../pages/AdminAllRequestsPage")
);

import {
  DefaultLayout,
  RootLayout,
  AdminLayout,
  ManagerRoomLayout,
} from "../components/Layouts";

const router = [
  {
    path: "/",
    isProtected: true,
    layout: "None",
    element: HomePage,
  },
  {
    path: "/post/:_id",
    isProtected: true,
    layout: DefaultLayout,
    element: PostDetailsPage,
  },
  {
    path: "/post",
    isProtected: true,
    layout: DefaultLayout,
    element: PostPage,
  },
  {
    path: "/motel/:id",
    isProtected: true,
    element: MotelDetailsPage,
    layout: DefaultLayout,
  },
  {
    path: "/motel",
    isProtected: true,
    element: MotelPage,
    layout: DefaultLayout,
  },
  {
    path: "/login",
    element: LoginPage,
    isProtected: false,
    layout: "None",
  },
  {
    path: "/register",
    element: RegisterPage,
    isProtected: false,
    layout: "None",
  },
  {
    path: "/root/user/accounts",
    element: RootAccount,
    layout: RootLayout,
    isProtected: true,
  },
  {
    path: "/root/user/accounts/create",
    isProtected: true,
    layout: RootLayout,
    element: RootAddAccount,
  },
  {
    path: "/root/user/account/edit/:id",
    layout: RootLayout,
    element: RootEditAccount,
    isProtected: true,
  },
  {
    path: "/root/permissions",
    layout: RootLayout,
    element: RootViewAccountPermissions,
    isProtected: true,
  },

  // user
  {
    path: "/profile",
    isProtected: true,
    layout: "None",
    element: UserProfilePage,
  },

  {
    path: "/user/:id/feedback",
    isProtected: true,
    layout: DefaultLayout,
    element: ContactPage,
  },
  {
    path: "/user/my-post",
    isProtected: true,
    layout: "None",
    element: MyPostPage,
  },
  {
    path: "/user/manager-my-room",
    isProtected: true,
    layout: ManagerRoomLayout,
    element: ManagerMyMotelPage,
  },
  {
    path: "/user/rent-room",
    isProtected: true,
    layout: ManagerRoomLayout,
    element: ManagerRentRoomPage,
  },
  {
    path: "/user/my-bill",
    isProtected: true,
    layout: ManagerRoomLayout,
    element: ManagerMyBillPage,
  },
  {
    path: "/user/my-favourite-post",
    isProtected: true,
    layout: "None",
    element: MyFavouritePostPage,
  },

  {
    path: "/user/:_id",
    isProtected: true,
    layout: DefaultLayout,
    element: AnotherProfilePage,
  },

  // Admin router [The Van]
  {
    path: "/admin",
    isProtected: true,
    layout: AdminLayout,
    element: AdminHomePage,
  },

  {
    path: "/admin/profile/:id",
    isProtected: true,
    layout: AdminLayout,
    element: AdminProfilePage,
  },
  {
    path: "/admin/:id/all-members",
    isProtected: true,
    layout: AdminLayout,
    element: AdminAllMembersPage,
  },
  {
    path: "/admin/:id/manager-bill",
    isProtected: true,
    layout: AdminLayout,
    element: AdminManagerBillPage,
  },
  {
    path: "/admin/:id/all-rooms",
    isProtected: true,
    layout: AdminLayout,
    element: AdminAllRoomsPage,
  },
  {
    path: "/admin/:id/all-requests",
    isProtected: true,
    layout: AdminLayout,
    element: AdminAllRequestsPage,
  },
  // Error page
  {
    path: "/error/404",
    isProtected: false,
    layout: "none",
    element: ErrorPage,
  },
];

export default router;
