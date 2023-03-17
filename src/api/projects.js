import http from './http';
import socket from './socket';

/* Transformers */

const transformProject = (project) => ({
  ...project,
  ...(project.dueDate && {
    dueDate: new Date(project.dueDate),
  }),
});

/* Actions */

const getProjects = (headers) => socket.get('/projects', undefined, headers).then((body) => {
  return ({
    ...body,
    items: body.items.map(transformProject),
    included: {
      ...body.included,
    },
  });
});

const createProject = (data, headers) => socket.post('/projects', data, headers);

const updateProject = (id, data, headers) => socket.patch(`/projects/${id}`, data, headers);

const updateProjectBackgroundImage = (id, data, headers) =>
  http.post(`/projects/${id}/background-image`, data, headers);

const deleteProject = (id, headers) => socket.delete(`/projects/${id}`, undefined, headers);

export default {
  getProjects,
  createProject,
  updateProject,
  updateProjectBackgroundImage,
  deleteProject,
};
