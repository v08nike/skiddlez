import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authenticate, authenticateGoogle, clearAuthenticateError } from '../actions/entry';
import Login from '../components/Login';
import { loadTheme, setDarkTheme, setLightTheme } from '../actions/theme';

const mapStateToProps = ({ authenticateForm: { data: defaultData, isSubmitting, error }, theme : {theme} }) => ({
  defaultData,
  isSubmitting,
  error,
  theme
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onAuthenticate: authenticate,
      onMessageDismiss: clearAuthenticateError,
      onAuthenticateGoogle: authenticateGoogle,
      loadUI : loadTheme,
      setLightUI: setLightTheme,
      setDarkUI: setDarkTheme
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
