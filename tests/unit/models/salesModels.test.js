const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../helpers/connection');
const salesModel = require('../../../models/salesModels');

describe('Model Layer - create new sale', () => {
  const insertId = 1;

  before(() => {
    const execute = [{ insertId }];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('returns the created sale ID', async () => {
    const response = await salesModel.create();
    expect(response).to.be.equal(insertId);
  });
});

describe('Model Layer - get sale by id', () => {
  const ID = 1;

  const MOCKED_SALES = {
    id: ID,
  }

  before(() => {
    sinon.stub(connection, 'execute').resolves([MOCKED_SALES]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('returns the sale with the corresponding id', async () => {
    const result = await salesModel.findById(ID);
    expect(result).to.deep.equal(MOCKED_SALES);
  });
});
