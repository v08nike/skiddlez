import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import ProjectsContainer from '../../containers/ProjectsContainer';
import ProjectContainer from '../../containers/ProjectContainer';
import BoardWrapperContainer from '../../containers/BoardWrapperContainer';
import ActivityContainer from '../../containers/ActivityContainer';

import styles from './Static.module.scss';

const Static = ({ cardId, boardId, projectId, match : {path} }) => {
  const [t] = useTranslation();

  if(path === '/') {
    return (
      <ActivityContainer/>
    )
  }

  if (projectId === undefined || projectId === null && path === '/dashboard') {
    return (
      <ProjectsContainer />
    );
  }

  if (cardId === null) {
    return (
      <div className={classNames(styles.root, styles.flex)}>
        <div className={styles.message}>
          <h1>
            {t('common.cardNotFound', {
              context: 'title',
            })}
          </h1>
        </div>
      </div>
    );
  }

  if (boardId === null) {
    return (
      <div className={classNames(styles.root, styles.flex)}>
        <div className={styles.message}>
          <h1>
            {t('common.boardNotFound', {
              context: 'title',
            })}
          </h1>
        </div>
      </div>
    );
  }

  if (projectId === null) {
    return (
      <div className={classNames(styles.root, styles.flex)}>
        <div className={styles.message}>
          <h1>
            {t('common.projectNotFound', {
              context: 'title',
            })}
          </h1>
        </div>
      </div>
    );
  }

  if (boardId === undefined) {
    return (
      <>
      <ProjectContainer />
      </>
    );
  }

  return (
    <BoardWrapperContainer />
  );
};

Static.propTypes = {
  cardId: PropTypes.string,
  boardId: PropTypes.string,
  projectId: PropTypes.string,
  match : PropTypes.object.isRequired// eslint-disable-line react/forbid-prop-types
};

Static.defaultProps = {
  cardId: undefined,
  boardId: undefined,
  projectId: undefined,
};

export default withRouter(Static);
