exports = async function createNewUserDocument({ user }) {
  const cluster = context.services.get('mongodb-atlas');
  const users = cluster.db('ledesma').collection('User');
  return users.insertOne({
    _id: user.id,
    _partition: `user=${user.id}`,
    name: user.data.email,
    canReadPartitions: [`user=${user.id}`, 'project=ledesma'],
    canWritePartitions: ['project=ledesma'],
    memberOf: [{ name: 'ledesma', partition: 'project=ledesma' }],
  });
};
