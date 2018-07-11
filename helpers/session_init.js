const userHelper = require('../helpers/user');
module.exports = (req, res, next) => {


  console.log(req.session.uid);

  if(!req.session.uid || !users[req.session.uid]){
    req.session.uid = userHelper.generateUID();
    users[req.session.uid] = {
      socket: null,
      created_at: (new Date()).getTime(),
      updated_at: (new Date()).getTime(),
      alias: null,
      room: null
    };
  }else{
    users[req.session.uid].updated_at = (new Date()).getTime();
  }

  next();

};
