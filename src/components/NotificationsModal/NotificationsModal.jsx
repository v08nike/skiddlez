import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { useTranslation } from 'react-i18next';
import { Modal, Menu, Icon } from "semantic-ui-react";
import NotificationsPopup from "../Header/NotificationsPopup";
import styles from "../Header/Header.module.scss";

const NotificationsModal = React.memo(
  ({ theme, notifications, onNotificationDelete, onClose }) => {
    return (
      <Modal open onClose={onClose} className={classNames(theme)}>
        <div className="notifications_container">
          <div className="user_notification">
            <h3>Notifications</h3>
          </div>
          <div className="notification_content">
            <h4>
              {notifications.length > 0
                ? "show data"
                : "No unread notifications"}
            </h4>
          </div>
        </div>

        {notifications.length > 0 && (
          <NotificationsPopup
            items={notifications}
            onDelete={onNotificationDelete}
          >
            <Menu.Item className={styles.item}>
              <Icon fitted name="bell" />
              {notifications.length > 0 && (
                <span className={styles.notification}>
                  {notifications.length}
                </span>
              )}
            </Menu.Item>
          </NotificationsPopup>
        )}
      </Modal>
    );
  }
);

NotificationsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  notifications: PropTypes.func.isRequired,
  onNotificationDelete: PropTypes.func.isRequired,
  theme: PropTypes.func.isRequired,
};

export default NotificationsModal;
