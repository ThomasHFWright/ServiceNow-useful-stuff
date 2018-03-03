//-------------------------------------------------------------------------------------------
//JSON scripts!
//Client side - http://prototypejs.org/learn/json
var cars = ["Saab", "Volvo", "BMW"];
var jsonCars = //Object.toJSON(cars);//         <- client-side encode
//need a new encode function?

var cars2 = JSON.parse(jsonCars);   //         <- client-side decode
alert(cars2[1]); // -> "Volvo"

//-------------------------------------------------------------------------------------------
//Server side - https://community.servicenow.com/thread/162118

var user = new GlideRecord('sys_user');
user.get(gs.getUserID());
jsonUser = global.JSON.stringify(user); 					  <- new server-side encode
//jsonUser= new JSON().encode(user);  //        <- JSON().encode has been deprecated for scoped applications
gs.log(jsonUser);
//above doesnt work on GlideRecords- need a special script to convert GlideRecords - http://www.john-james-andersen.com/blog/service-now/converting-gliderecord-to-json-in-servicenow.html

//var user2 = new JSON().decode(jsonUser);//    <- server-side decode
//gs.log(user2.name);
var user2 = global.JSON.parse(jsonUser);					<- new server-side decode




//Script include to convert GlideRecords - can ignore this if not converting a whole gliderecord (which you shouldn't really...)
var JSONG = Class.create();

JSONG.prototype = Object.extendsObject(JSON, {
  encodeGr : function(o) {
    var a = ["{"], b, i, v;

    for (i in o) {
        if(o.hasOwnProperty(i)) {
            v = o[i].toString();

            switch (typeof v) {
                case "undefined":
                case "function":
                case "unknown":
                     break;
                default:
                     if (b) {
                         a.push(',');
                     }
                     a.push(this.encode(i), ":", v === null ? "null" : this.encode(v));
                     b = true;
            }
        }
    }

    a.push("}");
    return a.join("");
  }
});