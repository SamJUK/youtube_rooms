module.exports = (uid, alias) => {
  console.log(`Set Alias | Alias: ${alias}`);
  if(!alias) return;

  // TODO: validate and stuff
  users[uid].alias = alias;
  io.emit( 'cl_set_alias', alias );
};
