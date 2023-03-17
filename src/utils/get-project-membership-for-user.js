import { createSelector } from 'redux-orm';
import { useSelector } from 'react-redux';
import { currentUserIdSelector } from '../selectors/user';
import orm from '../orm';

export default (projectId) => {

  const projectMembershipsForUserSelector = createSelector(
    orm,
    (_, id) => id,
    (_, id, userId) => userId,
    ({ Project }, id, userId) => {
      if (!id) {
        return id;
      }

      const projectModel = Project.withId(id);

      if (!projectModel) {
        return projectModel;
      }

      const pmu = projectModel
        .getOrderedMembershipsQuerySet()
        .toModelArray();

      // console.log('id = ', id);
      // console.log('userId = ', userId);
      // console.log('pmu = ', pmu);

      return pmu.filter((projectMembershipModel) => {
        // console.log(projectMembershipModel.userId, ' ? ', userId)
        return projectMembershipModel.userId === userId;
      });
    },
  );

  const currentUserId = useSelector(state => currentUserIdSelector(state));
  const pms = useSelector(state => projectMembershipsForUserSelector(
    state, projectId, currentUserId));

  // // it's always the first one since it's a 1-to-1 relation
  return pms[0];
}

// export default getProjectMembershipForUser;
