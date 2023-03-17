import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import { Loader, Visibility } from 'semantic-ui-react';

import { ActionTypes } from '../../../constants/Enums';
import CommentAdd from './CommentAdd';
import Item from './Item';

import hasPermision from '../../../utils/has-permission';

import styles from './Actions.module.scss';

const Actions = React.memo(
  ({
    items,
    isFetching,
    isAllFetched,
    isEditable,
    onFetch,
    onCommentCreate,
    onCommentUpdate,
    onCommentDelete,
  }) => {
    // const [t] = useTranslation();

    const handleCommentUpdate = useCallback(
      (id, data) => {
        onCommentUpdate(id, data);
      },
      [onCommentUpdate],
    );

    const handleCommentDelete = useCallback(
      (id) => {
        onCommentDelete(id);
      },
      [onCommentDelete],
    );

    // const creaete = (data) => {
    //   console.log(data)
    //   onCommentCreate(data)
    // }

    const [canCreateContent] = hasPermision('create_and_share_new_content:create');

    const [canUpdateContent] = hasPermision('create_and_share_new_content:update');

    const [canDeleteContent, currentUserRoleId] = hasPermision('create_and_share_new_content:delete');

    return (
      <>
        <div className='card-modal-comments card-modal-card'>
          {canCreateContent && (
          <>
            <div className='card-modal-header'>
              <i className="far fa-comments"/>
              <h6>Add Comment</h6>
            </div>
            <div className = 'card-modal-content'>
              <CommentAdd onCreate={onCommentCreate} />
            </div>
          </>
        )}
          <div className='all-comments'>
            <div className = 'card-modal-header'>
              <i className="fab fa-font-awesome-flag"/>
              <h6>Actions</h6>
            </div>
            <div className='card-modal-content'>
              <ul className='card-modal-all-comments' data-editable={isEditable} >
              {/*
                isEditable={isEditable}
                createdAt={item.createdAt}
              */}
                {items.map((item) =>
                  item.type === ActionTypes.COMMENT_CARD ? (
                    <li>
                      <Item.Comment
                        key={`actions------${item.id}`}
                        data={item.data}
                        createdAt={new Date(item.createdAt)}
                        isPersisted={item.isPersisted}
                        user={item.user}
                        onUpdate={(data) => handleCommentUpdate(item.id, data)}
                        onDelete={() => handleCommentDelete(item.id)}
                        canUpdateContent={canUpdateContent && currentUserRoleId < item.user.roleId}
                        canDeleteContent={canDeleteContent && currentUserRoleId < item.user.roleId}
                      />
                    </li>
                      ) : (
                        <li>
                          <Item
                          key={`actions------${item.id}`}
                          type={item.type}
                          data={item.data}
                          createdAt={new Date(item.createdAt)}
                          user={item.user}
                        />
                        </li>
                      ),
                )}
              </ul>
            </div>
            {isFetching ? (
              <Loader active inverted inline="centered" size="small" className={styles.loader} />
            ) : (
              !isAllFetched && <Visibility fireOnMount onOnScreen={onFetch} />
            )}
          </div>
        </div>
      </>
    );
  },
);

Actions.propTypes = {
  items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  isFetching: PropTypes.bool.isRequired,
  isAllFetched: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onFetch: PropTypes.func.isRequired,
  onCommentCreate: PropTypes.func.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
};

export default Actions;
