const { expect } = require('chai');
const sinon = require('sinon');

const salesProductsServices = require('../../../services/salesProductsServices');
const salesProductsModels = require('../../../models/salesProductsModels');

describe('Service Layer - create new sale service', () => {
  const MOCKED_SALES = [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ];

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
    sinon.stub(salesProductsServices, 'checkForProduct').resolves(false);
    sinon.stub(salesProductsModels, 'create').resolves(MOCKED_RETURN);
  });

  after(() => {
    salesProductsServices.checkForProduct.restore();
    salesProductsModels.create.restore();
  });

  it('returns an object', async () => {
    const result = await salesProductsServices.create(MOCKED_SALES);
    expect(result).to.be.a('object');
  });

  it('returns the correct data', async () => {
    const result = await salesProductsServices.create(MOCKED_SALES);
    expect(result).to.deep.equal(MOCKED_RETURN);
  });
});
