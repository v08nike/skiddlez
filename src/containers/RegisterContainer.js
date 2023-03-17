import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { register } from '../actions/entry';
import { clearRegisterError, registerError } from '../actions';
import { loadTheme, setDarkTheme, setLightTheme } from '../actions/theme';
import Register from '../components/Register';

const mapStateToProps = ({ registerForm: { data: defaultData, isSubmitting, error, status }, theme : {theme} }) => ({
  defaultData,
  isSubmitting,
  error,
  status,
  theme
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onRegister: register,
      onMessageDismiss: clearRegisterError,
      onMessage: registerError,
      loadUI: loadTheme,
      setLightUI: setLightTheme,
      setDarkUI: setDarkTheme
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);
