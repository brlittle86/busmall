'use strict';

//global variables
var cycleCounter = 0;
var selectionNumbers = [];
var num1 = 0;
var num2 = 0;
var num3 = 0;
var imageElement0, imageElement1, imageElement2;
var shownImage0, shownImage1, shownImage2;
var selectorElement = document.getElementById('selection-field');
var mainTag = document.getElementById('main-tag');

//Image constructor function
function Image(imageName, imageFilePath) {
  this.imageName = imageName;
  this.imageFilePath = imageFilePath;

  var timesClicked = 0;
  this.timesClicked = timesClicked;
  var timeShown = 0;
  this.timeShown = timeShown;
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
  var inputId = document.getElementById('selection-field');

  if (inputId !== null) {
    inputId.remove();
  }
  var createDiv = document.createElement('div');
  createDiv.setAttribute('id', 'selection-field');
  mainTag.appendChild(createDiv);
  selectorElement = document.getElementById('selection-field');
};

//create the elements for rendering
var createRenderElements = function() {

  var sectionElement = document.createElement('section');
  sectionElement.setAttribute('id', 'holder');
  imageElement0 = document.createElement('img');
  imageElement0.setAttribute('id', 'randomImage');
  imageElement1 = document.createElement('img');
  imageElement1.setAttribute('id', 'randomImage');
  imageElement2 = document.createElement('img');
  imageElement2.setAttribute('id', 'randomImage');
  sectionElement.appendChild(imageElement0);
  sectionElement.appendChild(imageElement1);
  sectionElement.appendChild(imageElement2);
  selectorElement.appendChild(sectionElement);
}
createRenderElements();

//function to display images to html based on the numbers stored in selectionNumbers
var renderImages = function() {
  //chooses 3 random images
  imageSelector();

  //set variables equal to random index
  shownImage0 = imagesArray[selectionNumbers[0]];
  shownImage1 = imagesArray[selectionNumbers[1]];
  shownImage2 = imagesArray[selectionNumbers[2]];

  imageElement0.setAttribute('src', imagesArray[selectionNumbers[0]].imageFilePath);
  imageElement1.setAttribute('src', imagesArray[selectionNumbers[1]].imageFilePath);
  imageElement2.setAttribute('src', imagesArray[selectionNumbers[2]].imageFilePath);

  imageElement0.setAttribute('id', imagesArray[selectionNumbers[0]].imageName);
  imageElement1.setAttribute('id', imagesArray[selectionNumbers[1]].imageName);
  imageElement2.setAttribute('id', imagesArray[selectionNumbers[2]].imageName);

  imagesArray[selectionNumbers[0]].timeShown++;
  imagesArray[selectionNumbers[1]].timeShown++;
  imagesArray[selectionNumbers[2]].timeShown++;
};

renderImages();

//listeners
imageElement0.addEventListener('click', imageZero, false);
function imageZero() {
  shownImage0.timesClicked++
  cycleCounter++;
  imageRemover();
  createRenderElements();
  renderImages();
}

imageElement1.addEventListener('click', imageOne, false);
function imageOne() {
  shownImage1.timesClicked++
  cycleCounter++;
  imageRemover();
  createRenderElements();
  renderImages();
}

imageElement2.addEventListener('click', imageTwo, false);
function imageTwo() {
  shownImage2.timesClicked++
  cycleCounter++;
  imageRemover();
  createRenderElements();
  renderImages();
}

//variables and options for building the results chart on the page
var buildChart = function() {
  var renderChart = document.getElementById('results-chart');

  //build the chart data
  var chartData = [];
  for (var index = 0; index < imagesArray.length; index++) {
    var clickedData = imagesArray[index].timesClicked;
    chartData.push(clickedData);
  }

  //build list of names for labels
  var chartLabels = [];
  for (var index = 0; index < imagesArray.length; index++) {
    var labelsData = imagesArray[index].imageName;
    chartLabels.push(labelsData);
  }

  var chartColors = ['red', 'yellow', 'blue', 'green', 'purple', 'red', 'yellow', 'blue', 'green', 'purple', 'red', 'yellow', 'blue', 'green', 'purple', 'red', 'yellow', 'blue', 'green', 'purple'];

  var chartOptions = {
        responsive: false,
        scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
  };

  var imageResultsChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: chartColors,
      datasets: [{
        label: '# of votes for each color',
        data: chartData,
        backgroundColor: chartColors
      }]
    },
    options: chartOptions
  })
};
