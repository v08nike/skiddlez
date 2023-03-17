import { dequal } from 'dequal';
import pickBy from 'lodash/pickBy';
import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import { form } from 'semantic-ui-react';

// import { useform } from '../../../hooks';

// import styles from './InformationEdit.module.scss';

const InformationEdit = React.memo(({ defaultData, onUpdate }) => {
  // const [t] = useTranslation();
  const [phoneCheck, setPhoneCheck] = useState(false);
  const nameField = useRef(null);
  const [data, setData] = useState({
    name: '',
    phone: '',
    ...pickBy(defaultData),
  })

  const cleanData = useMemo(
    () => ({
      ...data,
      name: data.name.trim(),
      phone: data.phone.trim() || null,
    }),
    [data],
  );

  const handleFieldChange = (e) => {
    setData(prevData => ({
      ...prevData,
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cleanData.name) {
      nameField.current.focus();
      return;
    }

    if(cleanData.phone.length > 0) {
      if(cleanData.phone.length < 10 || cleanData.phone.length > 12) {
        setPhoneCheck(true);
        setTimeout(() => {
          setPhoneCheck(false);
        }, 10000);
        return
      }

      let flag = false;

      cleanData.phone.split("").forEach((digit, index) => {
        const asciiValue = digit.charCodeAt(0);
        if(asciiValue > 57 || asciiValue < 48){
          flag = true;
        }
        if(index === 0 && asciiValue === 48) {
          flag = true;
        }
      })

      if(flag) {
        setPhoneCheck(true);
        setTimeout(() => {
          setPhoneCheck(false);
        }, 10000);
        return
      }
    }

    onUpdate(cleanData);
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <ul className = 'user-settings-form'>
        <li>
          <span>Name</span>
          <input placeholder='Enter name' value = {data.name} onChange = {(e) => handleFieldChange(e)} ref = {nameField} name = "name" />
        </li>
        <li>
          <span>Phone</span>
          <input type='text' placeholder='Enter phone number' value = {data.phone} onChange = {(e) => handleFieldChange(e)} name = "phone" />
          {phoneCheck && (<p>Please enter a valiid phone number</p>)}
        </li>
        <li>
          <span>Organization</span>
          <div className='organization-value'>{data.organization}</div>
        </li>
        <li>
          <button className='glass-btn save' type = 'submit'  positive disabled={dequal(cleanData, defaultData)}>
         Save
          <span/><span/><span/><span/></button>
        </li>
      </ul>
    </form>
  );
});

InformationEdit.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
};

export default InformationEdit;
