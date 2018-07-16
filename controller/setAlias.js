module.exports = (req, res) => {
  var uid = req.session.uid;

  // @TODO: VALIDATE VALIDATE VALIDATE
  var alias = req.body.alias;

  console.log(`Set Alias: ${alias} | UID: ${uid}`);

  users[uid].alias = alias;
  users[req.session.uid].updated_at = (new Date()).getTime();
 
  res.redirect(`/rooms`);
};
