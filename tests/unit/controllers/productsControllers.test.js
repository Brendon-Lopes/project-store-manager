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

  describe('when the function throws an error', () => {
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

describe('Controller Layer - create product', () => {
  describe('when the item is created succesfully', () => {
    const response = {};
    const request = {};

    const PRODUCT_MOCK = {
      'id': 1,
      'name': 'Biscoitim',
    };

    before(() => {
      request.body = { name: 'Biscoitim' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'create').resolves(PRODUCT_MOCK);
    });

    after(() => {
      productsService.create.restore();
    });

    it('is called with the code 201', async () => {
      await productsController.create(request, response);
      expect(response.status.calledWith(httpStatusCode.CREATED)).to.be.true;
    });
  });

  describe('when the function throws an error', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = { name: 'Biscoitim' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'create').throws(new Error('Internal server error'));
    });

    after(() => {
      productsService.create.restore();
    });

    it('it\'s called with the status code 500', async () => {
      try {
        const product = await productsController.create(request, response);
        expect(product).to.throw(new Error('Internal server error'));
      } catch (err) {
        expect(response.status.calledWith(httpStatusCode.INTERNAL_SERVER)).to.be.true;
      }
    });
  });
});

describe('Controller Layer - update product', () => {
  describe('when the item is updated succesfully', () => {
    const response = {};
    const request = {};

    const PRODUCT_MOCK = {
      'id': 1,
      'name': 'Biscoitim',
    };

    before(() => {
      request.params = { id: 1 };
      request.body = { name: 'Biscoitim' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateById').resolves(PRODUCT_MOCK);
    });

    after(() => {
      productsService.updateById.restore();
    });

    it('is called with the code 200', async () => {
      await productsController.updateById(request, response);
      expect(response.status.calledWith(httpStatusCode.OK)).to.be.true;
    });
  });

  describe('when the product doesn\'t exist', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      request.body = { name: 'Biscoitim' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateById').resolves(false);
    });

    after(() => {
      productsService.updateById.restore();
    });

    it('it\'s called with the status code 404', async () => {
      await productsController.updateById(request, response);
      expect(response.status.calledWith(httpStatusCode.NOT_FOUND)).to.be.true;
    });

    it('it shows the error message', async () => {
      await productsController.updateById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
    });
  });

  describe('when the request fails', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      request.body = { name: 'Biscoitim' };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'updateById').throws(new Error('Internal server error'));
    });

    after(() => {
      productsService.updateById.restore();
    });

    it('it\'s called with the status code 500', async () => {
      try {
        const product = await productsController.updateById(request, response);
        expect(product).to.throw(new Error('Internal server error'));
      } catch (err) {
        expect(response.status.calledWith(httpStatusCode.INTERNAL_SERVER)).to.be.true;
      }
    });
  });
});

describe('Controller Layer - delete product', () => {
  describe('when the item is deleted succesfully', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'deleteById').resolves(true);
    });

    after(() => {
      productsService.deleteById.restore();
    });

    it('is called with the code 204', async () => {
      await productsController.deleteById(request, response);
      expect(response.status.calledWith(httpStatusCode.NO_CONTENT)).to.be.true;
    });
  });

  describe('when the product does not exist', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'deleteById').resolves(false);
    });

    after(() => {
      productsService.deleteById.restore();
    });

    it('it\'s called with the status code 404', async () => {
      await productsController.deleteById(request, response);
      expect(response.status.calledWith(httpStatusCode.NOT_FOUND)).to.be.true;
    });

    it('it shows the error message', async () => {
      await productsController.deleteById(request, response);
      expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
    });
  });

  describe('when the function throws an error', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, 'deleteById').throws(new Error('Internal server error'));
    });

    after(() => {
      productsService.deleteById.restore();
    });

    it('it\'s called with the status code 500', async () => {
      try {
        const product = await productsController.deleteById(request, response);
        expect(product).to.throw(new Error('Internal server error'));
      } catch (err) {
        expect(response.status.calledWith(httpStatusCode.INTERNAL_SERVER)).to.be.true;
      }
    });
  });
});

describe('Controller Layer - search by name', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('when there is no error', () => {
    const request = {};
    const response = {};

    const PRODUCTS_MOCK = [{
      id: 1,
      name: 'Martelo de Thor',
    }];

    describe('the response', () => {
      before(() => {
        request.query = { q: 'Martelo' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'searchByName').resolves(PRODUCTS_MOCK);
      });

      it('is called with status code 200', async () => {
        await productsController.searchByName(request, response);
        expect(response.status.calledWith(httpStatusCode.OK)).to.be.true;
      });

      it('returns the result', async () => {
        await productsController.searchByName(request, response);
        expect(response.json.calledWith(PRODUCTS_MOCK)).to.be.true;
      });
    });
  });
});
