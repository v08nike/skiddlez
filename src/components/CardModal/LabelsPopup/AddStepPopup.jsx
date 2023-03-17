import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import globalStyles from '../../../styles.module.scss';
// import { Button, Form } from 'semantic-ui-react';
import { Popup } from '../../../lib/custom-ui';
// import { withPopup } from '../../../lib/popup';

import { useForm } from '../../../hooks';
import LabelColors from '../../../constants/LabelColors';
import Editor from './Editor';

// import styles from './AddStep.module.scss';

const AddStep = React.memo(({ onCreate, setShowModel, allLabels }) => {
  const [t] = useTranslation();

  const [data, handleFieldChange] = useForm(() => ({
    name: '',
    color: LabelColors[0],
  }));

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const cleanData = {
      ...data,
      name: data.name.trim() || null,
    };

    onCreate(cleanData);
    setShowModel(null)
  }, [data, onCreate, setShowModel]);

  return (
    <>
      <Popup.Header>
        {t('common.createLabel', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
      {(allLabels && allLabels.length > 0) && (
        <ul className='label-list-in-create-label-container'>        
          { allLabels.map(v =>
            <li
            className={
              classNames(globalStyles[`background${upperFirst(camelCase(v.color))}`],)
              }        
            >{v.name}
            </li>
          )}
        </ul>
      )}
        <form onSubmit={(e) => handleSubmit(e)} className='labels-button'>
          <Editor data={data} onFieldChange={handleFieldChange} />
          <button type='submit' className='glass-btn save'>Save<span/><span/><span/><span/></button>
        </form>
      </Popup.Content>
    </>
  );
});

AddStep.propTypes = {
  onCreate: PropTypes.func.isRequired,
  setShowModel : PropTypes.func.isRequired,
  allLabels: PropTypes.instanceOf(Array).isRequired
};

export default AddStep;
