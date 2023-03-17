import { dequal } from 'dequal';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// // import { useTranslation } from 'react-i18next';
// import TextareaAutosize from 'react-textarea-autosize';
// import { Form, TextArea } from 'semantic-ui-react';

// import { useClosableForm, useForm } from '../../../hooks';

// import styles from './CommentEdit.module.scss';

const CommentEdit = React.forwardRef(({ children, defaultData, onUpdate }, ref) => {
  // const [t] = useTranslation();
  const [isOpened, setIsOpened] = useState(false);
  const [data, setData] = useState(null);

  const textField = useRef(null);

  const open = useCallback(() => {
    setIsOpened(true);
    setData({
      text: '',
      ...defaultData,
    });
  }, [defaultData, setData]);

  const close = useCallback(() => {
    setIsOpened(false);
    setData(null);
  }, [setData]);

  const submit = useCallback(() => {
    const cleanData = {
      ...data,
      text: data.text.trim(),
    };

    if (!cleanData.text) {
      textField.current.ref.current.select();
      return;
    }

    if (!dequal(cleanData, defaultData)) {
      onUpdate(cleanData);
    }

    close();
  }, [defaultData, onUpdate, data, close]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    submit();
  }, [submit]);

  useEffect(() => {
    if (isOpened) {
      textField.current.select();
    }
  }, [isOpened]);

  if (!isOpened) {
    return children;
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <textarea
        ref={textField}
        name="text"
        value={data.text}
        onChange={(e) => setData({text : e.target.value})}
      />
     <button type = 'submit' className='glass-btn save'>
    Save
     <span/><span/><span/><span/></button>
    </form>
  );
});

CommentEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
};

export default React.memo(CommentEdit);
