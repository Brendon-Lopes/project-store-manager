const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../helpers/connection');
const salesModel = require('../../../models/salesModels');

describe('Model Layer - create new sale', () => {
  before(() => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('returns the created sale ID', async () => {
    const response = await salesModel.create();
    expect(response).to.have.a.property('id');
  });
});
