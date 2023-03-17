import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import GoogleLogin from 'react-google-login';
import { useDidUpdate, usePrevious, useToggle } from '../../lib/hooks';
import { isUsername } from '../../utils/validator';
import Paths from '../../constants/Paths';

let clientsId = '';
// let titleId = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    clientsId = process.env.REACT_APP_DEV_GOOGLE_CLIENT_ID;
    // titleId = process.env.REACT_APP_DEV_TITLE;
} else {
    // production code
    clientsId = process.env.REACT_APP_PROD_GOOGLE_CLIENT_ID;
    // titleId = process.env.REACT_APP_PROD_TITLE;
}

const hostedDomain = process.env.REACT_APP_GOOGLE_OAUTH_HOSTED_DOMAIN;

const createMessage = (error) => {
  if (!error) {
    return error;
  }

  switch (error.message) {
    case 'Invalid email or username':
      return {
        type: 'error',
        content: 'common.invalidEmailOrUsername',
      };
    case 'Invalid password':
      return {
        type: 'error',
        content: 'common.invalidPassword',
      };
    case 'Failed to fetch':
      return {
        type: 'warning',
        content: 'common.noInternetConnection',
      };
    case 'Network request failed':
      return {
        type: 'warning',
        content: 'common.serverConnectionFailed',
      };
    case 'Invalid activated':
      return {
        type: 'warning',
        content: 'common.InvalidAactivated',
      };
    default:
      return {
        type: 'warning',
        content: 'common.unknownError',
      };
  }
};

const Login = React.memo(
  ({ defaultData, isSubmitting, error, onAuthenticate, onMessageDismiss, onAuthenticateGoogle }) => {
    const [t] = useTranslation();
    const wasSubmitting = usePrevious(isSubmitting);

    const [data, setData] = useState({
      emailOrUsername : "",
      password : "",
      ...defaultData
    });

    const message = useMemo(() => createMessage(error), [error]);
    const [focusPasswordFieldState, focusPasswordField] = useToggle();

    const emailOrUsernameField = useRef(null);
    const passwordField = useRef(null);


    const handleFieldChange = (e) => {
      setData(prevData => ({
        ...prevData,
        [e.target.name] : e.target.value
      }))
    }
    const handleSubmit = (e) => {
      e.preventDefault();

      const cleanData = {
        ...data,
        emailOrUsername: data.emailOrUsername.trim(),
      };

      if (!isEmail(cleanData.emailOrUsername) && !isUsername(cleanData.emailOrUsername)) {
        emailOrUsernameField.current.select();
        return;
      }

      if (!cleanData.password) {
        passwordField.current.focus();
        return;
      }

      onAuthenticate(cleanData);
    }

    useEffect(() => {
      emailOrUsernameField.current.select();
    }, []);

    useEffect(() => {
      if (wasSubmitting && !isSubmitting && error) {
        switch (error.message) {
          case 'Invalid email or username':
            emailOrUsernameField.current.select();

            break;
          case 'Invalid password':
            setData((prevData) => ({
              ...prevData,
              password: '',
            }));
            focusPasswordField();

            break;
          default:
        }
      }
    }, [isSubmitting, wasSubmitting, error, setData, focusPasswordField]);

    useDidUpdate(() => {
      passwordField.current.focus();
    }, [focusPasswordFieldState]);

    const responseGoogle = useCallback((callback) => {
      const tokenId = callback?.tokenId
      onAuthenticateGoogle({tokenId});
    }, [onAuthenticateGoogle]);

    return (
      <div className = 'bg-dark'>
      <div className = "auth-container">
        <div className = "auth-box">
          {/* <button className = "theme-button" type = "button" onClick = {theme === 'bg-light' ? setDarkUI : setLightUI}>
            {theme === 'bg-light' ? <span><i className="fas fa-sun"/></span> : <span><i className="fas fa-moon"/></span>}
          </button> */}
          <h1>Skiddlez</h1>
          <h3>Login To Skiddlez</h3>
          {message && (
            <Message
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...{
                [message.type]: true,
              }}
              visible
              content={t(message.content)}
              onDismiss={onMessageDismiss}
            />
          )}
          {hostedDomain &&
          <>
            <GoogleLogin
              hostedDomain={hostedDomain}
              clientId={clientsId}
              onSuccess={responseGoogle}
              render={renderProps => (
                <button className = "glass-btn" type = "button" onClick = {renderProps.onClick}><img src = "/Assets/Images/google-icon.png" alt = "" />Login with Google<span/><span/><span/><span/></button>
                )}
            />
            <small>{hostedDomain}</small>
          </>
          }
          {!hostedDomain &&
            <GoogleLogin
              clientId={clientsId}
              onSuccess={responseGoogle}
              render={renderProps => (
                <button className = "glass-btn" type = "button" onClick = {renderProps.onClick}><img src = "/Assets/Images/google-icon.png" alt = "" />Login with Google<span/><span/><span/><span/></button>
                )}
            />
          }

          <span className = "auth-partition">OR</span>
          <form onSubmit = {(e) => handleSubmit(e)}>
            <div className = "auth-inputs">
            <i className="far fa-envelope" />
              <input
                ref={emailOrUsernameField}
                name="emailOrUsername"
                value={data.emailOrUsername}
                readOnly={isSubmitting}
                onChange={(e) => handleFieldChange(e)}
                placeholder = "Email or Username"
              />
            </div>
            <div className = "auth-inputs" style ={{marginBottom : "0px"}}>
            <i className="fas fa-lock"/>
              <input
                ref={passwordField}
                type = "password"
                name="password"
                value={data.password}
                readOnly={isSubmitting}
                onChange={(e) => handleFieldChange(e)}
                placeholder = "Password"
              />
            </div>
              <div style = {{textAlign : "right", marginTop : "4px", marginBottom : '16px'}}><em>Forgot Password?</em></div>
            <button className = "glass-btn auth-btn" type = "submit">LOGIN<span/><span/><span/><span/></button>
          </form>
          <p>Don&apos;t you have account? <Link to={Paths.REGISTER}>Sign Up</Link></p>
        </div>
      </div>
      </div>
    );
  },
);

Login.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isSubmitting: PropTypes.bool.isRequired,
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onAuthenticate: PropTypes.func.isRequired,
  onMessageDismiss: PropTypes.func.isRequired,
  onAuthenticateGoogle: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  loadUI: PropTypes.func.isRequired,
  setLightUI: PropTypes.func.isRequired,
  setDarkUI: PropTypes.func.isRequired
};

Login.defaultProps = {
  error: undefined,
};

export default Login;
