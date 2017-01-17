'use strict';

//global variables

//Image constructor function
function Image(imageName, imageFilePath) {
  this.imageName = imageName;
  this.imageFilePath = imageFilePath;

  var timesClicked;
  var timeShown;
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
