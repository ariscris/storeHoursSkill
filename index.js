/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const GoogleMapsAPI = require('googlemaps');

var publicConfig = {
  key: 'AIzaSyBp1rZSe6Vq0bKIurb0v8Tiriikf5fjuM8',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
  //proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};
var gmAPI = new GoogleMapsAPI(publicConfig);

var params = {
    placeid: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
};


const handlers = {    
    'OpeningHours': function () {
        console.log("Opening Hours");
        console.log(gmAPI);
        //console.log(params);
        gmAPI.placeDetails(params, function(err, result){
            console.log("hre");
            console.log("err: " + err);
            console.log("result: " + result);
            console.log("is result ok: " + result.status);
        });

        this.emit(':tell', '9 am');



    },
    'ClosingHours': function () {
        this.emit(':tell', '8:30 pm');
    },
    'AMAZON.HelpIntent': function () {
        // const speechOutput = this.t('HELP_MESSAGE');
        // const reprompt = this.t('HELP_MESSAGE');
        // this.emit(':ask', speechOutput, reprompt);
        this.emit(':tell', 'Try saying what time does Target open');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', 'Goodbye!');
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    //alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
