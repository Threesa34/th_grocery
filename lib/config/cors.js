var cors = require('cors');
var originsWhitelist = [
    'http://localhost:4200',      //this is my front-end url for development
    'http://localhost:4400',      //this is my front-end url for development
    'http://localhost:8100',      //this is my front-end url for development
  ];

  module.exports = {
  corsOptions : {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }
};
  //here is the magi