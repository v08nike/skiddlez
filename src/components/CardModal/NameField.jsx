import React, { useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { Popup } from 'semantic-ui-react';
import { withPopup } from '../../lib/popup';

// import { useField } from '../../hooks';

// import styles from './NameField.module.scss';

const NameField = React.memo(({ defaultValue, onUpdate }) => {
  const [value, setValue] = useState(defaultValue);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }, []);

  const handleSubmit= useCallback((e) => {
    e.preventDefault();
    const cleanValue = value.trim();

    if (cleanValue) {
      if (cleanValue !== defaultValue) {
        onUpdate(cleanValue);
      }
    } else {
      setValue(defaultValue);
    }
  }, [defaultValue, onUpdate, value, setValue]);

  return (
    <>
      <Popup.Header>
        Edit Title
      </Popup.Header>
      <Popup.Content>
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
          as={TextareaAutosize}
          value={value}
          spellCheck={false}
          onKeyDown={handleKeyDown}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type='submit' className='glass-btn save'>
       Save
        <span/><span/><span/><span/></button>
        </form>
      </Popup.Content>
    </>
  );
});

NameField.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default withPopup(NameField);
