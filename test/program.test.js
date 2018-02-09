var expect = require('chai').expect;

var transformCheckpoint = require('../src/program').transformCheckpoint;

describe('Function transformCheckpoint', function() {

  it('Function transformCheckpoint without parameter should return null', function() {
    expect(transformCheckpoint()).to.be.null;
  });

  it('Function transformCheckpoint with parameter should not mutate the parameter', function() {
  	
  	var checkpoint = {
			id: 'whataw0nd3rful1d',
			uuid: 'whataw0nd3rful1d',
			address: 'unknown',
			addressType: 'unknown',
			connectable: true,
			advertisement: {
				localName: undefined,
				txPowerLevel: undefined,
				manufacturerData: undefined,
				serviceData: [],
				serviceUuids: [ 'abcd' ]
			},
			rssi: -66,
			services: null,
			state: 'outofcontrol'
		};

		var checkpointMutated = {
			id: 'whataw0nd3rful1d',
			uuid: 'whataw0nd3rful1d',
			address: 'unknown',
			addressType: 'unknown',
			connectable: true,
			advertisement: {
				localName: undefined,
				txPowerLevel: undefined,
				manufacturerData: undefined,
				serviceData: [],
				serviceUuids: [ 'abcd' ]
			},
			rssi: -66,
			services: null,
			state: 'outofcontrol'
		};

	transformCheckpoint(checkpointMutated);
	expect(checkpoint).to.eql(checkpointMutated);
	
});
	
	it('Function transformCheckpoint output has a different reference than input', function() {
  	
  	var checkpoint = {
			id: 'whataw0nd3rful1d',
			uuid: 'whataw0nd3rful1d',
			address: 'unknown',
			addressType: 'unknown',
			connectable: true,
			advertisement: {
				localName: undefined,
				txPowerLevel: undefined,
				manufacturerData: undefined,
				serviceData: [],
				serviceUuids: [ 'abcd' ]
			},
			rssi: -66,
			services: null,
			state: 'outofcontrol'
		};

		expect(checkpoint).to.not.equal(transformCheckpoint(checkpoint));
	
	});

});