/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*  
    Hello World App that draws a random y pos marquee sign
    that says 'Hello World, via Cordova, PhoneGap, and Famo.us!'

    Click txt box to stop, click again to begin moving again

*/
define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');                                 // Dependancies
    var Surface = require('famous/core/Surface');
    var Modifier = require('famous/core/Modifier');
    var Transitionable = require('famous/transitions/Transitionable');

    var mainContext = Engine.createContext();
    
    function onDeviceReady(){
        mainContext.add(modifier).add(textSurface);
        textSurface.setContent('Hello World,<BR>via Cordova, PhoneGap, and Famo.us!');

        // initialize start move loop
        moveToRandLeft();
    }

    document.addEventListener('deviceready', onDeviceReady, false);

    // begin app code
    var move = true;
    var dura = 1000;
    var randY = randomize();
    var transitionable = new Transitionable([0, randY]);

    // init and config floating text box
    var textSurface = new Surface({
        size: [150, 100],
        content: 'Hello World,<BR>via Cordova, PhoneGap, and Famo.us!<BR>Not Ready',
        classes: ['helloworld'],
    });
    textSurface.on('click', function(){
        if(move){
            transitionable.halt();
            move = false;
        }else{
            moveToRandLeft();
            move = true;
        }
    });

    var modifier = new Modifier({
        origin: [0, 0],
        align: [0, 0]
    });
    modifier.alignFrom(function(){
        return transitionable.get();
    });

    function randomize(){
        randY = (Math.random() + 0.03) * 0.85;
    }

    function moveToRight(){
        transitionable.set([0, randY], { duration: dura }, moveToRandLeft);
    }

    function moveToRandLeft(){
        transitionable.set([0.6, randY], { duration: dura }, function(){
            randomize();
            moveToRight();
        });
    }
});
