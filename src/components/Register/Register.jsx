import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import { useDidUpdate, usePrevious, useToggle } from '../../lib/hooks';
import Paths from '../../constants/Paths';

const createMessage = (error) => {
  if (!error) {
    return error;
  }

  switch (error.message) {
    case 'Invalid email':
      return {
        type: 'error',
        content: 'common.valid.email',
      };
    case 'Already email':
      return {
        type: 'error',
        content: 'common.emailAlreadyInUse',
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
    case 'No match 2 password':
      return {
        type: 'warning',
        content: 'common.invalidPasswordMatch',
      };
    default:
      return {
        type: 'warning',
        content: 'common.unknownError',
      }; 
  }
};

const Register = React.memo(
  ({ defaultData, isSubmitting, error, onRegister, onMessageDismiss, onMessage, status, }) => {
    const [t] = useTranslation();
    const wasSubmitting = usePrevious(isSubmitting);

    const [data, setData] = useState({
      name : "",
      username : "",
      email : "",
      password : "",
      passwordConfirm : "",
      phoneNumber : "",
      ...defaultData
    });

    const message = useMemo(() => createMessage(error), [error]);
    const [focusPasswordFieldState, focusPasswordField] = useToggle();

    const nameField = useRef(null);
    const usernameField = useRef(null);
    const emailField = useRef(null);
    const passwordField = useRef(null);
    const passwordConfirmField = useRef(null);
    const phoneNumberField = useRef(null);


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
        name: data.name.trim(),
        email: data.email.trim(),
      };
      onMessageDismiss();
      if (!cleanData.name) {
        nameField.current.select();
        return;
      }
      if (!cleanData.phoneNumber) {
        phoneNumberField.current.select();
        return;
      }
      
      if (!cleanData.email) {
        emailField.current.select();
        return;
      }
      if (!isEmail(cleanData.email)) {
        emailField.current.select();
        onMessage('Invalid email');
        return;
      }

      if (!cleanData.password) {
        passwordField.current.focus();
        return;
      }
      if (cleanData.password !== cleanData.passwordConfirm) {
        passwordField.current.focus();
        onMessage('No match 2 password');
        return;
      }

      onRegister(cleanData);
    }

    useEffect(() => {
      // emailOrUsernameField.current.select();
    }, []);

    useEffect(() => {
      if (wasSubmitting && !isSubmitting && error) {
        switch (error.message) {
          case 'Invalid email or username':
            emailField.current.select();

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
      if (!status)
        passwordField.current.focus();
    }, [focusPasswordFieldState, status]);

    return (
      <div className = 'bg-dark'>
      <div className = "auth-container">
        <div className = "auth-box">
          {/* <button className = "theme-button" type = "button" onClick = {theme === 'bg-light' ? setDarkUI : setLightUI}>
            {theme === 'bg-light' ? <span><i className="fas fa-sun"/></span> : <span><i className="fas fa-moon"/></span>}
          </button> */}
          <h1>Skiddlez</h1>
          <h3> Register in to Skiddlez </h3>
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
          <form onSubmit = {(e) => handleSubmit(e)}>
            <div className = "auth-inputs">
            <i className="fas fa-id-card-alt"/>
              <input 
                ref={nameField}
                name="name"
                value={data.name}
                readOnly={isSubmitting}
                onChange={(e) => handleFieldChange(e)}
                placeholder = "Name(optional)"
              />
            </div>
            <div className = "auth-inputs">
            <i className="fas fa-user-alt"/>
              <input 
                ref={usernameField}
                name="username"
                value={data.username}
                readOnly={isSubmitting}
                onChange={(e) => handleFieldChange(e)}
                placeholder = "Username"
              />
            </div>
            <div className = "auth-inputs">
            <i className="fas fa-phone-alt"/>
              <input 
                ref={phoneNumberField}
                name="phoneNumber"
                value={data.phoneNumber}
                readOnly={isSubmitting}
                onChange={(e) => handleFieldChange(e)}
                placeholder = "Phone Number"
              />
            </div>
            <div className = "auth-inputs">
            <i className="far fa-envelope" />
              <input 
                ref={emailField}
                name="email"
                value={data.email}
                readOnly={isSubmitting}
                onChange={(e) => handleFieldChange(e)}
                placeholder = "E-mail"
              />
            </div>
            <div className = "auth-inputs">
            <i className="fas fa-lock"/>
              <input 
                ref={passwordField}
                name="password"
                value={data.password}
                readOnly={isSubmitting}
                type = "password"
                onChange={(e) => handleFieldChange(e)}
                placeholder = "Password"
              />
            </div>
            <div className = "auth-inputs">
            <i className="fas fa-lock"/>
              <input 
                ref={passwordConfirmField}
                name="passwordConfirm"
                value={data.passwordConfirm}
                readOnly={isSubmitting}
                type = "password"
                onChange={(e) => handleFieldChange(e)}
                placeholder = "Confirm Password"
              />
            </div>
            <button className = "glass-btn auth-btn" type = "submit">SUBMIT<span/><span/><span/><span/></button>
          </form>
          <p>Already have an account? <Link to={Paths.LOGIN}>Login</Link></p>
        </div>
      </div>
      </div>
    );
  },
);

Register.propTypes = {
  defaultData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isSubmitting: PropTypes.bool.isRequired,
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onRegister: PropTypes.func.isRequired,
  onMessageDismiss: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  loadUI: PropTypes.func.isRequired,
  setLightUI: PropTypes.func.isRequired,
  setDarkUI: PropTypes.func.isRequired
};

Register.defaultProps = {
  error: undefined,
};

export default Register;