
var request = require('request');


var _auth;
var sinchAuth = {};

sinchAuth = function(appKey, secret){
	if (appKey && secret){
		_auth = "Basic " + new Buffer("application\\" + appKey + ":" + secret).toString("base64");
	}

	return _auth;
};

var sinchMessaging = {};

sinchMessaging.sendMessage = function (phoneNumber, message) {
	var auth = sinchAuth();
	if (!auth){
		throw new Error("No Authorization was provided");
	}
    var options = {
        method: 'POST',
        url : "https://messagingApi.sinch.com/v1/sms/" + phoneNumber,
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : auth
        },
        body: "{\"Message\":\"" + message + "\"}"
    };
    var callback = function (error, response, body) {
        if (error) console.log("Error: " + error);
        console.log(body);
    };

    request(
        options,
        callback
    );
};

sinchMessaging.getStatus = function(messageId){
	var auth = sinchAuth();
	if (!auth){
		throw new Error("No Authorization was provided");
	}
    var options = {
        method: 'GET',
        url : "https://messagingApi.sinch.com/v1/sms/" + messageId,
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : auth
        }
    };
    var callback = function (error, response, body) {
        if (error) console.log("Error: " + error);
        console.log(body);
    };

    request(
        options,
        callback
    );
};

module.exports = sinchMessaging;
