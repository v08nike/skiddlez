import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';
import { Form, TextArea } from 'semantic-ui-react';

import { useClosableForm, useField } from '../../../hooks';
import { Popup } from '../../../lib/custom-ui';
import { withPopup } from '../../../lib/popup';

// import styles from './NameEdit.module.scss';

const NameEdit = React.forwardRef(({ defaultValue, onUpdate }, ref) => {
  // const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [value, handleFieldChange, setValue] = useField(defaultValue);

  const field = useRef(null);

  const open = useCallback(() => {
    setIsOpened(true);
    setValue(defaultValue);
  }, [defaultValue, setValue]);

  const close = useCallback(() => {
    setIsOpened(false);
    setValue(null);
  }, [setValue]);

  const submit = useCallback(() => {
    const cleanValue = value.trim();

    if (!cleanValue) {
      field.current.ref.current.select();
      return;
    }

    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }

    close();
  }, [defaultValue, onUpdate, value, close]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        submit();
      }
    },
    [submit],
  );

  // const [handleFieldBlur, handleControlMouseOver, handleControlMouseOut] = useClosableForm(
  const [handleFieldBlur] = useClosableForm(
    close,
    isOpened,
  );

  const handleSubmit = useCallback(() => {
    submit();
  }, [submit]);

  useEffect(() => {
    field.current.ref.current.select();
  }, []);
  return (
    <>
    <Popup.Header>
      Edit Task
    </Popup.Header>
    <Popup.Content>
    <Form onSubmit={handleSubmit}>
      <TextArea
        ref={field}
        as={TextareaAutosize}
        value={value}
        minRows={2}
        spellCheck={false}
        onKeyDown={handleFieldKeyDown}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
      />
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      {/* <button
      type = 'submit'
        className='save-btn'
        style={{marginTop : '8px'}}
        onMouseOver={handleControlMouseOver}
        onMouseOut={handleControlMouseOut}
      >Save</button> */}
    </Form>
    </Popup.Content>
    </>
  );
});

NameEdit.propTypes = {
  // children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default React.memo(withPopup(NameEdit));
