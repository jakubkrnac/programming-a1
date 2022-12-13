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

const state = {
    lastMovement: 0
}

const settings = Object.freeze({
    skipEvents: 30,
    wave: {
        size: 100,
    },
});

let eventCounter = 0;

/**
 * @param {PointerEvent} event An object with the properties to update in the state object.
 */
function handlePointerEvents(event) {

    state.lastMovement = new Date().getTime();

    if (eventCounter <= settings.skipEvents) {
        eventCounter++;
    } else {
        let element = document.createElement('div');
        element.style.left = event.x + 'px';
        element.style.top = event.y + 'px';
        document.body.append(element);

        setTimeout(function () {
            element.classList.add('expand');
        }, 0);

        eventCounter = 0;
    }
}

/**
 * This is where we put the code that transforms and outputs our data.
 * loop() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function loop() {

    if ((new Date().getTime() - 5000) > state.lastMovement) {
//        for (const waveNode of document.body.childNodes) {
//            document.body.removeChild(waveNode);
//        }
        document.body.innerHTML = ''; //clear our body
    }

    window.requestAnimationFrame(loop);
}

/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
    document.addEventListener('pointermove', function (event) {
        handlePointerEvents(event);
    });

    loop();
}

setup(); // Always remember to call setup()!