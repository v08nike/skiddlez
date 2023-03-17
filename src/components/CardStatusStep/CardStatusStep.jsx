import React, { useCallback, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import DatePicker from 'react-datepicker';
// import { Form } from 'semantic-ui-react';
import { Popup } from '../../lib/custom-ui';
import { CardStatuses } from '../../constants/Enums';

const CardStatusStep = React.memo(({ defaultData, onUpdate, onClose }) => {

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

    console.log('defaultData = ', defaultData);

    statusField.current.focus();
  }, [defaultData])

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

    // // Useless as 'data' will only change in next tick, not here
    // console.log('handleFieldChange : ', e.target.name, ' = ', e.target.value);

  }

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    const cleanData = {
      ...data,
      // name: data.name.trim(),
      status: data.status,
    };

    // // Hmmm ...
    delete cleanData.id;

    // console.log('handleSubmit : cleanData = ', cleanData);

    // // Nope ...
    // onUpdate(cleanData.id, cleanData);

    // // CardContainer uses signature:
    // //       onUpdate: (data) => updateCard(id, data),
    // // so the correct call is:
    onUpdate(cleanData);

    onClose();

    // event.preventDefault();
  }, [onUpdate, data, onClose]);

  const statusOptions = [];
  Object.keys(CardStatuses).forEach(k => {
    statusOptions.push({key: CardStatuses[k], value: CardStatuses[k], text: (k)});

    /*
    if (CardStatuses[k] === defaultData.status) {
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
        Card Status
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

CardStatusStep.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CardStatusStep;
