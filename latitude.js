var request = require('request');

request('http://open-notify-api.herokuapp.com/iss-now.json', function (error, response, body) {
    
  if (!error && response.statusCode === 200) {
    var theResult = JSON.parse(body);
    
    var documents = theResult.iss_position;
//    console.log(typeof(documents));
    console.log(documents.latitude);
    console.log(documents.longitude);

  }  
});


