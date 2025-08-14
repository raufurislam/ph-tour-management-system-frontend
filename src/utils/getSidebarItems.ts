import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/AdminSidebarItems";
import { userSidebarItems } from "@/routes/UserSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  console.log(userRole);
  //   console.log(role.superAdmin);
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};
