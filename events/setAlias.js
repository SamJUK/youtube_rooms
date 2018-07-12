module.exports = (uid, alias) => {
  console.log(`Set Alias | UID: ${uid} | Alias: ${alias}`);
  if(!alias) return;

  // TODO: validate and stuff
  users[uid].alias = alias;
  users[uid].socket.emit( 'cl_set_alias', alias );
};
