import { dequal } from 'dequal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import { Form } from 'semantic-ui-react';
import { withPopup } from '../../lib/popup';
import { Popup } from '../../lib/custom-ui';

// import styles from './EditPopup.module.scss';

const EditStep = React.memo(({ defaultData, onUpdate, onClose }) => {

  const [data, setData] = useState({
    name : defaultData.name
  });

  const nameField = useRef(null);

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

    if (!dequal(cleanData, defaultData)) {
      onUpdate(cleanData);
    }

    onClose();
  }, [defaultData, onUpdate, onClose, data]);

  useEffect(() => {
    nameField.current.focus();
  }, []);

  return (
    <>
      <Popup.Header>
        Edit Board
      </Popup.Header>
      <Popup.Content>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* <div className={styles.text}>{t('common.title')}</div> */}
          <input
            ref={nameField}
            name="name"
            value={data.name}
            onChange={(e) => setData({name : e.target.value})}
          />
          {/* <button style={{marginTop : "8px"}} type='submit' className='glass-btn save'>Save
       
          <span/><span/><span/><span/></button> */}
        </form>
      </Popup.Content>
    </>
  );
});

EditStep.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withPopup(EditStep);
