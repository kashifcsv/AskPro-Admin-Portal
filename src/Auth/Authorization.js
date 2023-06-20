/* eslint-disable */
// eslint-disable-next-line no-unused-expressions

import { useAuthUser } from "react-auth-kit";

export const IsAuthorized = (moduleName) => {
  const authUser = useAuthUser();
  let permissions = [];

  authUser().role.map((item) => {
    if (item.role === "Company_Admin") {
      let permission = {
        create: true,
        update: true,
        delete: true,
        view: true,
        active: true,
        inActive: true,
      };
      permissions = permission;
    } else {
      if (item.module_name === moduleName) {
        permissions = item.permissions[0];
      }
    }
  });

  return permissions;
};
