/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

'use strict';
var textHelper = require('./textHelper'),
    storage = require('./storage');

var registerIntentHandlers = function (intentHandlers, skillContext) {
    intentHandlers.NewWorkoutIntent = function (intent, session, response) {
        //reset scores for all existing players
        storage.loadWorkout(session, function (currentWorkout) {
            if (currentWorkout.data.users.length === 0) {
                response.ask('New workout started. Who\'s your first user?',
                    'Please tell me who\'s your first user?');
                return;
            }
            currentWorkout.data.users.forEach(function (user) {
                currentWorkout.data.exerciseNumbers[user] = 0;
            });
            currentWorkout.save(function () {
                var speechOutput = 'New workout started with '
                    + currentWorkout.data.users.length + ' existing user';
                if (currentWorkout.data.users.length > 1) {
                    speechOutput += 's';
                }
                speechOutput += '.';
                if (skillContext.needMoreHelp) {
                    speechOutput += '. You can give a user reps, add another user, reset all users or exit. What would you like?';
                    var repromptText = 'You can give a user points, add another user, reset all users or exit. What would you like?';
                    response.ask(speechOutput, repromptText);
                } else {
                    response.tell(speechOutput);
                }
            });
        });
    };

    intentHandlers.AddUserIntent = function (intent, session, response) {
        //add a player to the current game,
        //terminate or continue the conversation based on whether the intent
        //is from a one shot command or not.
        var newUserName = textHelper.getUserName(intent.slots.UserName.value);
        if (!newUserName) {
            response.ask('OK. Who do you want to add?', 'Who do you want to add?');
            return;
        }
        storage.loadWorkout(session, function (currentWorkout) {
            var speechOutput,
                reprompt;
            if (currentWorkout.data.scores[newUserName] !== undefined) {
                speechOutput = newUserName + ' has already joined the workout.';
                if (skillContext.needMoreHelp) {
                    response.ask(speechOutput + ' What else?', 'What else?');
                } else {
                    response.tell(speechOutput);
                }
                return;
            }
            speechOutput = newUserName + ' has joined your game. ';
            currentWorkout.data.users.push(newUserName);
            currentWorkout.data.scores[newUserName] = 0;
            if (skillContext.needMoreHelp) {
                if (currentWorkout.data.users.length == 1) {
                    speechOutput += 'You can say, I am Done Adding Users. Now who\'s your next user?';
                    reprompt = textHelper.nextHelp;
                } else {
                    speechOutput += 'Who is your next user?';
                    reprompt = textHelper.nextHelp;
                }
            }
            currentWorkout.save(function () {
                if (reprompt) {
                    response.ask(speechOutput, reprompt);
                } else {
                    response.tell(speechOutput);
                }
            });
        });
    };

    intentHandlers.AddExerciseNumbersIntent = function (intent, session, response) {
        //give a player points, ask additional question if slot values are missing.
        var userName = textHelper.getUserName(intent.slots.UserName.value),
            exerciseNumbers = intent.slots.ExerciseNumer,
            exerciseValue;
        if (!userName) {
            response.ask('sorry, I did not hear the user name, please say that again', 'Please say the name again');
            return;
        }
        exerciseValue = parseInt(exerciseNumber.value);
        if (isNaN(exerciseValue)) {
            console.log('Invalid exercise value = ' + exerciseNumbers.value);
            response.ask('sorry, I did not hear the reps, please say that again', 'please say the reps again');
            return;
        }
        storage.loadWorkout(session, function (currentWorkout) {
            var targetUser, speechOutput = '', newExerciseNumbers;
            if (currentWorkout.data.users.length < 1) {
                response.ask('sorry, no user has joined the game yet, what can I do for you?', 'what can I do for you?');
                return;
            }
            for (var i = 0; i < currentWorkout.data.users.length; i++) {
                if (currentWorkout.data.users[i] === userName) {
                    targetUser = currentWorkout.data.users[i];
                    break;
                }
            }
            if (!targetUser) {
                response.ask('Sorry, ' + UserName + ' has not joined the workout. What else?', userName + ' has not joined the workout. What else?');
                return;
            }
            newExerciseNumbers = currentWorkout.data.exerciseNumbers[targetUser] + exerciseValue;
            currentWorkout.data.exerciseNumbers[targetUser] = newExerciseNumbers;

            speechOutput += exerciseValue + ' for ' + targetUser + '. ';
            if (currentWorkout.data.users.length == 1 || currentWorkout.data.users.length > 3) {
                speechOutput += targetUser + ' has ' + newExerciseNumbers + ' in total.';
            } else {
                speechOutput += 'That\'s ';
                currentWorkout.data.users.forEach(function (user, index) {
                    if (index === currentWorkout.data.users.length - 1) {
                        speechOutput += 'And ';
                    }
                    speechOutput += user + ', ' + currentWorkout.data.exerciseNumbers[user];
                    speechOutput += ', ';
                });
            }
            currentWorkout.save(function () {
                response.tell(speechOutput);
            });
        });
    };

    intentHandlers.TellExerciseNumberIntent = function (intent, session, response) {
        //tells the scores in the leaderboard and send the result in card.
        storage.loadWorkout(session, function (currentWorkout) {
            var sortedExerciseNumbers = [],
                continueSession,
                speechOutput = '',
                leaderboard = '';
            if (currentWorkout.data.users.length === 0) {
                response.tell('Nobody has joined the workout.');
                return;
            }
            currentWorkout.data.users.forEach(function (user) {
                sortedExerciseNumbers.push({
                    exerciseNumbers: currentWorkout.data.exerciseNumbers[user],
                    user: user
                });
            });
            sortedExerciseNumbers.sort(function (p1, p2) {
                return p2.exerciseNumbers - p1.exerciseNumbers;
            });
            sortedExerciseNumbers.forEach(function (userExerciseNumbers, index) {
                if (index === 0) {
                    speechOutput += userExerciseNumbers.user + ' has ' + userExerciseNumbers.exerciseNumbers + 'rep';
                    if (userExerciseNumbers.exerciseNumbers > 1) {
                        speechOutput += 's';
                    }
                } else if (index === sortedExerciseNumbers.length - 1) {
                    speechOutput += 'And ' + userExerciseNumbers.user + ' has ' + userExerciseNumbers.exerciseNumbers;
                } else {
                    speechOutput += userExerciseNumbers.user + ', ' + userExerciseNumbers.exerciseNumbers;
                }
                speechOutput += '. ';
                leaderboard += 'No.' + (index + 1) + ' - ' + userExerciseNumbers.user + ' : ' + userExerciseNumbers.exerciseNumbers + '\n';
            });
            response.tellWithCard(speechOutput, "Leaderboard", leaderboard);
        });
    };

    intentHandlers.ResetUsersIntent = function (intent, session, response) {
        //remove all players
        storage.newWorkout(session).save(function () {
            response.ask('New workout started without users, who do you want to add first?', 'Who do you want to add first?');
        });
    };

    intentHandlers['AMAZON.HelpIntent'] = function (intent, session, response) {
        var speechOutput = textHelper.completeHelp;
        if (skillContext.needMoreHelp) {
            response.ask(textHelper.completeHelp + ' So, how can I help?', 'How can I help?');
        } else {
            response.tell(textHelper.completeHelp);
        }
    };

    intentHandlers['AMAZON.CancelIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can start giving reps to the players in your workout');
        } else {
            response.tell('');
        }
    };

    intentHandlers['AMAZON.StopIntent'] = function (intent, session, response) {
        if (skillContext.needMoreHelp) {
            response.tell('Okay.  Whenever you\'re ready, you can start giving reps to the players in your workout.');
        } else {
            response.tell('');
        }
    };
};
exports.register = registerIntentHandlers;
