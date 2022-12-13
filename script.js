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
    timeOfLastEvent: 0
}

const settings = Object.freeze({
    skipEvents: 30,
    wave: {
        size: 100
    },
    liquid: {
        viscosity: 1 // the bigger the viscosity, the slower will the waves travel
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

let eventCounter = 0;

/**
 * @param {PointerEvent} event An object with the properties to update in the state object.
 */
function handlePointerEvent(event) {
    if (eventCounter <= settings.skipEvents) {
        eventCounter++;
    } else {
        const {viscosity} = settings.liquid;
        let wave = document.createElement('div');
        wave.style.left = event.x + 'px';
        wave.style.top = event.y + 'px';
        wave.style.transition = getWaveTransition(viscosity);
        document.body.append(wave);

        setTimeout(function () {
            wave.classList.add('expand');
        }, 0);
        //wave.classList.add('expand');

        eventCounter = 0;
    }
}

function getWaveTransition(viscosity) {
    return (viscosity * 2) + 's ease-out';
}
function getWaveTravelTimeMillis(viscosity) {
    return viscosity * 2 * 1000;
}

/**
 * This is where we put the code that transforms and outputs our data.
 * loop() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function loop() {
    const { timeOfLastEvent } = state;
    const { viscosity } = settings.liquid;

    if ((new Date().getTime() - getWaveTravelTimeMillis(viscosity)) > timeOfLastEvent) {
        document.body.innerHTML = ''; //clear our body
    }

    window.requestAnimationFrame(loop);
}

/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
    document.addEventListener('pointermove', function (event) {
        updateState(new Date().getTime());
        handlePointerEvent(event);
    });

    loop();
}

setup(); // Always remember to call setup()!