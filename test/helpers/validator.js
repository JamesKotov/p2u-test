'use strict';

const path = require('path');
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiValidateResponse = require('chai-validate-response');

const should = chai.should();

chai.use(chaiHttp);
chai.use(chaiValidateResponse.default);

const openapiSchemaPath = path.resolve("./spec/openapi.yaml");

const validateResponse = function(res, url, method) {
  return new Promise(function(resolve, reject) {
    res.should.to.be.a.validResponse(openapiSchemaPath, url, method)
      .andNotifyWhen(function(err){
        if (err) {
          reject(err)
        }
        resolve(true)
      });
  })
};


module.exports = {chai, validateResponse};
