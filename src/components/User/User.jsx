import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import initials from 'initials';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './User.module.scss';

const SIZES = {
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  MASSIVE: 'massive',
};

const COLORS = [
  'emerald',
  'peter-river',
  'wisteria',
  'carrot',
  'alizarin',
  'turquoise',
  'midnight-blue',
];

const getColor = (name) => {
  let sum = 0;
  for (let i = 0; i < name.length; i += 1) {
    sum += name.charCodeAt(i);
  }

  return COLORS[sum % COLORS.length];
};

const getUrl=(avatarUrl)=>{
 const url1 = avatarUrl.split("avatars/")
  const url2=url1[1].split("/square")
  return url2[0]
}

const User = React.memo(({ name, avatarUrl, size, isDisabled, onClick }) => {
  let url= null;
  if(avatarUrl) {
    if(avatarUrl.indexOf('https://lh3.googleusercontent.com') !== -1) {
      url = getUrl(avatarUrl);
    } else if(process.env.NODE_ENV === 'development') {
      url = avatarUrl.replace('http://localhost:3000', 'http://localhost:1337');
    } else {
      url = avatarUrl;
    }
  }

  const contentNode = (
    <div className={styles.profileImg}>
    <span
      title={name}
      className={classNames(
        styles.wrapper,
        styles[`wrapper${upperFirst(size)}`],
        onClick && styles.wrapperHoverable,
        !avatarUrl && styles[`background${upperFirst(camelCase(getColor(name)))}`],
      )}
      style={{
        background: avatarUrl && `url("${url}") center / cover`,
      }}
    >
      {!avatarUrl && <span className={styles.initials}>{initials(name)}</span>}
    </span>
    </div>
  );

  return onClick ? (
    <button type="button" disabled={isDisabled} 
    // className={styles.button}
    className='userSettings_profile_edit_btn' 
    onClick={onClick}>
      {contentNode}
    </button>
  ) : (
    contentNode
  );
});

User.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  size: PropTypes.oneOf(Object.values(SIZES)),
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

User.defaultProps = {
  avatarUrl: undefined,
  size: SIZES.MEDIUM,
  isDisabled: false,
  onClick: undefined,
};

export default User;
