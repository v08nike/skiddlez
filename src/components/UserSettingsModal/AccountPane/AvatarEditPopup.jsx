import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { Button } from 'semantic-ui-react';
import { withPopup } from '../../../lib/popup';
import { FilePicker, Popup } from '../../../lib/custom-ui';

// import styles from './AvatarEditPopup.module.scss';

const AvatarEditStep = React.memo(({ defaultValue, onUpdate, onDelete, onClose }) => {
  const [t] = useTranslation();

  // const field = useRef(null);

  const handleFileSelect = useCallback(
    (file) => {
      onUpdate({
        file,
      });

      onClose();
    },
    [onUpdate, onClose],
  );

  const handleDeleteClick = useCallback(() => {
    onDelete();
    onClose();
  }, [onDelete, onClose]);

  // useEffect(() => {
  //   field.current.focus();
  // }, []);

  return (
    <>
      <Popup.Header>
        {t('common.editAvatar', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
          <FilePicker accept="image/*" onSelect={handleFileSelect}>
          <button type='button' style={{marginBottom : "12px"}} className='glass-btn'>Upload New Avatar<span/><span/><span/><span/></button>
          </FilePicker>
        {defaultValue && (
          <button type='button' onClick={handleDeleteClick} className='glass-btn danger'>Delete Avatar<span/><span/><span/><span/></button>
        )}
      </Popup.Content>
    </>
  );
});

AvatarEditStep.propTypes = {
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

AvatarEditStep.defaultProps = {
  defaultValue: undefined,
};

export default withPopup(AvatarEditStep);
