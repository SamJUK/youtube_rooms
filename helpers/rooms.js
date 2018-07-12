module.exports = {

  getRoomsListHTML: function(){
    let ejs = require('ejs');
    let fs = require('fs');
    let template = fs.readFileSync(
      BASE_PATH + '/public/views/partials/rooms/list.ejs',
      'ascii'
    );
    return ejs.render( template, {locals: { rooms: rooms }});;
  }

};
