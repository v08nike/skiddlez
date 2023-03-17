import { useSelector } from 'react-redux';
import { currentUserSelector } from '../selectors/user';
import { roleByIdSelector } from '../selectors/role';

// const hasPermission = (permissions, permissionToCheck) => {
export default (permissionToCheck) => {

  // // Get currently logged in user's role.
  const currentUser = useSelector(state => currentUserSelector(state));

  // // Redux-orm sometimes squashed the "roleId" property
  // // to an integer when the permissions array is too large
  const roleObject = useSelector(state =>
    roleByIdSelector(state, currentUser.roleId));

  // // 'permissions' below contains the permissions for the current user.
  const { permissions } = roleObject;


  let found = false;

  // for (const permission of perms) {
  for (let i = 0; i < permissions.length; i+=1) {
    const permission = permissions[i];
    // // A user can only create accounts with role number
    // // equal or larger than its own
    if (permission.name === permissionToCheck) {
      found = true;
      break;
    }
  }

  // // Why not return only the 'found' variable ?
  // // Because app logic sometimes needs the role id too,
  // // say for example, a user can create another user,
  // // but they only can create users below their rank
  // // i.e. skiddlez/client/src/components/BoardKanban/MembershipEditPopup.jsx
  return [found, currentUser.roleId];
}

// export default hasPermission;
