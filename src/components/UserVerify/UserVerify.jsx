import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Message, Icon } from 'semantic-ui-react';
import styles from './UserVerify.module.scss';

const UserVerify = React.memo(
  ({ error, token, onUserVerify }) => {    
    
    useEffect(() => {
      onUserVerify({token});      
      console.log('mounted', token);
    }, [token, onUserVerify]);

    return (
      <div className="h-100">
        
        <Grid verticalAlign="middle" className="h-100 bg-white">
          <Grid.Column tablet={16} mobile={16}>
            <Grid verticalAlign="middle" className="h-100">
              <Grid.Column>
                <div className={styles.loginWrapper}>
                  <Header
                    as="h1"
                    textAlign="center"
                    content="Verifying your link..."
                    className="mb-2"
                  />  
                  {!!error && <Message 
                    warning
                    content={error?.message}
                  />}
                  <div className="text-center mt-3">
                    <Icon.Group size="huge">
                      <Icon loading size="big" name="circle notch" />
                      <Icon name="user" />
                    </Icon.Group>
                    {!!error &&
                    <p className="mt-2">Please wait. We are verifying your account</p>}
                  </div>                
                </div>
              </Grid.Column>
            </Grid>
          </Grid.Column>          
        </Grid>
      </div>
    );
  },
);

UserVerify.propTypes = {
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  token: PropTypes.string.isRequired, 
  onUserVerify: PropTypes.func.isRequired, 
};

UserVerify.defaultProps = {
  error: undefined,
};

export default UserVerify;
