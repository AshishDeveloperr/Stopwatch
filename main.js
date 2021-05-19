/* 
Available Spots and Summary:
Total Cases, Active Cases, Deaths, Recovered, Tested, Critical, Change Ratio %, Summary
Historical data:
Day, Week, Month, Year, Change per Day, Difference, Summary
Regions:
World, Regions and Countries

Read documentation for more functionality - https://rapidapi.com/Yatko/api/coronavirus-live
See all available countries - https://api.quarantine.country/api/v1/summary/latest
*/

var countryFeedKey = 'india'; //try india, spain, japan, etc.
var countryName = 'INDIA'; //try  INDIA, Italia, etc.

function ready(cb) {
  if (document.readyState !== 'loading') {
    cb();
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      cb();
    });
  }
}

function fetchData(url) {
  return fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function(payload) {
      return payload['data'] || {};
    });
}

function formatNumber(number, precision, separate, separator, comma) {
  if (!number) {
    return '';
  }

  var re = '\\d(?=(\\d{' + (separate || 3) + '})+' + (precision > 0 ? '\\D' : '$') + ')',
    num = number.toFixed(Math.max(0, ~~precision));

  return (coma ? num.replace('.', comma) : num).replace(new RegExp(re, 'g'), '$&' + (separator || ','));
};

function fillPlaceholders(data) {
  var i;
  var varEl = document.querySelectorAll('[data-var-placeholder]');

  for (i = 0; i < varEl.length; i++) {
    var placeholder = varEl[i].getAttribute('data-var-placeholder');

    if (placeholder && placeholder != '') {
      switch (placeholder) {
        case 'country':
          varEl[i].innerText = countryName;
          break;
      }
    }
  }

  var countryPlaceholderEl = document.querySelectorAll('[data-country-placeholder]');

  for (i = 0; i < countryPlaceholderEl.length; i++) {
    var placeholder = countryPlaceholderEl[i].getAttribute('data-country-placeholder');

    if (placeholder && placeholder != '' && data['summary'][placeholder]) {
      countryPlaceholderEl[i].innerText = parseInt(data['summary'][placeholder]).toLocaleString();
    }
  }
}

ready(
  function() {
    var url = 'https://api.quarantine.country/api/v1/summary/region?region=' + countryFeedKey;

    fetchData(url)
      .then(fillPlaceholders);

    setInterval(
      function() {
        fetchData(url)
          .then(fillPlaceholders);
      },
      10000
    );
  }
);

//Rain effect from here//
// Ref canvas & get context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Resize canvas
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Variables
let drops = [];
const dropColour = "#5C97BF";
const dropLengths = [10, 12, 14, 16, 18, 20, 22];
const dropSkews = [-2, -1, 0, 1, 2];
const maxDrops = 500;

// Raindrop class
class Droplet {
  constructor(x, y, length, skew) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.skew = skew;
  }
  // Move method
  move() {
    // Increment x & y 
    this.y += this.length / 2;
    this.x += this.skew / 5;
    // Set limits
    if (this.y > height) {
      this.y = 0;
    }
    if (this.x > width || this.x < 0) {
      this.y = 0;
      this.x = Math.floor(Math.random() * width);
    }
  }
  // Draw method
  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.skew, this.y + this.length);
    ctx.strokeStyle = dropColour;
    ctx.stroke();
  }
}

// Create drops and push to array
for (let i = 0; i < maxDrops; i++) {
  let instance = new Droplet(
    Math.floor(Math.random() * width),
    Math.floor(Math.random() * height),
    randVal(dropLengths),
    randVal(dropSkews)
  );
  drops.push(instance);
}

// Animation loop
function loop() {
  // Clear Canvas  
  ctx.clearRect(0, 0, width, height);
  // Draw / Move drops
  for (let drop of drops) {
    drop.move();
    drop.draw(ctx);
  }
  // Animation Frame
  requestAnimationFrame(loop)
}
// Begin animation
loop();


// Resize canvas - responsive
window.addEventListener('resize', resize);
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}


// Function for random array values
function randVal(array) {
  return array[Math.floor(Math.random() * array.length)];
}