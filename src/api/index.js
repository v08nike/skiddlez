import http from './http';
import socket from './socket';
import accessTokens from './access-tokens';
import register from './register';
import users from './users';
import projects from './projects';
import projectMemberships from './project-memberships';
import boards from './boards';
import labels from './labels';
import lists from './lists';
import cards from './cards';
import cardMemberships from './card-memberships';
import cardLabels from './card-labels';
import tasks from './tasks';
import attachments from './attachments';
import actions from './actions';
import commentActions from './comment-actions';
import notifications from './notifications';

export { http, socket };

export default {
  ...accessTokens,
  ...register,
  ...users,
  ...projects,
  ...projectMemberships,
  ...boards,
  ...labels,
  ...lists,
  ...cards,
  ...cardMemberships,
  ...cardLabels,
  ...tasks,
  ...attachments,
  ...actions,
  ...commentActions,
  ...notifications,
};
