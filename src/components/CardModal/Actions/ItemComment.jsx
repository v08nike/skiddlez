import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { Comment } from 'semantic-ui-react';
// import { Markdown } from '../../../lib/custom-ui';

import CommentEdit from './CommentEdit';
import User from '../../User';
import DeletePopup from '../../DeletePopup';

const ItemComment = React.memo(({
    data,
    createdAt,
    isPersisted,
    user,
    onUpdate,
    onDelete,
    canUpdateContent,
    canDeleteContent,
  }) => {
    const [t] = useTranslation();

    const commentEdit = useRef(null);

    const handleEditClick = useCallback(() => {
      commentEdit.current.open();
    }, []);

    return (
      <div className='card-modal-comment'>
        <ul>
          <li>
            <User size = "tiny" name={user.name} avatarUrl={user.avatarUrl} />
          </li>
          <li>
            <span>{user.name}</span>
          </li>
          <li>
            <span>
              {t('format:longDateTime', {
                postProcess: 'formatDate',
                value: createdAt,
              })}
            </span>
          </li>
          <li>
          <CommentEdit ref={commentEdit} defaultData={data} onUpdate={onUpdate}>
            <div className='card-modal-comment-actions'>
            {user.isCurrent && (
              <button type='button' className='glass-btn disabled'>
                <i className="fas fa-link"/>
                <span/><span/><span/><span/>
              </button>
            )}
            {(user.isCurrent || canUpdateContent) && (
              <button
                type="button"
                disabled={!isPersisted}
                onClick={handleEditClick}
                className='glass-btn edit'
              >
                <i className="fas fa-pencil-alt"/>
                <span/><span/><span/><span/>
              </button>
            )}
            {(user.isCurrent || canDeleteContent) && (
              <DeletePopup
                title={t('common.deleteComment', {
                  context: 'title',
                })}
                content={t('common.areYouSureYouWantToDeleteThisComment')}
                buttonContent={t('action.deleteComment')}
                onConfirm={onDelete}
              >
              <button
                type="button"
                disabled={!isPersisted}
                className='glass-btn danger'
              >
                <i className="far fa-trash-alt"/>
                <span/><span/><span/><span/>
              </button>
              </DeletePopup>
            )}
            </div>
          </CommentEdit>
          </li>
        </ul>
        <div className='card-modal-comment-actions-box'>
          <CommentEdit ref={commentEdit} defaultData={data} onUpdate={onUpdate}>
            <div className='card-modal-comment-text'>
              <p>{data.text}</p>
            </div>
          </CommentEdit>
        </div>
      </div>
    );
  },
);

ItemComment.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  createdAt: PropTypes.instanceOf(Date).isRequired,
  isPersisted: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canUpdateContent: PropTypes.func.isRequired,
  canDeleteContent: PropTypes.func.isRequired,
};

export default ItemComment;
