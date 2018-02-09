let chalk = require('chalk');

let checkpointsService = require('./staticCheckpoints');

let _ = require('lodash');

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

    // // Get back essential properties
    // checkpoint.serviceData = checkpoint.advertisement.serviceData;
    // checkpoint.serviceUuids = checkpoint.advertisement.serviceUuids;
    // // Transform data about distance
    // checkpoint.distance = calculateDistanceWithRssi(checkpoint.rssi);
    // // Clean uninteresting properties
    // delete checkpoint.id;
    // delete checkpoint.address;
    // delete checkpoint.addressType;
    // delete checkpoint.advertisement;
    // delete checkpoint.rssi;
    // delete checkpoint.services;

    var newCheckpoint = {
      uuid: checkpoint.uuid,
      connectable: checkpoint.connectable,
      state: checkpoint.state,
      serviceData: checkpoint.advertisement.serviceData,
      serviceUuids:checkpoint.advertisement.serviceUuids,
      distance: calculateDistanceWithRssi(checkpoint.rssi)
    };
    
    // return true;
    return newCheckpoint;
  } else {
    return null;
  }
};

let showCheckpoint = (checkpoint, index) => {
  console.log(chalk.green('CHECKPOINT'), chalk.yellow(index + 1));

  // var ret = _.chain(checkpoint)
  //   .map(function(chr) {
  //     console.log(chalk.cyan(chr));
  //   })
  //   .value();

  for (var property in checkpoint) {
    if (checkpoint.hasOwnProperty(property)) {
      console.log(chalk.cyan(property.toUpperCase()), checkpoint[property]);
    }
  }

  console.log('\n');

  // return ret;
};

let run = () => {
  let checkpoints = checkpointsService.getCheckpoints();
  checkpoints.map((checkpoint,index) => showCheckpoint(transformCheckpoint(checkpoint), index));
};

module.exports = {
  transformCheckpoint: transformCheckpoint,
  showCheckpoint: showCheckpoint,
  run: run
};