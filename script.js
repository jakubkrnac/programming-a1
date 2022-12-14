/*
* Assignment 1: Paired Modelling
* ------------------------------
* Programming 2022, Interaction Design Bacherlor, Malmö University
*
* This assignment is written by:
* Jakub Krnac
* Sara Kurcova
*
*
* The template contains some sample code exemplifying the template code structure.
* You can build on top of it, or remove the example values etc.
*
* For instructions, see the Canvas assignment: https://mau.instructure.com/courses/11936/assignments/84965
* For guidence on how to use the template, see the demo video:
*
*/

let state = {
    timeOfLastEvent: 0 // defines when was the cursor lastly moved
}

const settings = Object.freeze({
    skipEvents: 30,
    wave: {
        color: '#0075fa'
    },
    liquid: {
        color: '#ffffff',
        viscosity: 1 // the bigger the viscosity, the slower will the waves travel. viscosity set to 1 represents generic liquid
    }
});

/**
* Update the state object with the properties included in `newState`.
* @param {number} timeOfEvent An object with the properties to update in the state object.
*/
function updateState(timeOfEvent) {
    state = Object.freeze({
        timeOfLastEvent: timeOfEvent
    });
}

let eventCounter = 0; //variable to count events

/**
 * @param {PointerEvent} event An object with the properties to update in the state object.
 */
function handlePointerEvent(event) {
    if (eventCounter <= settings.skipEvents) {
        eventCounter++; // => eventCounter + 1
    } else { // if 30 events have been skipped, program proceeds to generate a wave
        const {viscosity} = settings.liquid; // get liquid viscosity from settings object
        const {color} = settings.wave; // get wave color from settings object
        let wave = document.createElement('div'); // create div element, div is not added to the page yet!
        wave.style.left = event.x + 'px'; // set div position from left
        wave.style.top = event.y + 'px'; // set div position from top
        wave.style.border = '1px solid ' + color;
        wave.style.transition = getWaveTransition(viscosity); // set css transition
        document.body.append(wave); // add this div to our body

        setTimeout(function () {
            wave.classList.add('expand'); // add class expand to the div element to start the transformation
        }, 0); // it has to be done like this since it is being called from javascript
        //wave.classList.add('expand');

        eventCounter = 0; // reset event counter
    }
}

function getWaveTransition(viscosity) { // viscosity * 2 is our default translation from viscosity to time
    return (viscosity * 2) + 's ease-out'; // generates transition css code (e.g. 2s ease-out)
}
function getWaveTravelTimeMillis(viscosity) {
    return viscosity * 2 * 1000;
}

/**
 * This is where we put the code that transforms and outputs our data.
 * loop() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function loop() {
    const { timeOfLastEvent } = state; // get timeOfLastEvent from the state object
    const { viscosity } = settings.liquid; // get viscosity from settings

    if ((new Date().getTime() - getWaveTravelTimeMillis(viscosity)) > timeOfLastEvent) { // this is executed when all waves dissappear
        document.body.innerHTML = ''; //clear our body
    }

    window.requestAnimationFrame(loop);
}

/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
    const {color} = settings.liquid; // get liquid color from settings

    document.body.style.backgroundColor = color; // set the color from settings to the body
    document.addEventListener('pointermove', function (event) {
        updateState(new Date().getTime()); // call updateState with current time as a parameter
        handlePointerEvent(event);
    });

    loop();
}

setup(); // Always remember to call setup()!