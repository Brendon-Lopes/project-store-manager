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

describe('Model Layer - list all sales', () => {
  const MOCKED_RETURN = [
    {
      "sale_id": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "product_id": 1,
      "quantity": 2
    },
  ];

  before(() => {
    sinon.stub(connection, 'execute').resolves([MOCKED_RETURN]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('returns the correct data', async () => {
    const result = await salesProductsModel.getAll();
    expect(result).to.deep.equal(MOCKED_RETURN);
  });
});

describe('Model Layer - list sale by id', () => {
  const SALE_ID = 1;

  const MOCKED_RETURN = [
    {
      "sale_id": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "product_id": 1,
      "quantity": 2
    },
  ];

  before(() => {
    sinon.stub(connection, 'execute').resolves([MOCKED_RETURN]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('returns the correct data', async () => {
    const result = await salesProductsModel.getById(SALE_ID);
    expect(result).to.deep.equal(MOCKED_RETURN);
  });
});

describe('Model Layer - delete by id', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('executes the query', async () => {
    await salesProductsModel.deleteById(1);
    expect(connection.execute.calledOnce).to.be.true;
  });
});

describe('Model Layer - update by id', () => {
  const ID = 1;
  const QUANTITY = 2;

  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('executes the query', async () => {
    await salesProductsModel.updateById(ID, ID, QUANTITY);
    expect(connection.execute.calledOnce).to.be.true;
  });
});
