const { expect } = require('chai');
const sinon = require('sinon');

const httpStatusCode = require('../../../helpers/httpStatusCode');

const salesProductsServices = require('../../../services/salesProductsServices');
const salesProductsControllers = require('../../../controllers/salesProductsControllers');

describe('Controller Layer - sales products controller', () => {
  describe('when it returns correctly', () => {
    const request = {};
    const response = {};

    const MOCKED_RETURN = {
      "id": 1,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    };

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'create').resolves(MOCKED_RETURN);
    });

    after(() => {
      salesProductsServices.create.restore();
    });

    it('it\'s called with the status code 201', async () => {
      await salesProductsControllers.create(request, response);
      expect(response.status.calledWith(httpStatusCode.CREATED)).to.be.true;
    });
  });

  describe('when the product is not found', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'create').resolves(false);
    });

    after(() => {
      salesProductsServices.create.restore();
    });

    it('it\'s called with the status code 404', async () => {
      await salesProductsControllers.create(request, response);
      expect(response.status.calledWith(httpStatusCode.NOT_FOUND)).to.be.true;
    });
  });

  describe('when the function throws an error', async () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'create').throws();
    });

    after(() => {
      salesProductsServices.create.restore();
    });

    it('it\'s called with the status code 500', async () => {
      try {
        const sales = await salesProductsControllers.create(request, response);
        expect(sales).to.throw();
      } catch (err) {
        expect(response.status.calledWith(httpStatusCode.INTERNAL_SERVER)).to.be.true;
      }
    });
  });
});
