import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Paths from "../constants/Paths";
import HomeContainer from "../containers/HomeContainer";
import LoginContainer from "../containers/LoginContainer";
import RegisterContainer from "../containers/RegisterContainer";
import VerifyContainer from "../containers/VerifyContainer";
import CoreWrapperContainer from "../containers/CoreWrapperContainer";
import WrapContainer from "../containers/WrapContainer";
import NotFound from "./NotFound";

import ThemeProvider from "../theme";
import "react-datepicker/dist/react-datepicker.css";
import "../lib/custom-ui/styles.css";

// import 'mapbox-gl/dist/mapbox-gl.css';

// editor
// import 'react-quill/dist/quill.snow.css';

// slick-carousel
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import "../styles.module.scss";
// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import "react-lazy-load-image-component/src/effects/black-and-white.css";

const Root = ({ store, history }) => (
  <Provider store={store}>
    <ThemeProvider>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={Paths.DEFAULT} component={HomeContainer} />
          <Route path={Paths.ROOT} component={WrapContainer}>
            <WrapContainer>
              <Switch>
                <Route
                  exact
                  path={Paths.REGISTER}
                  component={RegisterContainer}
                />
                <Route exact path={Paths.LOGIN} component={LoginContainer} />
                <Route exact path={Paths.VERIFY} component={VerifyContainer} />
                <Route
                  exact
                  path={Paths.ROOT}
                  component={CoreWrapperContainer}
                />
                <Route
                  exact
                  path={Paths.USERSLIST}
                  component={CoreWrapperContainer}
                />
                <Route
                  exact
                  path={Paths.PROJECTS}
                  component={CoreWrapperContainer}
                />
                <Route
                  exact
                  path={Paths.BOARDS}
                  component={CoreWrapperContainer}
                />
                <Route
                  exact
                  path={Paths.CARDS}
                  component={CoreWrapperContainer}
                />
                <Route
                  exact
                  path={Paths.DASHBOARD}
                  component={CoreWrapperContainer}
                />
                <Route path="*" component={NotFound} />
              </Switch>
            </WrapContainer>
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

Root.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
};

export default Root;
