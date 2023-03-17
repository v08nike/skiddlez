import React, { useCallback, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
// import TextareaAutosize from 'react-textarea-autosize';
// import { Form, TextArea } from 'semantic-ui-react';
// import { useDidUpdate, useToggle } from '../../lib/hooks';
// import { withPopup } from '../../lib/popup';

// import { useForm } from '../../hooks';

// import styles from './CardAdd.module.scss';

const DEFAULT_DATA = {
  name: '',
};

const CardAdd = React.memo(({ onCreate, cardStatus }) => {
  const [t] = useTranslation();
  const [data, setData] = useState(DEFAULT_DATA);
  // const [selectNameFieldState, selectNameField] = useToggle();

  const nameField = useRef(null);

  const submit = useCallback((e) => {
    e.preventDefault();
    const cleanData = {
      ...data,
      name: data.name.trim(),
    };

    if (!cleanData.name) {
      nameField.current.focus();
      return;
    }

    onCreate(cleanData);

    setData(DEFAULT_DATA);
    cardStatus(true)
    nameField.current.focus();
  }, [onCreate, data, setData, cardStatus]);

  useEffect(() => {
    nameField.current.focus();  
  }, [])

  return (
    <form
      onSubmit={(e) => submit(e)}
      style={{
        width : "200px"
      }}
    >
      <input
        ref={nameField}
        name="name" 
        value={data.name}
        placeholder={t('common.enterCardTitle')}
        onChange={(e) => setData({name : e.target.value})}
        onBlur={() => cardStatus(false)}
        onKeyDown={() => cardStatus(true)}
      />
    </form>
  );
});

CardAdd.propTypes = {
  onCreate: PropTypes.func.isRequired,
  cardStatus: PropTypes.func.isRequired,
};

export default CardAdd;