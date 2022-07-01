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

describe('Service Layer - list all sales', () => {
  const MOCKED_MODEL_RETURN = [
    {
      "sale_id": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "product_id": 1,
      "quantity": 2
    },
  ];

  const MOCKED_RETURN = [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
  ];

  before(() => {
    sinon.stub(salesProductsModels, 'getAll').resolves(MOCKED_MODEL_RETURN);
  });

  after(() => {
    salesProductsModels.getAll.restore();
  });

  it('returns the correct data', async () => {
    const result = await salesProductsServices.getAll();
    expect(result).to.deep.equal(MOCKED_RETURN);
  });
});

describe('Service Layer - list sale by id', () => {
  describe('when the sale id does not exist', () => {
    const MOCKED_MODEL_RETURN = [];
    const SALE_ID = 1;

    before(() => {
      sinon.stub(salesProductsModels, 'getById').resolves(MOCKED_MODEL_RETURN);
    });

    after(() => {
      salesProductsModels.getById.restore();
    });

    it('returns false', async () => {
      const result = await salesProductsServices.getById(SALE_ID);
      expect(result).to.be.false;
    });
  });

  describe('when the sale id exists', () => {
    const MOCKED_MODEL_RETURN = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "product_id": 1,
        "quantity": 2
      },
    ];


    const MOCKED_RETURN = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
    ];

    const SALE_ID = 1;

    before(() => {
      sinon.stub(salesProductsModels, 'getById').resolves(MOCKED_MODEL_RETURN);
    });

    after(() => {
      salesProductsModels.getById.restore();
    });

    it('returns the sale data', async () => {
      const result = await salesProductsServices.getById(SALE_ID);
      expect(result).to.deep.equal(MOCKED_RETURN);
    });
  });
});
