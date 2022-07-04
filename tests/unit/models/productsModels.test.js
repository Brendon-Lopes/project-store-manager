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

describe('Model Layer - edit a product by id', () => {
  const PRODUCT_ID = 1;
  const NEW_NAME = 'Martelo de Capitão América';

  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('returns the edited product', async () => {
    const result = await productsModel.updateById(PRODUCT_ID, NEW_NAME);
    expect(result).to.deep.equal({ id: PRODUCT_ID, name: NEW_NAME });
  });
});

describe('Model Layer - delete a product by id', () => {
  const PRODUCT_ID = 1;

  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('the function runs the query', async () => {
    await productsModel.deleteById(PRODUCT_ID);
    expect(connection.execute.calledOnce).to.be.true;
  });
});

describe('Model Layer - search product by name', () => {
  const PRODUCT_NAME = 'Martelo de Thor';

  const MOCKED_PRODUCT = {
    id: 1,
    name: PRODUCT_NAME,
  }

  before(() => {
    sinon.stub(connection, 'execute').resolves([MOCKED_PRODUCT]);
  });

  after(() => {
    sinon.restore();
  });

  it('the function runs the query', async () => {
    await productsModel.searchByName(PRODUCT_NAME);
    expect(connection.execute.calledOnce).to.be.true;
  });

  it('the function returns the product', async () => {
    const result = await productsModel.searchByName(PRODUCT_NAME);
    expect(result).to.deep.equal(MOCKED_PRODUCT);
  });
});
