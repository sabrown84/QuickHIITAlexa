/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This sample shows how to create a Lambda function for handling Alexa Skill requests that:
 *
 * - Multiple slots: has 2 slots (name and score)
 * - Database Interaction: demonstrates how to read and write data to DynamoDB.
 * - NUMBER slot: demonstrates how to handle number slots.
 * - Custom slot type: demonstrates using custom slot types to handle a finite set of known values
 * - Dialog and Session state: Handles two models, both a one-shot ask and tell model, and a multi-turn dialog model.
 *   If the user provides an incorrect slot in a one-shot model, it will direct to the dialog model. See the
 *   examples section for sample interactions of these models.
 *
 * Examples:
 * Dialog model:
 *  User: "Alexa, tell score keeper to reset."
 *  Alexa: "New game started without players. Who do you want to add first?"
 *  User: "Add the player Bob"
 *  Alexa: "Bob has joined your game"
 *  User: "Add player Jeff"
 *  Alexa: "Jeff has joined your game"
 *
 *  (skill saves the new game and ends)
 *
 *  User: "Alexa, tell score keeper to give Bob three points."
 *  Alexa: "Updating your score, three points for Bob"
 *
 *  (skill saves the latest score and ends)
 *
 * One-shot model:
 *  User: "Alexa, what's the current score?"
 *  Alexa: "Jeff has zero points and Bob has three"
 */
'use strict';
var QuickHiit = require('./quickHiit');

// Questions
var nodes = [{ "node": 1, "message": "Which would you like to do today: Arms, Legs or Abs?", "Arms": 2, "Legs": 3, "Abs" : 4 },
             { "node": 2, "message": "How hard to you want to work your arms: Level one, two, or three?", "one": 5, "two": 6, "three" : 7 },
             { "node": 3, "message": "How hard to you want to work your legs: Level one, two, or three?", "one": 8, "two": 9, "three" : 10 },
             { "node": 4, "message": "How hard to you want to work your abs: Level one, two, or three?", "one": 11, "two": 12, "three" : 13 }
//
// // Answers & Workout lists
                //
              { "node": 5,  "message": " Time to get you started! Do you want a list of the exercises?", "yes": 14, "no": 0, "description": "For this workout you will need a set of dumbbells, and a chair or bench. Here's the list of exercises: bicep curls, diamond push-ups, tricep dips, front raises, standing overhead press, regular push-ups, hammer curls, tricep kickbacks, and side raises. We will complete each exercise within 20 seconds and 10 seconds to rest. Are you ready?", "yes": 15, "no": 0 },
              { "node": 6,  "message": " Are your strong arms ready to go?", "yes": 16, "no": 0, "description": "For this workout you will need a set of dumbbells, and a chair or bench. Here's the list of exercises: upright row, bent over reverse fly, overhead tricep extension, elevated bicep curl, bent over row, push-ups, L raise, chest fly, single leg dips right leg, single leg dips left leg. We will complete each exercise within 20 seconds and 10 seconds to rest. Are you ready?", "yes": 17, "no": 0 },
              { "node": 7, "message": " Warrior arms, are you ready?", "yes": 18, "no": 0, "description": "For this workout you will need a set of dumbbells, and a mat. Here's the list of exercises: Curl and press, bent over row to kickback, right arm tricep extension balancing on left foot, left are tricep extension balancing on left foot, push up to alternating rows, lying dumbbell fly, mountain climbers, shoulder press with right knee raise, shoulder press with left knee raise, plank with alternating arm reach. We will complete each exercise within 20 seconds and 10 seconds to rest. Are you ready?", "yes": 19, "no": 0 },
              { "node": 8, "message": " Legs are the beginning of your foundation. Are you ready?", "yes": 20, "no": 0, "description": "For this workout you will need a set of dumbbells, and a mat. Here's the list of exercises: Squats, stiff leg deadlifts, calf raises, lunges, side leg raise right, side leg raise left, front kick right, front kick left, sumo squat, glute bridge. We will complete each exercise within 20 seconds and 10 seconds to rest. Are you ready?", "yes": 21, "no": 0 },
              { "node": 9, "message": " Primal legs time to move, are you ready!", "yes": 22, "no": 0, "description": "Basketball is a great way to get cardio and train hand eye coordination." },
//              { "node": 13, "message": " do crossfit!", "yes": 0, "no": 0, "description": "Crossfit, while not a team sport is a great group activity that exercises numerous muscle groups." },
//              { "node": 14, "message": " lift weights!", "yes": 0, "no": 0, "description": "Lifting weights not only builds strength, but can also sculpt sculpt your body." },
//              { "node": 15, "message": " do yoga!", "yes": 0, "no": 0, "description": "Yoga builds strength and flexibility, can be done from the comfort of your home, and brings a better connection to your body." },
 ];

// This is the intial welcome message
var welcomeMessage = "Welcome to the quick hit, are you ready to work out?";

exports.handler = function (event, context) {
    var quickHiit = new QuickHiit();
    quickHiit.execute(event, context);
};
