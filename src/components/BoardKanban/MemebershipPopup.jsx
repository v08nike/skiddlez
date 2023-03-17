import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from '../../lib/custom-ui';
import { withPopup } from '../../lib/popup';
import MembershipEditPopup from './MembershipEditPopup';
import MembershipAddPopup from './MembershipAddPopup';
import User from '../User';

const MembershipPopup = React.memo(({memberships, isEditable, onDelete, users,currentUserIds, onCreate, mode}) => {
  console.log(mode)
    
    return (
        <>
            <Popup.Header>
                Members
            </Popup.Header>
            <Popup.Content>
                <ul className='project-members'>
                {memberships.map((membership) => (
                <li key={`${membership.id}`}>
                  <MembershipEditPopup
                  theme = {mode}
                    user={membership.user}
                    isEditable={isEditable}
                    onDelete={() => onDelete(membership.id)}
                  >
                    <User
                      name={membership.user.name}
                      avatarUrl={membership.user.avatarUrl}
                      size="small"
                      isDisabled={!membership.isPersisted}
                    />
                  </MembershipEditPopup>
                </li>
              ))}
                </ul>
                {isEditable && (
                    <MembershipAddPopup
                    users={users}
                    currentUserIds={currentUserIds}
                    onCreate={onCreate}
                    >
                        <button style={{marginTop : "8px"}} type = 'button' className='glass-btn'>
                            Add Members
                        <i className="fas fa-user-plus"/>
                        <span/><span/><span/><span/>
                        </button>
                    </MembershipAddPopup>
                )}
            </Popup.Content>
        </>
    )
})

MembershipPopup.propTypes = {
    /* eslint-disable react/forbid-prop-types */
    memberships : PropTypes.array.isRequired,
    users : PropTypes.array.isRequired,
    currentUserIds : PropTypes.array.isRequired,
    isEditable : PropTypes.bool.isRequired,
    onCreate : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired,
    mode : PropTypes.string.isRequired
}

export default withPopup(MembershipPopup)