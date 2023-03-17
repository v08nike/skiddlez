import React, { useCallback, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
// import { Form } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';
import { withPopup } from '../../lib/popup';
// import { currentUserSelector } from '../../selectors';
import { currentUserIdSelector } from '../../selectors';

// import { useForm } from '../../hooks';

// import styles from './ProjectAddModal.module.scss';

const ProjectAddModal = React.memo(({ onCreate }) => {
  const [t] = useTranslation();

  const [data, setData] = useState({
    name: '',
    description : '',
    dueDate : '',
  });

  const nameField = useRef(null);

  // // Why not add this via containers/ProjectAddModalContainer ?
  // // Because that file's mapStateToProps has no 'state'.
  // // So better leave it alone and resort to this :/
  // const currentUser = useSelector(state => currentUserSelector(state));
  const currentUserId = useSelector(state => currentUserIdSelector(state));

  const handleFieldChange = (e, isDate) => {
    if(isDate) {
      setData(prevData => ({
        ...prevData,
        dueDate : e
      }))
    } else {
      setData(prevData => ({
        ...prevData,
        [e.target.name] : e.target.value
      }))
    }
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const cleanData = {
      ...data,
      name: data.name.trim(),
      description: data.description.trim(),
      // createdBy: currentUser,
      createdBy: currentUserId,
    };

    if (!cleanData.name) {
      return;
    }

    onCreate(cleanData);
  // }, [onCreate, data, currentUser]);
  }, [onCreate, data, currentUserId]);

  useEffect(() => {
    nameField.current.focus();
  }, [])

  return (
    <>
      <Popup.Header>
        Enter Project Details
      </Popup.Header>
      <Popup.Content>

      <form onSubmit={(e) => handleSubmit(e)}>
          <ul className='project-add-modal'>
            <li>
              <h6>Name</h6>
              <input
                  ref={nameField}
                  name="name"
                  value={data.name}
                  placeholder={t('common.enterProjectTitle')}
                  onChange={(e) => handleFieldChange(e, false)}
                />
            </li>
            <li>
              <h6>Description</h6>
              <textarea
                name="description"
                value={data.description}
                onChange={(e) => handleFieldChange(e, false)}
                placeholder={t('common.enterProjectDescription')}
              />
            </li>
            <li>
              <h6>Due Date</h6>
              <DatePicker
                selected={data.dueDate}
                minDate={new Date()}
                name = 'dueDate'
                placeholderText={t('common.enterProjectDate')}
                disabledKeyboardNavigation
                onChange={(e) => handleFieldChange(e, true)}
              />
            </li>
            <li>
              <button
                type = 'submit'
                className='glass-btn save'
                >Save<span/><span/><span/><span/></button>
            </li>
          </ul>
        </form>
      </Popup.Content>
    </>
  );
});

ProjectAddModal.propTypes = {
  // defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  // isSubmitting: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default withPopup(ProjectAddModal);
