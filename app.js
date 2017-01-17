'use strict';

//global variables
var selectionNumbers = [];
var num1 = 0;
var num2 = 0;
var num3 = 0;
var selectorElement = document.getElementById('selection-field');

//Image constructor function
function Image(imageName, imageFilePath) {
  this.imageName = imageName;
  this.imageFilePath = imageFilePath;

  var timesClicked;
  this.timesClicked = 0;
  var timeShown;
  this.timeShown = 0;
  var htmlId = 'randomImage';
  this.htmlId = htmlId;
}

//Initial image pool stored in imagesArray variable
var bag = new Image('bag', '/img/bag.jpg');
var banana = new Image('banana', '/img/banana.jpg');
var bathroom = new Image('bathroom', '/img/bathroom.jpg');
var boots = new Image('boots', '/img/boots.jpg');
var breakfast = new Image('breakfast', '/img/breakfast.jpg');
var bubblegum = new Image('bubblegum', '/img/bubbglegum.jpg');
var chair = new Image('chair', '/img/chair.jpg');
var cthulhu = new Image('cthulhu', '/img/cthulhu.jpg');
var dogDuck = new Image('dog-duck', '/img/dog-duck.jpg');
var dragon = new Image('dragon', '/img/dragon.jpg');
var pen = new Image('pen', '/img/pen.jpg');
var petSweep = new Image('pet-sweep', '/img/pet-sweep.jpg');
var scissors = new Image('scissors', '/img/scissors.jpg');
var shark = new Image('shark', '/img/shark.jpg');
var sweep = new Image('sweep', '/img/sweep.png');
var tauntaun = new Image('tauntaun', '/img/tauntaun.jpg');
var unicorn = new Image('unicorn', '/img/unicorn.jpg');
var usb = new Image('usb', '/img/usb.gif');
var waterCan = new Image('water-can', '/img/water-can.jpg');
var wineGlass = new Image('wine-glass', '/img/wine-glass.jpg');

var imagesArray = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, waterCan, wineGlass];

//Selector function
var imageSelector = function() {
  //chooses a random number, so long as that number was not in the selectionNumbers array and sets it to a given position in the array
  do {
    num1 = Math.floor(Math.random() * (imagesArray.length + 1));
  } while (selectionNumbers.includes(num1) || num1 === num2 || num1 === num3);

  do {
    num2 = Math.floor(Math.random() * (imagesArray.length + 1));
  } while (selectionNumbers.includes(num2) || num2 === num1 || num2 === num3);

  do {
    num3 = Math.floor(Math.random() * (imagesArray.length + 1));
  } while (selectionNumbers.includes(num3) || num3 === num1 || num3 === num2);

  selectionNumbers[0] = num1;
  selectionNumbers[1] = num2;
  selectionNumbers[2] = num3;

  //log array to confirm non-repeating numbers are generated each time function is run
  console.log(selectionNumbers);
};

//function to display images to html based on the numbers stored in selectionNumbers
var renderImages = function() {
  for (var i = 0; i < selectionNumbers.length; i++) {
    ;
  }
};
