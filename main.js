 
//api.openweathermap.org/data/2.5/weather?q=tehran&appid={1c2fa46ca980999d48fd5df824c8edd5}&unit=metric 

const form = document.querySelector(".top-banner form");//select top-banrt fotm
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");//message error citis
const list = document.querySelector(".ajax-section .cities");//list citits

const apiKey = "edc228562ac0a8aa3116d41c0687cf56";// apikey in openweather

form.addEventListener("submit", e => {
    e.preventDefault();//for dont reload site 
    let inputVal = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`
    fetch(url)//request ajax 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const { main, name, sys, weather } = data; //destrature
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
            <h2 class='city-name' data-name=${name},${sys.country}>
                <span>${name}</span>
                <span>${sys.country}</span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}</div>
            <figure>
                <img class='city-icon' src='${icon}' alt ='city' >
                <figurecaption>${weather[0]["description"]}</figurecaption>
            </figure>
            `;
            li.innerHTML = markup;
            list.appendChild(li);//add in last citis
            msg.innerText = ""
        })
        .catch(() => {//handel error
            msg.innerText = "Search for a valid city"
        })
    input.value = ""//delete after serch
})




///////////////////////
var points = [],
    velocity2 = 5, // velocity squared
    canvas = 
document.getElementById('container'),
  context = canvas.getContext('2d'),
  radius = 5,
  boundaryX = 200,
  boundaryY = 200,
  numberOfPoints = 30;

init();

function init() {
  // create points
  for (var i = 0; i<numberOfPoints; i++) {
    createPoint();
  }
  // create connections
  for (var i = 0, l=points.length; i<l; i++) {
    var point = points[i];
    if(i == 0) {
      points[i].buddy = points[points.length-1];
    } else {
      points[i].buddy = points[i-1];
    }
  }
  
  // animate
  animate();
}

setTimeout(() => {
    const container = document.getElementById('container');
    container.style.display = "none"

    const sections = document.getElementsByTagName('section');
    for (var i = 0; i<sections.length; i++) {
        console.log(sections[i]);
        sections[i].style.display = 'block'
    }
}, 2000)

function createPoint() {
  var point = {}, vx2, vy2;
  point.x = Math.random()*boundaryX;
  point.y = Math.random()*boundaryY;
  // random vx 
  point.vx = (Math.floor(Math.random())*2-1)*Math.random();
  vx2 = Math.pow(point.vx, 2);
  // vy^2 = velocity^2 - vx^2
  vy2 = velocity2 - vx2;
  point.vy = Math.sqrt(vy2) * (Math.random()*2-1);
  points.push(point);
}

function resetVelocity(point, axis, dir) {
  var vx, vy;
  if(axis == 'x') {
    point.vx = dir*Math.random();  
    vx2 = Math.pow(point.vx, 2);
  // vy^2 = velocity^2 - vx^2
  vy2 = velocity2 - vx2;
  point.vy = Math.sqrt(vy2) * (Math.random()*2-1);
  } else {
    point.vy = dir*Math.random();  
    vy2 = Math.pow(point.vy, 2);
  // vy^2 = velocity^2 - vx^2
  vx2 = velocity2 - vy2;
  point.vx = Math.sqrt(vx2) * (Math.random()*2-1);
  }
}

function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = '#97badc';
  context.fill();  
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = '#8ab2d8'
  context.stroke();
}  

function draw() {
  for(var i =0, l=points.length; i<l; i++) {
    // circles
    var point = points[i];
    point.x += point.vx;
    point.y += point.vy;
    drawCircle(point.x, point.y);
    // lines
    drawLine(point.x, point.y, point.buddy.x, point.buddy.y);
    // check for edge
    if(point.x < 0+radius) {
      resetVelocity(point, 'x', 1);
    } else if(point.x > boundaryX-radius) {
      resetVelocity(point, 'x', -1);
    } else if(point.y < 0+radius) {
      resetVelocity(point, 'y', 1);
    } else if(point.y > boundaryY-radius) {
      resetVelocity(point, 'y', -1);
    } 
  }
}

function animate() {
  context.clearRect ( 0 , 0 , 200 , 200 );
  draw();
  requestAnimationFrame(animate);
}


console.log("hello")