const { expect } = require('chai')
const { match, stub, spy } = require('sinon')
const proxyquire = require('proxyquire')

const { transportOptions: defaults, defaultHeaders } = require('../../../src/defaults')

describe('utils/transport', () => {
  const transformResponse = stub()
  const transformError = stub()
  const makeTransformError = stub().returns(transformError)
  const axios = stub()
  axios.get = stub()
  axios.post = stub()
  axios.interceptors = {
    response: {
      use: spy()
    }
  }
  axios.create = stub().returns(axios)

  const { getTransport, close } = proxyquire('../../../src/utils/transport', {
    axios,
    './makeTransformError': makeTransformError,
    './transformResponse': transformResponse
  })

  const resetHistory = () => {
    axios.resetHistory()
    axios.create.resetHistory()
    axios.get.resetHistory()
    axios.post.resetHistory()
    axios.interceptors.response.use.resetHistory()
    makeTransformError.resetHistory()
  }

  describe('#getTransport', () => {
    const reset = () => {
      close()
      resetHistory()
    }

    context('before a transport has been got before', () => {
      context('with no options', () => {
        before(() => {
          getTransport()
        })

        after(reset)

        it('called axios.create with defaults', () => {
          expect(axios.create).to.have.been.calledOnceWith(
            match({
              ...defaults,
              headers: defaultHeaders
            })
          )
        })

        it('called makeTransformError with axios', () => {
          expect(makeTransformError).to.have.been.calledOnceWith(axios)
        })

        it('called axios.interceptors.response.use', () => {
          expect(axios.interceptors.response.use).to.have.been.calledOnceWith(
            transformResponse,
            transformError
          )
        })
      })

      context('with options', () => {
        const headers = { Authorization: 'Bearer 12345' }
        before(() => {
          getTransport({ headers })
        })

        after(reset)

        it('called axios.create with extra header', () => {
          expect(axios.create).to.have.been.calledOnceWith(
            match({
              ...defaults,
              headers: { ...defaultHeaders, ...headers }
            })
          )
        })

        it('called makeTransformError with axios', () => {
          expect(makeTransformError).to.have.been.calledOnceWith(axios)
        })

        it('called axios.interceptors.response.use', () => {
          expect(axios.interceptors.response.use).to.have.been.calledOnceWith(
            transformResponse,
            transformError
          )
        })
      })

      context('called twice', () => {
        before(() => {
          getTransport()
          getTransport()
        })

        after(reset)

        it('only called axios.create once', () => {
          expect(axios.create).to.have.been.calledOnce
        })
      })
    })
  })

  describe('#get', () => {
    const path = 'test'
    const expected = 'expected'
    let result

    before(async () => {
      axios.get.resolves(expected)
      const { get } = getTransport()
      result = await get(path)
    })

    it('called axios.get with the path', () => {
      expect(axios.get).to.have.been.calledOnceWith(path)
    })

    it('returned the expected result', () => {
      expect(result).to.equal(expected)
    })
  })

  describe('#post', () => {
    const path = 'test'
    const data = 'some data'
    const expected = 'expected'
    let result

    before(async () => {
      axios.post.resolves(expected)
      const { post } = getTransport()
      result = await post(path, data)
    })

    it('called axios.post with the path and data', () => {
      expect(axios.post).to.have.been.calledOnceWith(path, data)
    })

    it('returned the expected result', () => {
      expect(result).to.equal(expected)
    })
  })
})
