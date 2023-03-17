import { Model, attr } from 'redux-orm';

import ActionTypes from '../constants/ActionTypes';

export default class extends Model {
  static modelName = 'Role';

  static fields = {
    id: attr(),
    name: attr(),
  };

  static reducer({ type, payload }, Role) {
    switch (type) {
      // // When a usder is fetched, save their Role
      // // since it'll get 'squashed' into an integer :(
      case ActionTypes.CURRENT_USER_FETCH_SUCCEEDED:

        // console.log('payload.user.roleId => ', payload.user.roleId);

        Role.upsert(payload.user.roleId);

        // console.log('Role => ', payload.user.roleId);

        break;
      default:
    }
  }
}
