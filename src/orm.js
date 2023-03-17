import { ORM } from 'redux-orm';

import {
  Action,
  Attachment,
  Board,
  Card,
  Label,
  List,
  Notification,
  Project,
  ProjectMembership,
  Task,
  User,
  Role,
} from './models';

const orm = new ORM({
  stateSelector: (state) => state.orm,
});

orm.register(
  User,
  Role,
  Project,
  ProjectMembership,
  Board,
  Label,
  List,
  Card,
  Task,
  Attachment,
  Action,
  Notification,
);

export default orm;
