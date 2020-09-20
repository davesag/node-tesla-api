const makeExistenceTest = require('../../../../helpers/makeExistenceTest')
const makeGenericAPICallTest = require('../../../../helpers/makeGenericAPICallTest')
const vehicles = require('../../../../../src/api/v1/vehicles/index')

describe('src/api/v1/vehicles/index', () => {
  const genericPosts = {
    autoConditioningStart: 'command/auto_conditioning_start',
    autoConditioningStop: 'command/auto_conditioning_stop',
    chargeMaxRange: 'command/charge_max_range',
    chargePortDoorClose: 'command/charge_port_door_close',
    chargePortDoorOpen: 'command/charge_port_door_open',
    chargeStandard: 'command/charge_standard',
    chargeStart: 'command/charge_start',
    chargeStop: 'command/charge_stop',
    doorLock: 'command/door_lock',
    doorUnlock: 'command/door_unlock',
    flashLights: 'command/flash_lights',
    honkHorn: 'command/honk_horn',
    resetValetPin: 'command/reset_valet_pin',
    speedLimitActivate: 'command/speed_limit_activate',
    speedLimitClearPin: 'command/speed_limit_clear_pin',
    speedLimitDeactivate: 'command/speed_limit_deactivate',
    speedLimitSetLimit: 'command/speed_limit_set_limit',
    upcomingCalendarEntries: 'command/upcoming_calendar_entries',
    wake: 'wake_up'
  }

  const genericGets = {
    chargeState: 'data_request/charge_state',
    climateState: 'data_request/climate_state',
    driveState: 'data_request/drive_state',
    guiSettings: 'data_request/gui_settings',
    mobileEnabled: 'mobile_enabled',
    nearbyChargingSites: 'nearby_charging_sites',
    serviceData: 'service_data',
    vehicleConfig: 'data_request/vehicle_config',
    vehicleData: 'vehicle_data',
    vehicleState: 'data_request/vehicle_state'
  }

  const custom = [
    'list',
    'remoteStartDrive',
    'setChargeLimit',
    'setTemps',
    'setValetMode',
    'sunRoofControl',
    'triggerHomelink',
    'vehicle'
  ]

  const allFunctions = [...Object.keys(genericPosts), ...Object.keys(genericGets), ...custom]

  allFunctions.forEach(makeExistenceTest(vehicles, 'function'))

  const postTest = makeGenericAPICallTest('Post')
  Object.keys(genericPosts).forEach(name => postTest(name, genericPosts[name]))

  const getTest = makeGenericAPICallTest('Get')
  Object.keys(genericGets).forEach(name => getTest(name, genericGets[name]))
})
