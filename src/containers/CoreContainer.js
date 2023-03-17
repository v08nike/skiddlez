import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadTheme } from '../actions/theme';
import {zoomIn,zoomOut} from '../actions/zoom';
import { currentModalSelector, currentProjectSelector } from '../selectors';
import Core from '../components/Core';

const mapStateToProps = (state) => {
  const currentModal = currentModalSelector(state);
  const currentProject = currentProjectSelector(state); 

  return {
    currentModal,
    currentProject,
    theme: state.theme.theme,
    sidebar: state.sidebar.active,
    header: state.header.active
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  loadUI: loadTheme,
  fullscreen : zoomIn,
  windowscreen : zoomOut
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Core);
