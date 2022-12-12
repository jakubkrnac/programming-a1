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

// The state should contain all the 'moving' parts of your program, values that change.
let state = Object.freeze({
    pointerEvent: {x: 0, y: 0},
});

// The settings should contain all of the 'fixed' parts of your programs, like static HTMLElements and paramaters.
const settings = Object.freeze({
    skipFrames: 30,
    wave: {
        size: 100,
        spawPosition: {x: 0, y: 0}
    },
});

/**
 * Update the state object with the properties included in `newState`.
 * @param {Object} newState An object with the properties to update in the state object.
 */
function updateState(newState) {
    //
}

/**
 * This is where we put the code that transforms and outputs our data.
 * loop() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function loop() {
    const {pointerEvent} = state;
    const {wave} = settings;

    //TODO delete the old waves

    for (const wave of document.body.childNodes) {
        console.log(window.getComputedStyle(wave));
    }

    window.requestAnimationFrame(loop);
}

/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
    let frameCounter = 0;

    document.addEventListener('pointermove', function (event) {
        if (frameCounter <= settings.skipFrames) {
            frameCounter++;
        } else {
            //updateState({pointerEvent: event});
            frameCounter = 0;

            let element = document.createElement('div');
            element.style.left = event.x + 'px';
            element.style.top = event.y + 'px';
            document.body.append(element);

            setTimeout(function () {
                element.classList.add('expand');
                }, 1);
        }
    });

    loop();
}

setup(); // Always remember to call setup()!