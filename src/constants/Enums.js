export const ProjectBackgroundTypes = {
  GRADIENT: 'gradient',
  IMAGE: 'image',
};

export const BoardTypes = {
  KANBAN: 'kanban',
};

export const ActionTypes = {
  CREATE_CARD: 'createCard',
  MOVE_CARD: 'moveCard',
  COMMENT_CARD: 'commentCard',
};

export const Roles = {
  /*
  SUPER_USER: 'super_user',
  DOMAIN_SUPER_USER: 'domain_super_user',
  MANAGER: 'manager',
  DEVELOPER: 'developer',
  WATCHER: 'watcher',
  */
  SUPER_USER: 1,
  DOMAIN_SUPER_USER: 2,
  MANAGER: 3,
  DEVELOPER: 4,
  WATCHER: 5,
};

export const Statuses = {
  ACTIVE: 1,
  INACTIVE: 2,
  ARCHIVED: 3,
};

export const CardStatuses = {
  OPEN: 1,
  IN_REVIEW: 2,
  CLOSED: 3,
  OTHER: 4,
};

export const ProjectDueDateFilter = {
  ALL: 1,
  FAVORITED: 2,
}

export const CardDueDateFilter = {
  ...ProjectDueDateFilter,
  ASSIGNED: 3,
}
