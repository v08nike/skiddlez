import { createSelector } from 'redux-orm';

import orm from '../orm';

export const makeRoleByIdSelector = () =>
  createSelector(
    orm,
    (_, id) => id,
    ({ Role }, id) => {
      // // Redux-orm sometimes squashed the "roleId" property
      // // to an integer when the permissions array is too large
      if (typeof id === "object") {
        return id;
      }

      const roleModel = Role.withId(id);

      if (!roleModel) {
        return roleModel;
      }

      return roleModel.ref;
    },
  );

export const roleByIdSelector = makeRoleByIdSelector();
