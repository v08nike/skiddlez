import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { withPopup } from '../../lib/popup'; 
import {Popup } from '../../lib/custom-ui';

// import { useForm } from '../../hooks';

// import styles from './AddPopup.module.scss';

const AddStep = React.memo(({ onCreate, setShowModel}) => {
  const [t] = useTranslation();

  const [data, setData] = useState({
    name: '',
  });

  const nameField = useRef(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const cleanData = {
      ...data,
      type: 'kanban',
      name: data.name.trim(),
    };

    if (!cleanData.name) {
      nameField.current.select();
      return;
    }

    onCreate(cleanData);
    setShowModel(null)
    setData({name : ""});
  }, [onCreate, data, setShowModel]);

  useEffect(() => {
    nameField.current.focus();
  }, []);

  return (
    <>
      <Popup.Header>
        {t('common.createBoard', {
          context: 'title',
        })} 
      </Popup.Header>
      <Popup.Content>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            fluid
            ref={nameField}
            name="name"
            value={data.name}
            placeholder={t('common.createBoard_hint')}
            onChange={(e) => setData({name : e.target.value})}
          />
          {/* <button style={{marginTop : "4px"}} type = 'submit' className='glass-btn save'> */}
            {/* <span> */}
           
            {/* </span> */}
          {/* <span/><span/><span/><span/></button> */}
        </form>
      </Popup.Content>
    </>
  );
});

AddStep.propTypes = {
  onCreate: PropTypes.func.isRequired,
  setShowModel: PropTypes.func.isRequired,
};

export default AddStep;
