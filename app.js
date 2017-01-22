'use strict';

//global variables
var cycleCount = 0;
var selectionNumbers = [];
var previousSelectionNumbers = [];
var num1 = 0;
var num2 = 0;
var num3 = 0;
var imgEl1, imgEl2, imgEl3;
var showenImg1, showenImg2, showenImg3;
var selectEl = document.getElementById('setting-img');
var chartData = [];
var requiredNumberOfClicks = 20;

//image object constructor
function ProductImg(imgName, filePath, id){
  this.imgName = imgName;
  this.filePath = filePath;
  this.id = id;
  this.clickCount = 0;
  this.timeShown = 0;
}

//pushing the image objects into an array
var imageArray = getImageArray();

//function to generate three non-repeating random numbers and store them
var imgSrc = function() {
  previousSelectionNumbers = selectionNumbers.slice(0);

  //chooses a random number, so long as that number was not in the selectionNumbers array and sets it to a given position in the array
  selectionNumbers[0] = getUniqueRandomNumber(previousSelectionNumbers, selectionNumbers);
  selectionNumbers[1] = getUniqueRandomNumber(previousSelectionNumbers, selectionNumbers);
  selectionNumbers[2] = getUniqueRandomNumber(previousSelectionNumbers, selectionNumbers);

  //log array to confirm non-repeating numbers are generated each time function is run
  console.log("Current Selected: " + selectionNumbers.toString());
};

function getUniqueRandomNumber(previous, current) {
  var number = 0;

  do {
      number = Math.floor(Math.random() * imageArray.length);
  } while (previous.includes(number) || current.includes(number));

  return number;
}

//function to remove the images from the page (currently not in use)
var imgRem = function(){
  var inputId = document.getElementById('setting-img');
  if (inputId !== null){
    inputId.remove();
  }
};

//function to create the html elements for the image render
var createRendItem = function(){
  var sectionEl = document.createElement('section');
  sectionEl.setAttribute('id', 'funk');

  imgEl1 = document.createElement('img');
  imgEl2 = document.createElement('img');
  imgEl3 = document.createElement('img');
  console.log(imgEl1, imgEl2, imgEl3);

  imgEl1.setAttribute('id', 'randImg');
  imgEl2.setAttribute('id', 'randImg');
  imgEl3.setAttribute('id', 'randImg');

  sectionEl.appendChild(imgEl1);
  sectionEl.appendChild(imgEl2);
  sectionEl.appendChild(imgEl3);
  selectEl.appendChild(sectionEl);
};

createRendItem();

//function to render the current set of randomized images to the page
var rendImg = function (){

  imgSrc();
  showenImg1 = imageArray[selectionNumbers[0]];
  showenImg2 = imageArray[selectionNumbers[1]];
  showenImg3 = imageArray[selectionNumbers[2]];

  // Add back in the timeShown property.

  imgEl1.setAttribute('src', imageArray[selectionNumbers[0]].filePath);
  imgEl2.setAttribute('src', imageArray[selectionNumbers[1]].filePath);
  imgEl3.setAttribute('src', imageArray[selectionNumbers[2]].filePath);
};

rendImg();

//event listeners for each of the three images on the page
imgEl1.addEventListener('click',imgOne, false);
function imgOne(){
  showenImg1.clickCount++;
  console.log(showenImg1.clickCount);
}
imgEl2.addEventListener('click',imgTwo, false);
function imgTwo(){
  showenImg2.clickCount++;
  console.log(showenImg2.clickCount);
}
imgEl3.addEventListener('click',imgThree, false);
function imgThree(){
  showenImg3.clickCount++;
  console.log(showenImg3.clickCount);
}

//listener for when an image is selected
var choices = document.getElementById('setting-img');
choices.addEventListener('click', function clickListener() {

  if (cycleCount < requiredNumberOfClicks) {
    for (var i = 0; i < imageArray.length; i++) {
      if (imageArray[i].imgName == this.imgName) {
        imageArray[i].clickCount++;
      }
    }
    rendImg();
    cycleCount++;

  } else {
    //build the chart data
    for (var i = 0; i < imageArray.length; i++) {
      chartData[i] = imageArray[i].clickCount;
    }
    localStorage.setItem('storedData', JSON.stringify(imageArray));
    console.log(chartData);

    buildChart();
    imgEl1.removeEventListener('click',imgOne);
    imgEl2.removeEventListener('click',imgTwo);
    imgEl3.removeEventListener('click',imgThree);
    choices.removeEventListener('click',clickListener);
  }

}, false);

function getImageArray() {
  var storedData = localStorage.getItem('storedData');
  if (storedData !== null) {
    return JSON.parse(localStorage.getItem('storedData')); // get the item from local storage and return it.
  } else {
    return [
      new ProductImg('bag', 'img/bag.jpg', 'bag'),
      new ProductImg('banana', 'img/banana.jpg', 'banana'),
      new ProductImg('bathroom', 'img/bathroom.jpg', 'bathroom'),
      new ProductImg('boots', 'img/boots.jpg', 'boots'),
      new ProductImg('breakfast', 'img/breakfast.jpg', 'breakfast'),
      new ProductImg('bubblegum', 'img/bubblegum.jpg', 'bubblegum'),
      new ProductImg('chair', 'img/chair.jpg', 'chair'),
      new ProductImg ('cthulhu', 'img/cthulhu.jpg', 'cthulhu'),
      new ProductImg ('dog-duck', 'img/dog-duck.jpg', 'dogDuck'),
      new ProductImg ('dragon', 'img/dragon.jpg', 'dragon'),
      new ProductImg ('pen', 'img/pen.jpg', 'pen'),
      new ProductImg ('pet-sweep', 'img/pet-sweep.jpg', 'petSweep'),
      new ProductImg ('scissors', 'img/scissors.jpg', 'scissors'),
      new ProductImg ('tauntaun', 'img/tauntaun.jpg', 'tauntaun'),
      new ProductImg ('shark', 'img/shark.jpg', 'shark'),
      new ProductImg ('sweep', 'img/sweep.png', 'sweep'),
      new ProductImg ('unicorn', 'img/unicorn.jpg', 'unicorn'),
      new ProductImg ('usb', 'img/usb.gif', 'usb'),
      new ProductImg ('water-can', 'img/water-can.jpg', 'waterCan'),
      new ProductImg ('wine-glass', 'img/wine-glass.jpg', 'wineGlass')
    ];
  }
}

var context = document.getElementById('results-chart').getContext('2d');

//variables and options for building the results chart on the page
var buildChart = function() {
  var renderChart = document.getElementById('results-chart');

  //build list of names for labels
  var chartLabels = [];
  for (var index = 0; index < imageArray.length; index++) {
    var labelsData = imageArray[index].imgName;
    chartLabels[index] = labelsData;
  }

  var chartColors = ['red', 'yellow', 'blue', 'green', 'purple', 'red', 'yellow', 'blue', 'green', 'purple', 'red', 'yellow', 'blue', 'green', 'purple', 'red', 'yellow', 'blue', 'green', 'purple'];

  var chartOptions = {
    responsive: true,
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
      labels: chartLabels,
      datasets: [{
        label: '# of votes for each color',
        data: chartData,
        backgroundColor: chartColors
      }]
    },
    options: chartOptions
  });
};
