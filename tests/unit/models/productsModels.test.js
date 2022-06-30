const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../helpers/connection');
const productsModel = require('../../../models/productsModels');

describe('Model Layer - Get all products from DB', () => {
  const mockedData = [{
    'id': 1,
    'name': "Martelo de Thor",
  }];

  before(() => {
    sinon.stub(connection, 'execute').resolves([mockedData]);
  });

  after(async () => {
    connection.execute.restore();
  });

  it('returns an array', async () => {
    const result = await productsModel.getAll();
    expect(result).to.be.a('array');
  });

  it('returns correcly the results', async () => {
    const result = await productsModel.getAll();
    expect(result).to.deep.equal(mockedData);
  });
});

describe('Model Layer - Get product by id from DB', () => {
  describe('When the product exists', () => {
    const PRODUCT_ID = 1;

    const mockedData = [{
      'id': 1,
      'name': "Martelo de Thor",
    }];

    before(async () => {
      sinon.stub(connection, 'execute').resolves([mockedData]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('returns an array', async () => {
      const result = await productsModel.getById(PRODUCT_ID);
      expect(result).to.be.a('array');
    });

    it('returns the correct data', async () => {
      const result = await productsModel.getById(PRODUCT_ID);
      expect(result).to.deep.equal(mockedData);
    });
  });
});

describe('Model Layer - Create new product', () => {
  const NAME = 'Biscoitim';

  before(() => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('returns an object with the insertId', async () => {
    const response = await productsModel.create(NAME);
    expect(response).to.have.a.property('id');
  });
});
