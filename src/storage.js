/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

'use strict';
var AWS = require("aws-sdk");

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    /*
     * The Game class stores all game states for the user
     */
    function Workout(session, data) {
        if (data) {
            this.data = data;
        } else {
            this.data = {
                users: [],
                exerciseNumbers: {}
            };
        }
        this._session = session;
    }

    Workout.prototype = {
        isEmptyExercise: function () {
            //check if any one had non-zero score,
            //it can be used as an indication of whether the game has just started
            var allEmpty = true;
            var workoutData = this.data;
            workoutData.users.forEach(function (user) {
                if (workoutData.exerciseNumbers[user] !== 0) {
                    allEmpty = false;
                }
            });
            return allEmpty;
        },
        save: function (callback) {
            //save the game states in the session,
            //so next time we can save a read from dynamoDB
            this._session.attributes.currentWorkout = this.data;
            dynamodb.putItem({
                TableName: 'quickHiitUserData',
                Item: {
                    CustomerId: {
                        S: this._session.user.userId
                    },
                    Data: {
                        S: JSON.stringify(this.data)
                    }
                }
            }, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                }
                if (callback) {
                    callback();
                }
            });
        }
    };

    return {
        loadWorkout: function (session, callback) {
            if (session.attributes.currentWorkout) {
                console.log('get workout from session=' + session.attributes.currentWorkout);
                callback(new Workout(session, session.attributes.currentWorkout));
                return;
            }
            dynamodb.getItem({
                TableName: 'quickHiitUserData',
                Key: {
                    CustomerId: {
                        S: session.user.userId
                    }
                }
            }, function (err, data) {
                var currentWorkout;
                if (err) {
                    console.log(err, err.stack);
                    currentWorkout = new Workout(session);
                    session.attributes.currentWorkout = currentWorkout.data;
                    callback(currentWorkout);
                } else if (data.Item === undefined) {
                    currentWorkout = new Workout(session);
                    session.attributes.currentWorkout = currentWorkout.data;
                    callback(currentWorkout);
                } else {
                    console.log('get workout from dynamodb=' + data.Item.Data.S);
                    currentWorkout = new Workout(session, JSON.parse(data.Item.Data.S));
                    session.attributes.currentWorkout = currentWorkout.data;
                    callback(currentWorkout);
                }
            });
        },
        newWorkout: function (session) {
            return new Workout(session);
        }
    };
})();
module.exports = storage;
