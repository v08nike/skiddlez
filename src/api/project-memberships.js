import socket from './socket';

/* Actions */

const createProjectMembership = (projectId, data, headers) =>
  socket.post(`/projects/${projectId}/memberships`, data, headers);

const deleteProjectMembership = (id, headers) =>
  socket.delete(`/project-memberships/${id}`, undefined, headers);

const updateProjectMembership = (projectId, data, headers) => {
  return socket.patch(`/projects/${projectId}/memberships`, data, headers);
}

export default {
  createProjectMembership,
  deleteProjectMembership,
  updateProjectMembership,
};
