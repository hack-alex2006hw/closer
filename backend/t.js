/* SMS testing */

var s = require(__dirname + "/sms.js");

var phoneNumber = "1-xxx-xxx-xxxx";
var smsMessage = "Welcome to closer.pointlook.com";

s.sendMessage(phoneNumber, smsMessage);
