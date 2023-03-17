import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// import styles from './NameEdit.module.scss';

const ProjectNameEdit = React.forwardRef(({ children, defaultValue, onUpdate, id }, ref) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState(defaultValue);

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

    if (cleanValue && cleanValue !== defaultValue) {
      onUpdate(id, {name: cleanValue});
    }

    close();
  }, [defaultValue, onUpdate, value, close, id]);

  useImperativeHandle(
    ref,
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  const handleFieldClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const handleFieldKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case 'Enter':
          event.preventDefault();

          submit();

          break;
        case 'Escape':
          submit();

          break;
        default:
      }
    },
    [submit],
  );

  const handleFieldBlur = useCallback(() => {
    submit();
  }, [submit]);

  useEffect(() => {
    if (isOpened) {
      field.current.focus();
    }
  }, [isOpened]);

  if (!isOpened) {
    return children;
  }

  return (
    <input
      ref={field}
      value={value}
      onClick={handleFieldClick}
      onKeyDown={handleFieldKeyDown}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleFieldBlur}
    />
  );
});

ProjectNameEdit.propTypes = {
  children: PropTypes.element.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default React.memo(ProjectNameEdit);
