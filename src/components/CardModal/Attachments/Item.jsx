import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Loader } from 'semantic-ui-react';

import EditPopup from './EditPopup';
import DeletePopup from "../../DeleteStep/DeletePopup";

import styles from './Item.module.scss';

const Item = React.memo(
  ({
    name,
    url,
    coverUrl,
    createdAt,
    isCover,
    isPersisted,
    onCoverSelect,
    onCoverDeselect,
    onUpdate,
    onDelete,
  }) => {
    const [t] = useTranslation();
    const handleToggleCoverClick = useCallback(
      (event) => {
        event.stopPropagation();

        if (isCover) {
          onCoverDeselect();
        } else {
          onCoverSelect();
        }
      },
      [isCover, onCoverSelect, onCoverDeselect],
    );

    const handleClick = useCallback(() => {
      if(process.env.NODE_ENV === 'development') {
        window.open(url.replace('http://localhost:3000', 'http://localhost:1337'), '__blank')
      }
      else {
        window.open(url, '_blank');
      }
    }, [url]);

    if (!isPersisted) {
      return (
        <div className={classNames(styles.wrapper, styles.wrapperSubmitting)}>
          <Loader inverted />
        </div>
      );
    }
    const fileFormat = url ? url.split('.') : "";

    return (
      <div className='card-modal-attachment'>
        <div className='card-modal-attachment-image'>
          {coverUrl && (
            <>
            <button type='button' onClick={() => handleClick(coverUrl)}>
              <img alt = "" src = {process.env.NODE_ENV === 'development' ? coverUrl.replace('http://localhost:3000', 'http://localhost:1337') : coverUrl} />
            </button>
            {isCover && (
              <span>
                <i className="fas fa-star"/>
              </span>
            )}
            </>
          )}

          {(url && !coverUrl) && (
            <>
            <button type='button' onClick={() => handleClick(url)}>
              {fileFormat[fileFormat.length - 1].toUpperCase()}
            </button>
            {isCover && (
              <span>
                <i className="fas fa-star"/>
              </span>
            )}
            </>
          )}
        </div>
        <ul>
          <li>
            <span>{name}</span>
          </li>
          <li>
            <span>{t('format:longDateTime', {
              postProcess: 'formatDate',
              value: createdAt,
            })}</span>
          </li>
          {(isPersisted) && (
            <li>
             {coverUrl && (
                <button type="button" onClick={handleToggleCoverClick}>
                <i className="fas fa-chalkboard"/>
                  <span>
                    {isCover
                      ? t('action.removeCover', {
                          context: 'title',
                        })
                      : t('action.makeCover', {
                          context: 'title',
                        })}
                  </span>
                </button>
             )}
              <EditPopup
                  defaultData={{
                    name,
                  }}
                  onUpdate={onUpdate}
                >
                  <button type='button' className='glass-btn edit'>
                  <i className="fas fa-pencil-alt"/><span/><span/><span/><span/>
                  </button>
                </EditPopup>
                <DeletePopup
                    title = "Delete Attachment"
                    onConfirm = {onDelete}
                    content={t('common.areYouSureYouWantToDeleteThisAttachment')}
                    buttonContent={t('action.deleteAttachment')}>
                  <button type='button' className='glass-btn danger'>
                  <i className="far fa-trash-alt"/><span/><span/><span/><span/>
                    </button>
                </DeletePopup>
            </li>
          )}
        </ul>
      </div>
    );
  },
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  coverUrl: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  isCover: PropTypes.bool.isRequired,
  isPersisted: PropTypes.bool.isRequired,
  onCoverSelect: PropTypes.func.isRequired,
  onCoverDeselect: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

Item.defaultProps = {
  url: undefined,
  coverUrl: undefined,
  createdAt: undefined,
};

export default Item;
