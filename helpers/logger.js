module.exports = (req, res, next) => {

  let session = req.session.uid;
  let method = req.method;
  let route = req.originalUrl;
  let time = (new Date).getTime();
  
  console.log(`Session: ${session} | Method: ${method} | Route: ${route} | Time: ${time}`);
  next();

};
