
var http = require('http');
var url = require('url');
var fs = require('fs');

var five = require("johnny-five");
var board = new five.Board('COM3');
var motor;

var speed = 0;
var direction = 'forward';

board.on("ready", function() {
  motor = new five.Motor({
    pins: {
      pwm: 11,
      dir: 12,
      cdir: 13
    }
  });
  board.repl.inject({
    motor: motor
  });

  setInterval(function(){
    addSpeed(-128);
    driveMotor();
  },
  1000);
});

http.createServer(function (req, res) {
  var pathName = url.parse(req.url).pathname;
  switch (pathName) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync('./ui.html', 'UTF-8'));
      break;
    case '/forward':
      setDirection('forward');
      addSpeed(64);
      driveMotor();
      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end('{"status":"OK"}');
      break;
    case '/reverse':
      setDirection('reverse');
      addSpeed(64);
      driveMotor();
      res.writeHead(200, { 'Content-Type': 'text/json' });
      res.end('{"status":"OK"}');
      break;
    // case '/stop':
    //   motor.stop();
    //   res.writeHead(200, { 'Content-Type': 'text/json' });
    //   res.end('{"status":"OK"}');
    //   break;
  }

}).listen(80);

function driveMotor() {
  if (speed === 0) {
    motor.stop();
  } else if (direction === 'forward') {
    motor.forward(speed);
  } else {
    motor.reverse(speed);
  }
}

function addSpeed(_speed) {
  speed += _speed;
  if (speed > 255) {
    speed = 255;
  }
  if (speed < 0) {
    speed = 0;
  }
}

function setDirection(_direction) {
  direction = _direction;
}




