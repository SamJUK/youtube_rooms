let time_helper = require('./time');
module.exports = () => {
  // Garbage Collection
  // setInterval(require('./garbage/rooms'), 5 * time_helper.minute);
  setInterval(require('./garbage/rooms'), 30 * time_helper.second);
  // setInterval(require('./garbage/users'), 5 * time_helper.minute);
};
