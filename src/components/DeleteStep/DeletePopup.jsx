import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';
import { withPopup } from '../../lib/popup';

// import styles from './DeleteStep.module.scss';

const DeletePopup = React.memo(({ title, content, buttonContent, onConfirm, onBack }) => (
  <>
    <Popup.Header onBack={onBack}>{title}</Popup.Header>
    <Popup.Content>
     <ul className='delete-account-modal-actions'>
            <li>
              <p>{content}</p>
            </li>
            <li>
            <button type='button' className='glass-btn danger' onClick={ () => onConfirm()}>
                {buttonContent}
                <span/>
                <span/>
                <span/>
                <span/>
              </button>
            </li>
          </ul>
    </Popup.Content>
  </>
));

DeletePopup.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonContent: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onBack: PropTypes.func,
};

DeletePopup.defaultProps = {
  onBack: undefined,
};

export default withPopup(DeletePopup);
