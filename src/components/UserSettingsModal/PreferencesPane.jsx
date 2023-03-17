import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Radio } from 'semantic-ui-react';

// import styles from './PreferencesPane.module.scss';

const PreferencesPane = React.memo(({ subscribeToOwnCards, onUpdate }) => {
  const [t] = useTranslation();

  const handleSubscribeToOwnCardsChange = useCallback(() => {
    onUpdate({
      subscribeToOwnCards: !subscribeToOwnCards,
    });
  }, [subscribeToOwnCards, onUpdate]);

  return (
    <div className='subscribe-pane'>
      <Radio
        toggle
        checked={subscribeToOwnCards}
        label={t('common.subscribeToMyOwnCardsByDefault')}
        onChange={handleSubscribeToOwnCardsChange}
      />
    </div>
  );
});

PreferencesPane.propTypes = {
  subscribeToOwnCards: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PreferencesPane;
