const { expect } = require('chai');
const sinon = require('sinon');

const httpStatusCode = require('../../../helpers/httpStatusCode');

const salesProductsServices = require('../../../services/salesProductsServices');
const salesProductsControllers = require('../../../controllers/salesProductsControllers');

describe('Controller Layer - creating a sale', () => {
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

describe('Controller Layer - listing all sales', () => {
  describe('when the function works correctly', () => {
    const request = {};
    const response = {};

    const MOCKED_SERVICES_RETURN = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
    ];


    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'getAll').resolves(MOCKED_SERVICES_RETURN);
    });

    after(() => {
      salesProductsServices.getAll.restore();
    });

    it('it\'s called with the status code 200', async () => {
      await salesProductsControllers.getAll(request, response);
      expect(response.status.calledWith(httpStatusCode.OK)).to.be.true;
    });
  });

  describe('when the function throws an error', () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'getAll').throws();
    });

    after(() => {
      salesProductsServices.getAll.restore();
    });

    it('it\'s called with the status code 500', async () => {
      try {
        const result = await salesProductsControllers.getAll(request, response);
        expect(result).to.throw();
      } catch (err) {
        expect(response.status.calledWith(httpStatusCode.INTERNAL_SERVER)).to.be.true;
      }
    });
  });
});

describe('Controller Layer - listing sale by id', () => {
  describe('when the id is valid', () => {
    const request = {};
    const response = {};

    const MOCKED_SERVICES_RETURN = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
    ];


    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'getById').resolves(MOCKED_SERVICES_RETURN);
    });

    after(() => {
      salesProductsServices.getById.restore();
    });

    it('it\'s called with the status code 200', async () => {
      await salesProductsControllers.getById(request, response);
      expect(response.status.calledWith(httpStatusCode.OK)).to.be.true;
    });
  });

  describe('when the id is not valid', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: 2 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'getById').resolves(false);
    });

    after(() => {
      salesProductsServices.getById.restore();
    });

    it('it\'s called with the status code 404', async () => {
      await salesProductsControllers.getById(request, response);
      expect(response.status.calledWith(httpStatusCode.NOT_FOUND)).to.be.true;
    });
  });

  describe('when the function throws an error', async () => {
    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'getById').throws();
    });

    after(() => {
      salesProductsServices.getById.restore();
    });

    it('it\'s called with the status code 500', async () => {
      try {
        const result = await salesProductsControllers.getById(request, response);
        expect(result).to.throw();
      } catch (err) {
        expect(response.status.calledWith(httpStatusCode.INTERNAL_SERVER)).to.be.true;
      }
    });
  });
});

describe('Controller Layer - deleting sale by id', () => {
  describe('when the id is valid', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'deleteById').resolves(false);
    });

    after(() => {
      sinon.restore();
    });

    it('is called with the status code 404', async () => {
      await salesProductsControllers.deleteById(request, response);
      expect(response.status.calledWith(httpStatusCode.NOT_FOUND)).to.be.true;
    });
  });

  describe('when the id is not valid', () => {
    const request = {};
    const response = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesProductsServices, 'deleteById').resolves(true);
    });

    after(() => {
      sinon.restore();
    });

    it('is called with the status code 204', async () => {
      await salesProductsControllers.deleteById(request, response);
      expect(response.status.calledWith(httpStatusCode.NO_CONTENT)).to.be.true;
    });
  });
});
