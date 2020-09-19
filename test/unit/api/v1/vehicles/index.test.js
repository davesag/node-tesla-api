const makeExistenceTest = require('../../../../helpers/makeExistenceTest')
const vehicles = require('../../../../../src/api/v1/vehicles/index')

describe('src/api/v1/vehicles/index', () => {
  ;[
    'autoConditioningStart',
    'autoConditioningStop',
    'chargeMaxRange',
    'chargePortDoorClose',
    'chargePortDoorOpen',
    'chargeStandard',
    'chargeStart',
    'chargeState',
    'chargeStop',
    'climateState',
    'doorLock',
    'doorUnlock',
    'driveState',
    'flashLights',
    'guiSettings',
    'honkHorn',
    'list',
    'mobileEnabled',
    'nearbyChargingSites',
    'remoteStartDrive',
    'resetValetPin',
    'serviceData',
    'setChargeLimit',
    'setTemps',
    'setValetMode',
    'speedLimitActivate',
    'speedLimitClearPin',
    'speedLimitDeactivate',
    'speedLimitSetLimit',
    'sunRoofControl',
    'triggerHomelink',
    'upcomingCalendarEntries',
    'vehicle',
    'vehicleConfig',
    'vehicleData',
    'vehicleState',
    'wake'
  ].forEach(makeExistenceTest(vehicles, 'function'))
})
