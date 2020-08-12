'use strict';


/**
 * Enable the following blocks to test raspberry pi camera availability to chrome in kiosk mode. ( i have concerns about piZeroW being able to handle all of this )
**/


// const constraints = window.constraints = {
//   audio: false,
//   video: true
// };

// function handleSuccess(stream) {
//   const video = document.querySelector('video');
//   const videoTracks = stream.getVideoTracks();
//   console.log('Got stream with constraints:', constraints);
//   console.log(`Using video device: ${videoTracks[0].label}`);
//   window.stream = stream; // make variable available to browser console
//   video.srcObject = stream;
// }

// function handleError(error) {
//   if (error.name === 'ConstraintNotSatisfiedError') {
//     const v = constraints.video;
//     errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
//   } else if (error.name === 'PermissionDeniedError') {
//     errorMsg('Permissions have not been granted to use your camera and ' +
//       'microphone, you need to allow the page access to your devices in ' +
//       'order for the demo to work.');
//   }
//   errorMsg(`getUserMedia error: ${error.name}`, error);
// }

// function errorMsg(msg, error) {
//   const errorElement = document.querySelector('#errorMsg');
//   errorElement.innerHTML += `<p>${msg}</p>`;
//   if (typeof error !== 'undefined') {
//     console.error(error);
//   }
// }

// async function initialize() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia(constraints);
//     handleSuccess(stream);
//   } catch (e) {
//     handleError(e);
//   }
// }

// initialize();


/*  ---- Background Image SlideShow Prototype   */

var IMAGE_DISPLAY_DURATION = 60000;
var IMAGE_FADE_DURATION = 3000;

function revealNextImage() {
  var img_url = `https://source.unsplash.com/collection/10591049/1600x900&random=${Math.floor(Math.random() * IMAGE_DISPLAY_DURATION)}`
  $('#background_image').css({
    'background-image': `url(${img_url})`
  }).fadeIn(IMAGE_FADE_DURATION).promise().done(() => { setTimeout(fadeCurrentImage, IMAGE_DISPLAY_DURATION) });
}

function fadeCurrentImage() {
  $('#background_image').fadeOut(IMAGE_FADE_DURATION).promise().done(() => {
    revealNextImage();
  });
}

revealNextImage();