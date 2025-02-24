const allRoles = {
  user: ['getUsers', 'manageUsers', 'createTasks', 'deleteTasks', 'manageTasks','getTasks'], 
  admin: ['getUsers', 'manageUsers', 'createTasks', 'deleteTasks', 'manageTasks','getTasks'],
};


const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
