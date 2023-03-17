import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { Form } from 'semantic-ui-react';
import { useDidUpdate, useToggle } from '../../lib/hooks';
// import { withPopup } from '../../lib/popup'; 
import { Popup } from '../../lib/custom-ui';

// import { useForm } from '../../hooks';

// import styles from './ListAdd.module.scss';

const DEFAULT_DATA = {
  name: '',
};

const ListAdd = React.memo(({ onCreate }) => {
  const [t] = useTranslation();
  const [data, setData] = useState(DEFAULT_DATA);
  const [selectNameFieldState, selectNameField] = useToggle();

  const nameField = useRef(null);

  // const handleFieldKeyDown = useCallback(
  //   (event) => {
  //     if (event.key === 'Escape') {
  //       onClose();
  //     }
  //   },
  //   [onClose],
  // );

  // const [handleFieldBlur, handleControlMouseOver, handleControlMouseOut] = useClosableForm(onClose);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const cleanData = {
      ...data,
      name: data.name.trim(),
    };

    if (!cleanData.name) {
      nameField.current.select();
      return;
    }

    onCreate(cleanData);

    setData(DEFAULT_DATA);
    selectNameField();
  }, [onCreate, data, setData, selectNameField]);

  useEffect(() => {
    nameField.current.select();
  }, []);

  useDidUpdate(() => {
    nameField.current.select();
  }, [selectNameFieldState]);

  return (
    <>
    <Popup.Header>
      Create List
    </Popup.Header>
    <Popup.Content>
      
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        fluid
        ref={nameField}
        name="name"
        value={data.name}
        onChange={(e) => setData({name : e.target.value})}
        placeholder={t('common.enterListTitle')}
      />
      {/* <Input
        ref={nameField}
        name="name"
        value={data.name}
        placeholder={t('common.enterListTitle')}
        className={styles.field}
        onKeyDown={handleFieldKeyDown}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
      /> */}
      {/* <button type = 'submit' className='glass-btn save' style={{marginTop : "4px"}}> */}
      
      {/* <span/>
                <span/>
                <span/>
                <span/></button> */}
    </form>
    </Popup.Content>
    </>
  );
});

ListAdd.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default ListAdd;
