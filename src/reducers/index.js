import { combineReducers } from 'redux';

import router from './router';
import socket from './socket';
import orm from './orm';
import auth from './auth';
import core from './core';
import authenticateForm from './forms/authenticate';
import registerForm from './forms/register';
import userCreateForm from './forms/user-create';
import projectCreateForm from './forms/project-create';
import sidebar from './sidebar';
import usermodal from './userModal';
import notificationmodal from './notificationModal' 
import theme from './theme';
import zoom from './zoom';
import header from './header';

export default combineReducers({
  router,
  socket,
  orm,
  auth,
  core,
  authenticateForm,
  registerForm,
  userCreateForm,
  projectCreateForm,
  sidebar,
  theme,
  usermodal,
  notificationmodal, 
  zoom,
  header
});
