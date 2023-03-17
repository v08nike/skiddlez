import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Popup } from '../../lib/custom-ui';
import { withPopup } from '../../lib/popup';

const NameEdit = React.memo(({defaultValue, onUpdate, onClose}) => {
  const [cardName, setCardName] = useState(defaultValue);
  const name = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    const cleanData = cardName.trim();
    if(cleanData !== defaultValue) {
      onUpdate(cleanData);
      onClose();
    }
  };

  useEffect(() => {
    name.current.focus();
  }, [])

  return (
    <>
    <Popup.Header>
      Edit Title
    </Popup.Header>
    <Popup.Content>
      <form onSubmit={(e) => submit(e)}>
        <textarea 
          name = 'name'
          ref = {name}
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />  
        <button type='submit' className='glass-btn save'>
       Save
        <span/><span/><span/><span/></button>   
      </form>
    </Popup.Content>
    </>
  );
});

NameEdit.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withPopup(NameEdit);
