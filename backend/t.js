/* SMS testing */

var s = require(__dirname + "/sms.js");

var phoneNumber = "14155988551";
var smsMessage = "Welcome to closer.pointlook.com";

s.sendMessage(phoneNumber, smsMessage);
