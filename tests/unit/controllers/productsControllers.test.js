const { expect } = require('chai');
const sinon = require('sinon');

const productsController = require('../../../controllers/productsControllers');
const productsService = require('../../../services/productsServices');

describe('Controller Layer - getAll products route', () => {
  describe('when it returns correctly', async () => {
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
      expect(response.status.calledWith(200)).to.be.equal(true);
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
      expect(response.status.calledWith(404)).to.be.true;
    });

    it('it shows the error message', async () => {
      await productsController.getAll(request, response);
      expect(response.json.calledWith({ message: 'Products not found' })).to.be.true;
    });
  });
});
