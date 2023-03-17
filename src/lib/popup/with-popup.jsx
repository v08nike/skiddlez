import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import classNames from 'classnames'

// import styles from './Popup.module.css';

export default (WrappedComponent, defaultProps) => {
  const Popup = React.memo(({ children, theme, id, ...props}) => {
    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = useCallback(() => {
      setIsOpened(true);
    }, []);

    const handleClose = useCallback(() => {
      setIsOpened(false);
    }, []);

    const handleMouseDown = useCallback((event) => {
      event.stopPropagation();
    }, []);

    const handleClick = useCallback((event) => {
      event.stopPropagation();
    }, []);

    const handleTriggerClick = useCallback(
      (event) => {
        event.stopPropagation();

        const { onClick } = children;

        if (onClick) {
          onClick(event);
        }
      },
      [children],
    );

    const tigger = React.cloneElement(children, {
      onClick: handleTriggerClick,
    });

    return (
      <Modal
        trigger={tigger}
        // id = {id}
        on="click"
        open={isOpened}
        poppermodifiers={[
          {
            name: 'preventOverflow',
            options: {
              boundariesElement: 'window',
            },
          },
        ]}
        className={classNames("popup-modal", theme, id)}
        onOpen={handleOpen}
        onClose={handleClose}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        {...defaultProps} // eslint-disable-line react/jsx-props-no-spreading
      >
        <Button icon="close" onClick={handleClose} 
        // className={styles.closeButton}
        className='custom_pop_close_btn'
         />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <WrappedComponent {...props} onClose={handleClose} />
      </Modal>
    );
  });

  Popup.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.string.isRequired,
    id: PropTypes.string
  };

  Popup.defaultProps = {
    id: ""
  };

  const mapStateToProps = (state) => ({
    theme : state.theme.theme
  })

  return connect(mapStateToProps)(Popup);
};
