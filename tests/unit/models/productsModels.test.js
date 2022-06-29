const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../helpers/connection');
const productsModel = require('../../../models/productsModels');

describe('Get all products from DB', () => {
  const mockedData = [{
    'id': 1,
    'name': "Martelo de Thor",
  }];

  before(async () => {
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
