import React, { useCallback, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Popup } from 'semantic-ui-react';
// import TextareaAutosize from 'react-textarea-autosize';
// import { Form, TextArea } from 'semantic-ui-react';
// import { useDidUpdate, useToggle } from '../../lib/hooks';
// import { withPopup } from '../../lib/popup';

// import { useForm } from '../../hooks';

// import styles from './CardAdd.module.scss';

const DEFAULT_DATA = {
  name: '',
};

const CardAdd = React.memo(({ onCreate }) => {
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
    // selectNameField();
  }, [onCreate, data, setData]);

  // const handleFieldKeyDown = useCallback(
  //   (event) => {
  //     switch (event.key) {
  //       case 'Enter':
  //         event.preventDefault();

  //         submit();

  //         break;
  //       case 'Escape':
  //         onClose();

  //         break;
  //       default:
  //     }
  //   },
  //   [onClose, submit],
  // );

  // const [handleFieldBlur] = useClosableForm(onClose);

  // const handleSubmit = useCallback(() => {
  //   submit();
  // }, [submit]);

  // useEffect(() => {
  //   if (isOpened) {
  //     nameField.current.ref.current.select();
  //   }
  // }, [isOpened]);

  // useDidUpdate(() => {
  //   nameField.current.ref.current.select();
  // }, [selectNameFieldState]);

  useEffect(() => {
    nameField.current.focus();
  })

  return (
    <>
        <Popup.Header>Create Card</Popup.Header>
        <Popup.Content>
            <form
                onSubmit={(e) => submit(e)}
                >
                <input
                ref={nameField}
                // as={TextareaAutosize}
                name="name"
                value={data.name}
                placeholder={t('common.enterCardTitle')}
                // spellCheck={false}
                onChange={(e) => setData({name : e.target.value})}
                />
                

                {/* <button type = 'submit' className='glass-btn save' style={{marginTop : "4px"}}>
               Save
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </button> */}
            </form>
        </Popup.Content>
    </>
  );
});

CardAdd.propTypes = {
  // isOpened: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CardAdd;