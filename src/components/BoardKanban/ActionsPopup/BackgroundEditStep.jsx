import { dequal } from 'dequal';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Image } from 'semantic-ui-react';
import { FilePicker, Popup } from '../../../lib/custom-ui';
import { withPopup } from '../../../lib/popup';
import ProjectBackgroundGradients from '../../../constants/ProjectBackgroundGradients';
import { ProjectBackgroundTypes } from '../../../constants/Enums';

import styles from './BackgroundEditStep.module.scss';
import globalStyles from '../../../styles.module.scss';

const BackgroundEditStep = React.memo(
  ({
    defaultValue,
    imageCoverUrl,
    isImageUpdating,
    onUpdate,
    onImageUpdate,
    onImageDelete,
  }) => {
    const [t] = useTranslation();

    const field = useRef(null);

    const handleGradientClick = (gradientName) => {
      const background = {
        type: ProjectBackgroundTypes.GRADIENT,
        name: gradientName,
      };

      if (!dequal(background, defaultValue)) {
        onUpdate(background);
      }
    }

    const handleImageClick = useCallback(() => {
      const background = {
        type: ProjectBackgroundTypes.IMAGE,
      };

      if (!dequal(background, defaultValue)) {
        onUpdate(background);
      }
    }, [defaultValue, onUpdate]);

    const handleFileSelect = useCallback(
      (file) => {
        onImageUpdate({
          file,
        });
      },
      [onImageUpdate],
    );

    const handleDeleteImageClick = useCallback(() => {
      onImageDelete();
    }, [onImageDelete]);

    const handleRemoveClick = useCallback(() => {
      onUpdate(null);
    }, [onUpdate]);

    useEffect(() => {
      field.current.focus();
    }, []);

    const [showBackgroundGradients, setshowBackgroundGradients] = useState(false);

    const image = (process.env.NODE_ENV === "development" && imageCoverUrl) ? imageCoverUrl.replace("http://localhost:3000/", "http://localhost:1337/") : imageCoverUrl;
    return (
      <>
        <Popup.Header>
          {t('common.editBackground', {
            context: 'title',
          })}
        </Popup.Header>
        <Popup.Content>
         <button type='button' className='glass-btn' style={{marginBottom : '8px', display : 'flex', justifyContent : 'center', alignItems : 'center', gridGap : '4px', gap : '4px'}} onClick={() => showBackgroundGradients ? setshowBackgroundGradients(false) : setshowBackgroundGradients(true)}>{showBackgroundGradients ? "Hide Gradients" : "Show Gradients"}<span/><span/><span/><span/></button>

          <div className={showBackgroundGradients ? 'project-gradients active' : 'project-gradients'}>
          {ProjectBackgroundGradients.map((gradient) => (
              <button
                key={gradient}
                type="button"
                className={classNames(
                  globalStyles[`background${upperFirst(camelCase(gradient))}`],
                )}
                onClick={() => handleGradientClick(gradient)}
              >{(defaultValue && gradient === defaultValue.name) && (<i className="fas fa-check"/>)}</button>
            ))}
          </div>
          {imageCoverUrl && (
            /* TODO: wrap in button */
            <Image
              src={image}
              label={
                defaultValue &&
                defaultValue.type === 'image' && {
                  corner: 'left',
                  size: 'small',
                  icon: {
                    name: 'star',
                    color: 'grey',
                    inverted: true,
                  },
                  className: styles.imageLabel,
                }
              }
              className={styles.image}
              onClick={handleImageClick}
            />
          )}
          <ul className='delete-account-modal-actions'>
            <li>
              <FilePicker accept="image/*" onSelect={handleFileSelect}>
                <button
                  ref={field}
                  type = 'button'
                  loading={isImageUpdating}
                  disabled={isImageUpdating}
                  className='glass-btn'
                >Upload new image<span/><span/><span/><span/></button>
              </FilePicker>
              </li>
              {imageCoverUrl && (
                <li><button type='button' className='glass-btn danger' onClick={handleDeleteImageClick}>Delete Image<span/><span/><span/><span/></button></li>
              )}
              {defaultValue && (
                <li><button type='button' className='glass-btn danger' disabled={isImageUpdating} onClick={handleRemoveClick}>Remove Background<span/><span/><span/><span/></button></li>
              )}
          </ul>
        </Popup.Content>
      </>
    );
  },
);

BackgroundEditStep.propTypes = {
  defaultValue: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  imageCoverUrl: PropTypes.string,
  isImageUpdating: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onImageUpdate: PropTypes.func.isRequired,
  onImageDelete: PropTypes.func.isRequired,
};

BackgroundEditStep.defaultProps = {
  defaultValue: undefined,
  imageCoverUrl: undefined,
};

export default withPopup(BackgroundEditStep);
