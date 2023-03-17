import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux"
import { useTranslation } from 'react-i18next';
import DeletePopup from '../DeleteStep/DeletePopup';

const ActionsStep = React.memo(({ onNameEdit, onDelete, cardStatus }) => {
  const [t] = useTranslation();

  const handleEditNameClick = useCallback(() => {
    onNameEdit();
  }, [onNameEdit]);

  /*
  const handleAddCardClick = useCallback(() => {
    onCardAdd();
    onClose();
  }, [onCardAdd, onClose]);
  */

  return (
    <ul className='list-header-actions'>
      <li>
        <button type='button' className='glass-btn' onClick={handleEditNameClick}>
            <i className="fas fa-pencil-alt"/>
            <span/>
            <span/>
            <span/>
            <span/>
        </button>
      </li>
      <li>
        <button type='button' className='glass-btn' onClick={() => cardStatus(true)}>
        <i className="fas fa-plus"/>
            <span/>
            <span/>
            <span/>
            <span/>
        </button>
      </li>
      {onDelete && (
        <li>
          <DeletePopup
            title={t('common.deleteList', {
              context: 'title',
            })}
            content={t('common.areYouSureYouWantToDeleteThisList')}
            buttonContent={t('action.deleteList')}
            onConfirm={onDelete}
          >
            <button type='button' className='glass-btn'>
            <i className="far fa-trash-alt"/>
                <span/>
                <span/>
                <span/>
                <span/>
            </button>
            </DeletePopup>
      </li>
      )}
    </ul>
  );
});

ActionsStep.propTypes = {
  onNameEdit: PropTypes.func.isRequired,
  // onCardAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  cardStatus: PropTypes.func.isRequired,
};

ActionsStep.defaultProps = {
  onDelete: undefined,
};

const mapStateToProps = state => ({
  theme : state.theme.theme
})

export default connect(mapStateToProps)(ActionsStep);
