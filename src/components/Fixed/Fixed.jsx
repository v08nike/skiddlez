import React from 'react';
import PropTypes from 'prop-types';

import HeaderContainer from '../../containers/HeaderContainer';
// import ProjectContainer from '../../containers/ProjectContainer';

const Fixed = ({  sidebar, setSidebar }) => {
  return (
    <>
      <HeaderContainer sidebar = {sidebar} setSidebar = {setSidebar} />
      {/* {projectId && <ProjectContainer />} */}
    </>
  )
}

Fixed.propTypes = {
  // projectId: PropTypes.string,
  sidebar : PropTypes.bool,
  setSidebar : PropTypes.func
};

Fixed.defaultProps = {
  // projectId: undefined,
  sidebar : false, 
  setSidebar : () => {}
};


export default Fixed;
