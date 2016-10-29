var five = require('johnny-five');
var board = new five.Board('COM3');

board.on('ready', function ready() {

    // Q1 Lチカ
    // var led = new five.Led(13);
    // led.blink(300);

    // Q2 サーボを3秒間0-180度に回転後停止、90度に戻す
    // var servo = new five.Servo(9);
    // servo.sweep({
    //     'range': [45, 135],
    //     'interval': 10000
    // });

    // Q3
    // 200mphでモーターを回転させます
    // board.waitを使い2秒回転後に停止させましょう
    // 1秒後に回転再開させます
    // この流れを無限ループさせてください
    // var motor = new five.Motor(9,10);
    var motor;
      motor = new five.Motor({
    pins: {
      pwm: 9,
      dir: 12
    },
    invertPWM: true
  });
    board.repl.inject({
    motor: motor
  });
    // motor.reverse(250);
    // function exec () {
    //     board.wait(5000, function stop() {
    //         motor.stop();
    //         board.wait(1000, function start() {
    //             motor.forward(150);
    //             exec();
    //         });
    //     });
    // }
    // exec();
  var mode = 'f';
  motor.on("start", function() {

    board.wait(2000, function() {
      motor.stop();
    });
  });

  motor.on("stop", function() {

    board.wait(2000, function() {
      if (mode === 'f') {
        mode = 'r';
        motor.reverse(255);
      } else {
        mode = 'f';
        motor.forward(255);
      }
    });
  });

  motor.forward(255);




    // ライトスイッチ (9問中4問目)
    // スイッチを押すとLEDのon/offが切り替わるプログラムを書きましょう
    // ボタンを5pinに、LEDを9pinに接続しましょう
    // Buttonクラスとpressイベントを使い、LEDのon/offを切り替えましょう
    // var button = new five.Button(8);
    // var led = new five.Led(5);
    // var brightness = 0;
    // led.stop().off();

    // button.on('press', function toggleLed(){
    //     if (brightness === 0) {
    //         brightness = 255;
    //         led.on();
    //     } else if (brightness <= 15) {
    //         brightness = 0;
    //         led.fadeOut(1000);
    //     } else {
    //     brightness -= 80;
    //         led.brightness(brightness);
    //     }
    // });

    // https://github.com/soundanalogous/AdvancedFirmata
    // var stepper = new five.Stepper({
    //     type: five.Stepper.TYPE.FOUR_WIRE,
    //     stepsPerRev: 200,
    //     pins: [10, 11, 12, 13]
    // });

//     stepper.step({ steps: 2000, direction: 1, accel: 1600, decel: 1600 }, function() {
//   console.log("Done stepping!");
// });

    // ストリートランプ (9問中5問目)
    // 暗くなると点灯する街灯を作りましょう
    // 照度センサとLEDを使いましょう
    // 照度センサをA0に、LEDを9pinに接続しましょう
    // 照度センサの値が600以上のときにLEDが点くようにしましょう
    // var sensor = new five.Sensor('A0');
    // var led = new five.Led(9);
    // sensor.booleanAt(600);
    // sensor.on('change', function onChange() {
    //     if (sensor.boolean) {
    //         led.on();
    //     } else {
    //         led.off();
    //     }
    // });

    // ピング ベル (9問中6問目)
    // メッセージを受信すると音が鳴るUDPサーバーを作りましょう
    // ブザーを8pinに接続します
    // dgramというNodeモジュールを使い、 udp4 ソケットを作ります
    // 1337 ポートでメッセージを待ち受けるサーバーにしましょう
    // メッセージを受信したらブザーを鳴らしましょう
    // var dgram = require('dgram');
    // var server = dgram.createSocket('udp4');
    // var piezo = new five.Piezo(8);

    // server.on('message', function onRecieveMessage(msg, rinfo) {
    //     piezo.play({
    //         song: "C D F D A - A A A A G G G G - - C D F D G - G G G G F F F F - -",
    //         beats: 1 / 4,
    //         tempo: 100
    //     });
    // });
    // server.bind(1337);
});