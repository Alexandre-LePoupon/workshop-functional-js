let chalk = require('chalk');

let checkpointsService = require('./staticCheckpoints');


let calculateDistanceWithRssi = rssi => {
  var txPower = -59; // hard coded power value. Usually ranges between -59 to -65
  if (rssi == 0) {
    return -1.0;
  }
  var ratio = rssi * 1.0 / txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  } else {
    var distance = (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
    return distance;
  }
};

let transformCheckpoint = (checkpoint) => {
  if (checkpoint) {
    var newCheckpoint = {
      uuid: checkpoint.uuid,
      connectable: checkpoint.connectable,
      state: checkpoint.state,
      serviceData: checkpoint.advertisement.serviceData,
      serviceUuids:checkpoint.advertisement.serviceUuids,
      distance: calculateDistanceWithRssi(checkpoint.rssi)
    };
    // Everything is ok
    return true;
  } else {
    return false;
  }
};

let showCheckpoint = (checkpoint, index) => {
  console.log(chalk.green('CHECKPOINT'), chalk.yellow(index + 1));
  for (var property in checkpoint) {
    if (checkpoint.hasOwnProperty(property)) {
      console.log(chalk.cyan(property.toUpperCase()), checkpoint[property]);
    }
  }
  console.log('\n');
};

let run = () => {
  let checkpoints = checkpointsService.getCheckpoints();
  for (var i = 0; i < checkpoints.length; i++) {
    let checkpoint = checkpoints[i];
    transformCheckpoint(checkpoint);
    showCheckpoint(checkpoint, i);
  }
};

module.exports = {
  transformCheckpoint: transformCheckpoint,
  showCheckpoint: showCheckpoint,
  run: run
};