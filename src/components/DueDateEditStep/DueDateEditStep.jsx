import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import { Form } from 'semantic-ui-react';
import { useDidUpdate, useToggle } from '../../lib/hooks';
import { Input, Popup } from '../../lib/custom-ui';

import { useForm } from '../../hooks';

import styles from './DueDateEditStep.module.scss';

const DueDateEditStep = React.memo(({ defaultValue, onUpdate, onBack, onClose }) => {
  const [t] = useTranslation();

  const [data, handleFieldChange, setData] = useForm(() => {
    const date = defaultValue || new Date().setHours(12, 0, 0, 0);

    return {
      date: t('format:date', {
        postProcess: 'formatDate',
        value: date,
      }),
      time: t('format:time', {
        postProcess: 'formatDate',
        value: date,
      }),
    };
  });

  const [selectTimeFieldState, selectTimeField] = useToggle();

  const dateField = useRef(null);
  const timeField = useRef(null);

  const nullableDate = useMemo(() => {
    const date = t('format:date', {
      postProcess: 'parseDate',
      value: data.date,
    });

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  }, [data.date, t]);

  const handleDatePickerChange = useCallback(
    (date) => {
      setData((prevData) => ({
        ...prevData,
        date: t('format:date', {
          postProcess: 'formatDate',
          value: date,
        }),
      }));
      selectTimeField();
    },
    [setData, selectTimeField, t],
  );

  const handleSubmit = useCallback(() => {
    if (!nullableDate) {
      dateField.current.select();
      return;
    }

    const value = t('format:dateTime', {
      postProcess: 'parseDate',
      value: `${data.date} ${data.time}`,
    });

    if (Number.isNaN(value.getTime())) {
      timeField.current.select();
      return;
    }

    if (!defaultValue || value.getTime() !== defaultValue.getTime()) {
      onUpdate(value);
    }

    onClose();
  }, [defaultValue, onUpdate, onClose, data, nullableDate, t]);

  const handleClearClick = useCallback(() => {
    if (defaultValue) {
      onUpdate(null);
    }

    onClose();
  }, [defaultValue, onUpdate, onClose]);

  useEffect(() => {
    dateField.current.select();
  }, []);

  useDidUpdate(() => {
    timeField.current.select();
  }, [selectTimeFieldState]);

  return (
    <>
      <Popup.Header onBack={onBack}>
        {t('common.editDueDate', {
          context: 'title',
        })}
      </Popup.Header>
      <Popup.Content>
        <Form onSubmit={handleSubmit}>
          <div className={styles.fieldWrapper}>
            <div className={styles.fieldBox}>
              <h4 style={{fontSize : '12px', fontWeight : '500', marginBottom : '4px'}}>{t('common.date')}</h4>
              <Input ref={dateField} name="date" value={data.date} onChange={handleFieldChange} />
            </div>
            <div className={styles.fieldBox}>
              <h4 style={{fontSize : '12px', fontWeight : '500', marginBottom : '4px'}}>{t('common.time')}</h4>
              <Input ref={timeField} name="time" value={data.time} onChange={handleFieldChange} />
            </div>
          </div>
          <DatePicker
                minDate={new Date()}
            inline
            disabledKeyboardNavigation
            selected={nullableDate}
            onChange={handleDatePickerChange}
          />
          <button className='glass-btn save' type='submit'>
         Save
          <span/><span/><span/><span/></button>
        </Form>
        <button
        type='button'
        className='glass-btn danger'
        style={{marginTop : "8px"}}
          onClick={handleClearClick}
        >Remove<span/><span/><span/><span/></button>
      </Popup.Content>
    </>
  ); 
});

DueDateEditStep.propTypes = {
  defaultValue: PropTypes.instanceOf(Date),
  onUpdate: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};

DueDateEditStep.defaultProps = {
  defaultValue: undefined,
  onBack: undefined,
};

export default DueDateEditStep;
