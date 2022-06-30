const { expect } = require('chai');
const sinon = require('sinon');

const httpStatusCode = require('../../../helpers/httpStatusCode');

const productsController = require('../../../controllers/productsControllers');
const productsService = require('../../../services/productsServices');

describe('Controller Layer - getAll products route', () => {
  describe('when it returns correctly', () => {
    const response = {};
    const request = {};

    const mockedData = [{
      'id': 1,
      'name': "Martelo de Thor",
    }];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(mockedData);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('it\'s called with the status code 200', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(httpStatusCode.OK)).to.be.equal(true);
    });

    it('it\'s called with the correct data', async () => {
      await productsController.getAll(request, response);
      expect(response.json.calledWith(mockedData)).to.be.equal(true);
    });
  });

  describe('when the request fails', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').resolves(false);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('it\'s called with the status code 404', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(httpStatusCode.NOT_FOUND)).to.be.true;
    });

    it('it shows the error message', async () => {
      await productsController.getAll(request, response);
      expect(response.json.calledWith({ message: 'Products not found' })).to.be.true;
    });
  });

  describe('when the function throws', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getAll').throws();
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('it\'s called with the status code 500', async () => {
      try {
        const products = await productsController.getAll(request, response);
        expect(products).to.throw();
      } catch (error) {
        expect(response.status.calledWith(httpStatusCode.INTERNAL_SERVER)).to.be.true;
      }
    });
  });
});

describe('Controller Layer - getById function', () => {
  describe('when the product exists', () => {
    const response = {};
    const request = {};

    const mockedData = {
      'id': 1,
      'name': "Martelo de Thor",
    };

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves(mockedData);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('it\'s called with the status code 200', async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(httpStatusCode.OK)).to.be.true;
    });

    it('it\'s called with the correct data', async () => {
      await productsController.getById(request, response);
      expect(response.json.calledWith(mockedData)).to.be.true;
    });
  });

  describe('when the product doesn\'t exist', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').resolves(false);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('it\'s called with the status code 404', async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(httpStatusCode.NOT_FOUND)).to.be.true;
    });
  });

  describe('when the request fails', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'getById').throws(new Error('Internal server error'));
    });

    after(() => {
      productsService.getById.restore();
    });

    it('it\'s called with the status code 500', async () => {
      try {
        const product = await productsController.getById(request, response);
        expect(product).to.throw(new Error('Internal server error'));
      } catch (err) {
        expect(response.status.calledWith(httpStatusCode.INTERNAL_SERVER)).to.be.true;
      }
    });
  });
});
