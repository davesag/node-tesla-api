const { expect } = require('chai')
const { spy } = require('sinon')
const proxyquire = require('proxyquire')

const makeGenericApiCallTest = method => {
  const apiCall = `../../../utils/genericAuthenticated${method}`

  return (name, endpoint) => {
    const api = `api/v1/vehicles/${name}`

    describe(`src/${api}`, () => {
      const generic = spy()

      proxyquire(`../../src/${api}`, { [apiCall]: generic })

      it(`called genericAuthenticated${method} once with endpoint ${endpoint}`, () => {
        expect(generic).to.have.been.calledOnceWith(endpoint)
      })
    })
  }
}

module.exports = makeGenericApiCallTest
