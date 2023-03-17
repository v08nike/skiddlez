import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';
import { Popup } from 'semantic-ui-react';
import { withPopup } from '../../../lib/popup';
// import { useDidUpdate, useToggle } from '../../../lib/hooks';

// import { useForm } from '../../../hooks';

// import styles from './Add.module.scss';

const DEFAULT_DATA = {
  name: '',
};

const Add = React.memo(({ onCreate }) => {
  const [t] = useTranslation();
  const [data, setData] = useState(DEFAULT_DATA);

  const submit = useCallback(() => {
    const cleanData = {
      ...data,
      name: data.name.trim(),
    };

    if (!cleanData.name) {
      return;
    }

    onCreate(cleanData);

    setData(DEFAULT_DATA);
  }, [onCreate, data, setData]);

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

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
    <>
      <Popup.Header>
        Add Task
      </Popup.Header>
      <Popup.Content>
        <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          as={TextareaAutosize}
          name="name"
          value={data.name}
          placeholder={t('common.enterTaskDescription')}
          minRows={2}
          spellCheck={false}
          onKeyDown = {handleFieldKeyDown}
          onChange={(e) => setData({name : e.target.value})}
        />
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
         {/* <button
        className='glass-btn save'
          type = 'submit'
        >Save<span/><span/><span/><span/></button> */}
        </form>
      </Popup.Content>
    </>
  );
});

Add.propTypes = {
  // children: PropTypes.element.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default withPopup(Add);
