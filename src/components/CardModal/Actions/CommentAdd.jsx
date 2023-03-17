import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
// import { Form, TextArea } from 'semantic-ui-react';

// import { useForm } from '../../../hooks';

// import styles from './CommentAdd.module.scss';

const DEFAULT_DATA = {
  text: '',
};

const CommentAdd = React.memo(({ onCreate }) => {
  const [t] = useTranslation();
  const [data, setData] = useState(DEFAULT_DATA);

  const textField = useRef(null);

  const submit = useCallback(() => {
    const cleanData = {
      ...data,
      text: data.text.trim(),
    };

    if (!cleanData.text) {
      textField.current.ref.current.select();
      return;
    }

    onCreate(cleanData);

    setData(DEFAULT_DATA);
  }, [onCreate, data, setData]);

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        submit();
      }
    },
    [submit],
  );

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    submit();
  }, [submit]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <textarea
        ref={textField}
        name="text"
        value={data.text}
        placeholder={t('common.writeComment')}
        onKeyDown={handleFieldKeyDown}
        onChange={(e) => setData({text : e.target.value})}
      />
      <button className = "glass-btn save btn-max" type = 'submit' disabled={!data.text}>
     Save
      <span/><span/><span/><span/></button>
    </form>
  );
});

CommentAdd.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default CommentAdd;
