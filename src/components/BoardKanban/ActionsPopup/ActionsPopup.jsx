import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { Menu } from 'semantic-ui-react';
// import { withPopup } from '../../../lib/popup';
// import { Popup } from '../../../lib/custom-ui';

// import { useSteps } from '../../../hooks';
import NameEditStep from './NameEditStep';
import BackgroundEditStep from './BackgroundEditStep';
import DeletePopup from '../../DeleteStep/DeletePopup';

// import styles from './ActionsPopup.module.scss';

// const StepTypes = {
//   EDIT_NAME: 'EDIT_NAME',
//   EDIT_BACKGROUND: 'EDIT_BACKGROUND',
//   DELETE: 'DELETE',
// };

const ActionsStep = React.memo(
  ({ project, onUpdate, onBackgroundImageUpdate, onDelete }) => {
    const [t] = useTranslation();

    const [onClose, setOnClose] = useState(true);

    const handleNameUpdate = useCallback(
      (newName) => {
        onUpdate({
          name: newName,
        });
      },
      [onUpdate],
    );

    const handleBackgroundUpdate = useCallback(
      (newBackground) => {
        onUpdate({
          background: newBackground,
        });
      },
      [onUpdate],
    );

    const handleBackgroundImageDelete = useCallback(() => {
      onUpdate({
        backgroundImage: null,
      });
    }, [onUpdate]);

    useEffect(() => {
      setOnClose(true)
    }, [setOnClose])

    if(!onClose) 
    return <></>
    return (
      <>
          <ul>
            <li>
              
            <NameEditStep
                defaultValue={project.name}
                onUpdate={handleNameUpdate}
                onClose={setOnClose}
              >
              <button type='button' className='glass-btn edit'>
                <i className="fas fa-pencil-alt"/>
                <span/>
                <span/>
                <span/>
                <span/>
              </button>
              </NameEditStep>
            </li>
            <li>
              
            <BackgroundEditStep
                defaultValue={project.background}
                imageCoverUrl={project.backgroundImage && project.backgroundImage.coverUrl}
                isImageUpdating={project.isBackgroundImageUpdating}
                onUpdate={handleBackgroundUpdate}
                onImageUpdate={onBackgroundImageUpdate}
                onImageDelete={handleBackgroundImageDelete}
              >
              <button type='button' className='glass-btn edit' >
              <i className="far fa-image"/>
                <span/>
                <span/>
                <span/>
                <span/>
              </button>
              </BackgroundEditStep>
            </li>
            <li>
            <DeletePopup
                title={t('common.deleteProject', {
                  context: 'title',
                })}
                content={t('common.areYouSureYouWantToDeleteThisProject')}
                buttonContent={t('action.deleteProject')}
                onConfirm={onDelete}
              >
            <button type='button' className='glass-btn danger'>
              <i className="far fa-trash-alt"/>
                <span/>
                <span/>
                <span/>
                <span/>
              </button>
              </DeletePopup>
            </li>
          </ul>
      </>
    );
  },
);

ActionsStep.propTypes = {
  project: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onBackgroundImageUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionsStep;
