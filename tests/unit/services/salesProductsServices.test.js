const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../helpers/connection');

const salesProductsServices = require('../../../services/salesProductsServices');
const salesProductsModels = require('../../../models/salesProductsModels');
const productsModels = require('../../../models/productsModels');
const salesModels = require('../../../models/salesModels');

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
    sinon.stub(connection, 'execute').resolves([MOCKED_RETURN]);
  });

  after(() => {
    salesProductsServices.checkForProduct.restore();
    salesProductsModels.create.restore();
    connection.execute.restore();
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

describe('Service Layer - delete sale by id', () => {
  describe('when the sale is not found', () => {
    const ID = 1;

    before(() => {
      sinon.stub(salesModels, 'findById').resolves([]);
    });

    after(() => {
      salesModels.findById.restore();
    });

    it('returns false', async () => {
      const result = await salesProductsServices.deleteById(ID);
      expect(result).to.be.false;
    });
  });

  describe('when the sale is found', () => {
    const ID = 1;

    const MOCKED_SALES = {
      id: ID,
    }

    before(() => {
      sinon.stub(salesModels, 'findById').resolves([MOCKED_SALES]);
      sinon.stub(salesProductsModels, 'deleteById').resolves();
    });

    after(() => {
      salesModels.findById.restore();
    });

    it('deletes the sale and returns true', async () => {
      const result = await salesProductsServices.deleteById(ID);
      expect(result).to.be.true;
    });
  });
});

describe('Service Layer - update by id', () => {
  const ID = 1;

  const SALES_MOCK = [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 50
    }
  ];

  afterEach(() => {
    sinon.restore();
  });

  describe('when sale does not exist', () => {
    before(() => {
      sinon.stub(salesModels, 'findById').resolves([]);
    });

    it('returns an object', async () => {
      const result = await salesProductsServices.updateById(ID, SALES_MOCK);
      expect(result).to.be.a('object');
    });
  });

  describe('if any product id is invalid', () => {
    before(() => {
      sinon.stub(salesModels, 'findById').resolves([{ id: 1 }]);
      sinon.stub(salesProductsServices, 'checkForProduct').resolves(true);
      sinon.stub(productsModels, 'getById').resolves([]);
    });

    it('returns an object', async () => {
      const result = await salesProductsServices.updateById(ID, SALES_MOCK);
      expect(result).to.be.a('object');
    });
  });

  describe('when sale exists', () => {
    before(() => {
      sinon.stub(salesModels, 'findById').resolves([{ id: 1 }]);
      sinon.stub(salesProductsServices, 'checkForProduct').resolves(true);
      sinon.stub(productsModels, 'getById').resolves([{ id: 1 }]);
      sinon.stub(salesProductsModels, 'updateById').resolves();
    });

    it('returns an object', async () => {
      const result = await salesProductsServices.updateById(ID, SALES_MOCK);
      expect(result).to.be.a('object');
    });
  });
});
