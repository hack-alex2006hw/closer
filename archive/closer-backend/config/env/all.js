// Strict mode makes several changes to normal JavaScript 
// semantics. First, strict mode eliminates some JavaScript 
// silent errors by changing them to throw errors. Second, 
// strict mode fixes mistakes that make it difficult for 
// JavaScript engines to perform optimizations: strict mode 
// code can sometimes be made to run faster than identical 
// code that's not strict mode. Third, strict mode prohibits 
// some syntax likely to be defined in future versions of 
// ECMAScript.

'use strict'

module.exports = {
  app: {
    title: "masterchef-rest",
    description: "backend rest for ionic app",
    keywords: "node, express, mongoDB"
  },
  port: process.env.PORT || 3000,
  sessionSecret: "chef",
  sessionCollection: "sessions" 
};