var request = require('request');


Number.prototype.toRadians = function() {
  return this * Math.PI / 180;
}

function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}


  var iss_pos = [];
  var user_pos = [];
request('http://open-notify-api.herokuapp.com/iss-now.json', function (error, response, body) {
    
  if (!error && response.statusCode === 200) {
    var theResult = JSON.parse(body);
    
    var documents = theResult.iss_position;
//    console.log(typeof(documents));
 //   console.log(documents.latitude.toFixed(2));
//    console.log(documents.longitude.toFixed(2));
    iss_pos.push(documents.latitude.toFixed(2));
    iss_pos.push(documents.longitude.toFixed(2));

  }
  request('https://maps.googleapis.com/maps/api/geocode/json?address=montreal', function (error, response, body) {
    
  if (!error && response.statusCode === 200) {
    var theResult = JSON.parse(body);
  //  console.log(theResult);
    user_pos.push(theResult.results[0].geometry.location.lat);
    user_pos.push(theResult.results[0].geometry.location.lng);
}
console.log(iss_pos);
console.log(user_pos);
    
 //   var dis = ((iss_pos[0]-user_pos[0])^2+(iss_pos[1]-user_pos[1])^2)^0.5;
    
    
    var R = 6371000; // metres
var φ1 = iss_pos[0]* Math.PI / 180;
var φ2 = user_pos[0]* Math.PI / 180;
var Δφ = (user_pos[0]-iss_pos[0])* Math.PI / 180;
var Δλ = (user_pos[1]-iss_pos[1])* Math.PI / 180;

var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var dis = R * c;
console.log(dis);
    
    
    
    
  });

});


// var prompt = require('prompt');
 
//   prompt.start();
 
//   prompt.get(['location'], function (loc) {

//     console.log('Where are you located?');
//     console.log('  location: ' + loc);
//   });


//var location = prompt.get(loc);
//console.log(loc);


