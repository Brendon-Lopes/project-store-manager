const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../helpers/connection');
const salesProductsModel = require('../../../models/salesProductsModels');
const salesModel = require('../../../models/salesModels');

describe('Model Layer - create new sales_products', () => {
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
    const SALE_ID = 1;
    sinon.stub(salesModel, 'create').resolves(SALE_ID);
    sinon.stub(connection, 'query').resolves();
  });

  after(() => {
    connection.query.restore();
  });

  it('returns an object', async () => {
    const result = await salesProductsModel.create(MOCKED_SALES);
    expect(result).to.be.a('object');
  });

  it('returns the correct data', async () => {
    const result = await salesProductsModel.create(MOCKED_SALES);
    expect(result).to.deep.equal(MOCKED_RETURN);
  });
});
