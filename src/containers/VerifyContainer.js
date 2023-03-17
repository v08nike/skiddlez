import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { verify } from '../actions/entry';
import UserVerify from '../components/UserVerify';

const mapStateToProps = (state) => ({
  error: state.authenticateForm.error,
  token: state.router.location.query.token
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      onUserVerify: verify,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserVerify);
