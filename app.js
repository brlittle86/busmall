'use strict';

//global variables
var cycleCount = 0;
var selectionNumbers = [];
var previousSelectionNumbers = [];
var imageElement1, imageElement2, imageElement3;
var shownImg1, shownImg2, shownImg3;
var selectEl = document.getElementById('setting-img');
var chartClicksData = [];
var chartShownData = [];
var requiredNumberOfClicks = 24;

//image object constructor
function ProductImg(imgName, filePath, id) {
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
  console.log('Current Selected: ' + selectionNumbers.toString());
};

//create randomized number that is not part of the previous set of three numbers
function getUniqueRandomNumber(previous, current) {
  var number = 0;

  do {
    number = Math.floor(Math.random() * imageArray.length);
  } while (previous.includes(number) || current.includes(number));

  return number;
}

//function to create the html elements for the image render
var createRendItem = function() {
  var sectionEl = document.createElement('section');
  sectionEl.setAttribute('id', 'funk');

  imageElement1 = document.createElement('img');
  imageElement2 = document.createElement('img');
  imageElement3 = document.createElement('img');
  console.log(imageElement1, imageElement2, imageElement3);

  imageElement1.setAttribute('id', 'randImg');
  imageElement2.setAttribute('id', 'randImg');
  imageElement3.setAttribute('id', 'randImg');

  sectionEl.appendChild(imageElement1);
  sectionEl.appendChild(imageElement2);
  sectionEl.appendChild(imageElement3);
  selectEl.appendChild(sectionEl);
};

createRendItem();

//function to render the current set of randomized images to the page
var rendImg = function() {

  imgSrc();
  shownImg1 = imageArray[selectionNumbers[0]];
  shownImg2 = imageArray[selectionNumbers[1]];
  shownImg3 = imageArray[selectionNumbers[2]];

  //increment number of times shown on page
  imageArray[selectionNumbers[0]].timeShown++;
  imageArray[selectionNumbers[1]].timeShown++;
  imageArray[selectionNumbers[2]].timeShown++;

  imageElement1.setAttribute('src', imageArray[selectionNumbers[0]].filePath);
  imageElement2.setAttribute('src', imageArray[selectionNumbers[1]].filePath);
  imageElement3.setAttribute('src', imageArray[selectionNumbers[2]].filePath);
};

rendImg();

//event listeners for each of the three images on the page
imageElement1.addEventListener('click', imgOne, false);

function imgOne() {
  shownImg1.clickCount++;
  console.log(shownImg1.clickCount);
}
imageElement2.addEventListener('click', imgTwo, false);

function imgTwo() {
  shownImg2.clickCount++;
  console.log(shownImg2.clickCount);
}
imageElement3.addEventListener('click', imgThree, false);

function imgThree() {
  shownImg3.clickCount++;
  console.log(shownImg3.clickCount);
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
    //build the clicks chart data
    for (var j = 0; j < imageArray.length; j++) {
      chartClicksData[j] = imageArray[j].clickCount;
    }

    //build times shown chart data
    for (var k = 0; k < imageArray.length; k++) {
      chartShownData[k] = imageArray[k].timeShown;
    }

    localStorage.setItem('storedData', JSON.stringify(imageArray));
    console.log(chartClicksData);

    buildChart();
    imageElement1.removeEventListener('click', imgOne);
    imageElement2.removeEventListener('click', imgTwo);
    imageElement3.removeEventListener('click', imgThree);
    choices.removeEventListener('click', clickListener);
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
      new ProductImg('cthulhu', 'img/cthulhu.jpg', 'cthulhu'),
      new ProductImg('dog-duck', 'img/dog-duck.jpg', 'dogDuck'),
      new ProductImg('dragon', 'img/dragon.jpg', 'dragon'),
      new ProductImg('pen', 'img/pen.jpg', 'pen'),
      new ProductImg('pet-sweep', 'img/pet-sweep.jpg', 'petSweep'),
      new ProductImg('scissors', 'img/scissors.jpg', 'scissors'),
      new ProductImg('tauntaun', 'img/tauntaun.jpg', 'tauntaun'),
      new ProductImg('shark', 'img/shark.jpg', 'shark'),
      new ProductImg('sweep', 'img/sweep.png', 'sweep'),
      new ProductImg('unicorn', 'img/unicorn.jpg', 'unicorn'),
      new ProductImg('usb', 'img/usb.gif', 'usb'),
      new ProductImg('water-can', 'img/water-can.jpg', 'waterCan'),
      new ProductImg('wine-glass', 'img/wine-glass.jpg', 'wineGlass')
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
        data: chartClicksData,
        backgroundColor: '#000000'
      },
      {
        label: '# of times shown',
        data: chartShownData,
        backgroundColor: '#36494E'
      }]
    },
    options: chartOptions
  });
};