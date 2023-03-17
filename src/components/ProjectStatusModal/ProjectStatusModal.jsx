import React, { useCallback, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import DatePicker from 'react-datepicker';
// import { Form } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';
import { withPopup } from '../../lib/popup';
import { Statuses } from '../../constants/Enums';

// import styles from './ProjectStatusModal.module.scss';

const ProjectStatusModal = React.memo(({ defaultData, onUpdate, onClose }) => {

  const [data, setData] = useState({
    // name: '',
    // dueDate : '',
    ...defaultData,
  });

  // let statusString;

  const statusField = useRef(null);
  // const nameField = useRef(null);

  // // on "load" focus on this element
  useEffect(() => {
    statusField.current.focus();
  }, [])

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

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const cleanData = {
      ...data,
      // name: data.name.trim(),
      status: data.status,
    };

    /*
    if (!cleanData.name) {
      return;
    }
    */

    onUpdate(cleanData.id, cleanData);

    onClose();

    // event.preventDefault();
  }, [onUpdate, data, onClose]);

  const statusOptions = [];
  Object.keys(Statuses).forEach(k => {
    statusOptions.push({key: Statuses[k], value: Statuses[k], text: (k)});

    /*
    if (Statuses[k] === defaultData.status) {
      statusString = (k);
    }
    */
  });
  /*
  const statusOptions = [
    { key: '1', value: '1', text: 'Active' },
    { key: '2', value: '2', text: 'Inactive' },
    { key: '3', value: '3', text: 'Archived' },
  ];
  */

  return (
    <>
      <Popup.Header>
        Project Status
      </Popup.Header>
      <Popup.Content>

      {/* <div className="mb-20">
        Current Status: {statusString}
      </div> */}

      <form onSubmit={(e) => handleSubmit(e)}>
          <ul className='project-add-modal'>
            <li>
              {/* <h6>Status</h6> */}
              <select value={data.status} name = 'status' ref = {statusField} onChange={(e) => handleFieldChange(e)}>
                <option value='' disabled style={{display : 'none'}}>Select Status</option>
                {statusOptions.map((item) => {
                  return (
                    <option key={item.key} value={item.key}>{item.text}</option>
                  )
                })}
              </select>
            </li>
            {/* <li>
              <h6>Name</h6>
              <input
                  ref={nameField}
                  name="name"
                  value={data.name}
                  onChange={(e) => handleFieldChange(e, false)}
                />
            </li>
            <li>
              <h6>dueDate</h6>
              <input type="text" value={data.dueDate} readOnly />
              <DatePicker
                inline
                name = 'dueDate'
                disabledKeyboardNavigation
                onChange={(e) => handleFieldChange(e, true)}
              />
            </li> */}
            <li>
              <button
                type = 'submit'
                className='glass-btn save'
                >Submit<span/><span/><span/><span/></button>
            </li>
          </ul>
        </form>
      </Popup.Content>
    </>
  );
});

ProjectStatusModal.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withPopup(ProjectStatusModal);
