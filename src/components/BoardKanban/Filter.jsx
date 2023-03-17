import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Popup } from '../../lib/custom-ui';
import { withPopup } from '../../lib/popup';

// import User from '../User';
// import Label from '../Label';
import ProjectMembershipsPopup from '../ProjectMembershipsPopup';
import LabelsPopup from '../LabelsPopup';

// import styles from './Filter.module.scss';

const Filter = React.memo(
  ({
    users,
    labels,
    allProjectMemberships,
    allLabels,
    onUserAdd,
    onUserRemove,
    onLabelAdd,
    onLabelRemove,
    onLabelCreate,
    onLabelUpdate,
    onLabelDelete,
  }) => {
    const [t] = useTranslation();

    // const handleRemoveUserClick = useCallback(
    //   (id) => {
    //     onUserRemove(id);
    //   },
    //   [onUserRemove],
    // );

    // const handleRemoveLabelClick = useCallback(
    //   (id) => {
    //     onLabelRemove(id);
    //   },
    //   [onLabelRemove],
    // );

    return (
      <Popup.Content>
        <div className="filters">
        <div className="filter">
          <h3>Members:</h3>
          <ProjectMembershipsPopup
            items={allProjectMemberships}
            currentUserIds={users.map((user) => user.id)}
            title={t('common.filterByMembers', {
              context: 'title',
            })}
            onUserSelect={onUserAdd}
            onUserDeselect={onUserRemove}
          />
          {/* {users.map((user) => (
            <div key={user.id} className="filterItem">
              <User
                name={user.name}
                avatarUrl={user.avatarUrl}
                size="tiny"
                onClick={() => handleRemoveUserClick(user.id)}
              />
            </div>
          ))} */}
        </div>
        {(allLabels && allLabels.length > 0) && (
          <div className="filter labels-filter">
            <h3>Labels: </h3>
            <LabelsPopup
              items={allLabels}
              currentIds={labels.map((label) => label.id)}
              title={t('common.filterByLabels', {
                context: 'title',
              })}
              onSelect={onLabelAdd}
              onDeselect={onLabelRemove}
              onCreate={onLabelCreate}
              onUpdate={onLabelUpdate}
              onDelete={onLabelDelete}
            />
          </div>
        )}
      </div>
      </Popup.Content>
    );
  },
);

Filter.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  users: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  allProjectMemberships: PropTypes.array.isRequired,
  allLabels: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  onUserAdd: PropTypes.func.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  onLabelAdd: PropTypes.func.isRequired,
  onLabelRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
};

export default withPopup(Filter);
