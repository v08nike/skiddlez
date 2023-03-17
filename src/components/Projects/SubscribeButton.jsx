import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import getProjectMembershipForUser from '../../utils/get-project-membership-for-user';

const SubscribeButton = React.memo(({ klassName, project, onToggleSubscribe }) => {

  const projectMembership = getProjectMembershipForUser(project.id);

  const handleClick = useCallback(() => {
      /*
      // // This crashes the app
      projectMembership.isSubscribe = !projectMembership.isSubscribe;

      onToggleSubscribe(projectMembership);
      */

      // // make a shallow copy of the passed in param
      // // and update the relevant property. this prevents
      // // that 'less hook render' error.
      const pm = (({ id, projectId, userId, isSubscribe }) =>
        ({ id, projectId, userId, isSubscribe })) (projectMembership);

      pm.isSubscribe = !projectMembership.isSubscribe;

      console.log('pm = ', pm);

      onToggleSubscribe(pm);
    },
    [onToggleSubscribe, projectMembership],
  );

  const btnClazz = classNames( {fas: projectMembership.isSubscribe, far : !projectMembership.isSubscribe}, 'fa-star');

  return (
    <button type='button' className={klassName} onClick={handleClick} >
      <i className={btnClazz} />
    </button>
  );
});

SubscribeButton.propTypes = {
  klassName: PropTypes.string,
  project: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onToggleSubscribe: PropTypes.func.isRequired,
};

SubscribeButton.defaultProps = {
  klassName: undefined,
};

export default SubscribeButton;
