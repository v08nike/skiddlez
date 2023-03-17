import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { Popup } from 'semantic-ui-react';
import { withPopup } from '../../lib/popup';

// import { useField } from '../../hooks';

// import styles from './DescriptionEdit.module.scss';

const DescriptionEdit = React.memo(({ defaultValue, onUpdate }) => {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const cleanValue = value.trim() || null;
    if (cleanValue !== defaultValue) {
      onUpdate(cleanValue);
    }
    setValue(null)

  }, [defaultValue, onUpdate, value, setValue]);

  const handleFieldKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'Enter') {
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  return (
    <>
    <Popup.Header>
      {defaultValue && defaultValue.length > 0 ? "Edit description" : "Add description"}
    </Popup.Header>
    <Popup.Content>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          as={TextareaAutosize}
          value={value}
          placeholder="Enter description"
          minRows={3}
          spellCheck={false}
          onKeyDown={handleFieldKeyDown}
          onChange={(e) => setValue(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        <button
        type = 'submit'
        className='glass-btn save'
        >
       Save
        <span/><span/><span/><span/></button>
      </form>
    </Popup.Content>
    </>
  );
});

DescriptionEdit.propTypes = {
  // children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
};

DescriptionEdit.defaultProps = {
  defaultValue: undefined,
};

export default withPopup(DescriptionEdit);
