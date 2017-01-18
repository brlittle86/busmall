'use strict';

//global variables
var cycleCounter = 0;
var selectionNumbers = [];
var num1 = 0;
var num2 = 0;
var num3 = 0;
var selectorElement = document.getElementById('selection-field');

//Image constructor function
function Image(imageName, imageFilePath) {
  this.imageName = imageName;
  this.imageFilePath = imageFilePath;

  var timesClicked = 0;
  this.timesClicked = timesClicked;
  var timeShown = 0;
  this.timeShown = timeShown;
  var htmlId = 'randomImage';
  this.htmlId = htmlId;
}

//Initial image pool stored in imagesArray variable
var bag = new Image('bag', 'img/bag.jpg');
var banana = new Image('banana', 'img/banana.jpg');
var bathroom = new Image('bathroom', 'img/bathroom.jpg');
var boots = new Image('boots', 'img/boots.jpg');
var breakfast = new Image('breakfast', 'img/breakfast.jpg');
var bubblegum = new Image('bubblegum', 'img/bubblegum.jpg');
var chair = new Image('chair', 'img/chair.jpg');
var cthulhu = new Image('cthulhu', 'img/cthulhu.jpg');
var dogDuck = new Image('dogDuck', 'img/dog-duck.jpg');
var dragon = new Image('dragon', 'img/dragon.jpg');
var pen = new Image('pen', 'img/pen.jpg');
var petSweep = new Image('petSweep', 'img/pet-sweep.jpg');
var scissors = new Image('scissors', 'img/scissors.jpg');
var shark = new Image('shark', 'img/shark.jpg');
var sweep = new Image('sweep', 'img/sweep.png');
var tauntaun = new Image('tauntaun', 'img/tauntaun.jpg');
var unicorn = new Image('unicorn', 'img/unicorn.jpg');
var usb = new Image('usb', 'img/usb.gif');
var waterCan = new Image('waterCan', 'img/water-can.jpg');
var wineGlass = new Image('wineGlass', 'img/wine-glass.jpg');

var imagesArray = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, usb, waterCan, wineGlass];

//Selector function
var imageSelector = function() {
  //chooses a random number, so long as that number was not in the selectionNumbers array and sets it to a given position in the array
  do {
    num1 = Math.floor(Math.random() * (imagesArray.length + 1));
  } while (selectionNumbers.includes(num1) || num1 === num2 || num1 === num3 || num1 === 20);

  do {
    num2 = Math.floor(Math.random() * (imagesArray.length + 1));
  } while (selectionNumbers.includes(num2) || num2 === num1 || num2 === num3 || num2 === 20);

  do {
    num3 = Math.floor(Math.random() * (imagesArray.length + 1));
  } while (selectionNumbers.includes(num3) || num3 === num1 || num3 === num2 || num3 === 20);

  selectionNumbers[0] = num1;
  selectionNumbers[1] = num2;
  selectionNumbers[2] = num3;

  //log array to confirm non-repeating numbers are generated each time function is run
  console.log(selectionNumbers);
};

//function to remove existing set of images, if any exist
var imageRemover = function() {
  var inputId = document.getElementById('images-block');

  if (inputId !== null) {
    inputId.remove();
  }
};

//function to display images to html based on the numbers stored in selectionNumbers
var renderImages = function() {
  //clears any existing images from the page
  imageRemover();
  imageSelector();

  var sectionElement = document.createElement('section');
  sectionElement.setAttribute('id', 'images-block');
  selectorElement.appendChild(sectionElement);

  for (var i = 0; i < selectionNumbers.length; i++) {
    var imageElement = document.createElement('input');
    imageElement.setAttribute('type', 'image');
    imageElement.setAttribute('class', 'option' + i);
    imageElement.setAttribute('id', imagesArray[selectionNumbers[i]].imageName);
    imageElement.setAttribute('src', imagesArray[selectionNumbers[i]].imageFilePath);
    sectionElement.appendChild(imageElement);
    imagesArray[selectionNumbers[i]].timeShown++;
    console.log(imagesArray[selectionNumbers[i]].timeShown);
  }
};

renderImages();

//function for listener
var storedSelection = function(option) {

  if (cycleCounter < 25) {
    for (var i = 0; i < imagesArray.length; i++) {
      // console.log(this.id.value);
      if (imagesArray[i].imageName === option) {
        imagesArray[i].timesClicked++;
        console.log('This was clicked ' + imagesArray[i].timesClicked);
      } else {
        console.log('Failed to find the id.');
      }
    }
    renderImages();
    cycleCounter++;
    // console.log(parseInt(this.timesClicked));
  } else {
    imageRemover();
    var completionMessage = document.createElement('p');
    completionMessage.textContent = 'Thank you for your participation! You are done!';
    selectorElement.appendChild(completionMessage);
  }
};

//listener for when an image is selected
var optionZero = document.getElementsByClassName('option0');
optionZero.addEventListener('click', storedSelection(imagesArray[selectionNumbers[0]].imageName));

var optionOne = document.getElementsByClassName('option1');
optionOne.addEventListener('click', storedSelection(imagesArray[selectionNumbers[1]].imageName));

var optionTwo = document.getElementsByClassName('option2');
optionTwo.addEventListener('click', storedSelection(imagesArray[selectionNumbers[2]].imageName));
