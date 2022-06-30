const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModels');
const productsService = require('../../../services/productsServices');

describe('Services Layer - getAll function', () => {
  const mockedData = [{
    'id': 1,
    'name': "Martelo de Thor",
  }];

  before(() => {
    sinon.stub(productsModel, 'getAll').resolves(mockedData);
  });

  after(() => {
    productsModel.getAll.restore();
  });

  it('returns an array', async () => {
    const result = await productsService.getAll();
    expect(result).to.be.a('array');
  });

  it('return the results', async () => {
    const result = await productsService.getAll();
    expect(result).to.deep.equal(mockedData);
  });
});

describe('Services Layer - getById function', () => {
  describe('when the product exists', () => {
    const PRODUCT_ID = 1;

    const mockedData = {
      'id': 1,
      'name': "Martelo de Thor",
    };

    before(() => {
      sinon.stub(productsModel, 'getById').resolves([mockedData]);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('returns an object', async () => {
      const result = await productsService.getById(PRODUCT_ID);
      expect(result).to.be.a('object');
    });

    it('returns the product data', async () => {
      const result = await productsService.getById(PRODUCT_ID);
      expect(result).to.deep.equal(mockedData);
    });
  });
});

describe('Services Layer - create product function', () => {
  const NAME = 'Biscoitim';

  const PRODUCT_MOCK = {
    'id': 1,
    'name': NAME,
  };

  before(() => {
    sinon.stub(productsModel, 'create').resolves(PRODUCT_MOCK);
  });

  after(() => {
    productsModel.create.restore();
  });

  it('returns the product', async () => {
    const result = await productsService.create(NAME);
    expect(result).to.be.equal(PRODUCT_MOCK);
  });
});