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












var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var tickElements = Array.from(document.querySelectorAll('.tick'))

var last = new Date(0)
last.setUTCHours(-1)

var tickState = true

function updateTime() {
  var now = new Date

  let militaryTime = last.getHours().toString();
  var ampm = militaryTime >= 12 ? 'pm' : 'am';

  var lastHours = last.getHours().toString();
  var nowHours = now.getHours().toString();
  //var humanHours = (nowHours % 12 || 12).toString();
  if (lastHours !== nowHours) {
    updateContainer(hoursContainer, nowHours)
  }

  var lastMinutes = last.getMinutes().toString()
  var nowMinutes = now.getMinutes().toString()
  if (lastMinutes !== nowMinutes) {
    updateContainer(minutesContainer, nowMinutes)
  }

  var lastSeconds = last.getSeconds().toString()
  var nowSeconds = now.getSeconds().toString()
  if (lastSeconds !== nowSeconds) {
    //tick()
    updateContainer(secondsContainer, nowSeconds)
  }

  last = now
}

function tick() {
  tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer(container, newTime) {
  var time = newTime.split('')

  if (time.length === 1) {
    time.unshift('0')
  }


  var first = container.firstElementChild
  if (first.lastElementChild.textContent !== time[0]) {
    updateNumber(first, time[0])
  }

  var last = container.lastElementChild
  if (last.lastElementChild.textContent !== time[1]) {
    updateNumber(last, time[1])
  }
}

function updateNumber(element, number) {
  //element.lastElementChild.textContent = number
  var second = element.lastElementChild.cloneNode(true)
  second.textContent = number

  element.appendChild(second)
  element.classList.add('move')

  setTimeout(function () {
    element.classList.remove('move')
  }, 990)
  setTimeout(function () {
    element.removeChild(element.firstElementChild)
  }, 990)
}

setInterval(updateTime, 100)













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