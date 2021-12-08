import request from 'supertest';
import { assert } from 'chai';
import * as R from 'ramda';
import express, { Express, RequestHandler } from 'express';
import companies from '.';

describe('companies', () => {
  test('returns status 200', async () => {
    const app = createTestServer('/companies', companies);
    const result = await request(app).get('/companies');

    assert.equal(result.status, 200);
  });

  test('returns list of companies', async () => {
    const app = createTestServer('/companies', companies);
    const result = await request(app).get('/companies');

    R.pipe(
      R.prop('body'),
      R.map((x) => {
        assert.hasAllKeys(x, ['name', 'logo', 'tags', 'description']);
      })
    )(result);
  });

  test('returns filtered list of queries with search', async () => {
    const app = createTestServer('/companies', companies);
    const result = await request(app).get('/companies?search=Mayer');

    assert.lengthOf(result.body, 1);
    assert.equal(
      R.pipe(R.prop('body'), R.head, R.prop('name'))(result),
      'Schreinerei Mayer'
    );
  });
  test('returns filtered list of queries with tags', async () => {
    const app = createTestServer('/companies', companies);
    const result = await request(app)
      .get('/companies')
      .query({ tags: ['Bautischler'] });

    assert.lengthOf(result.body, 1);
    assert.equal(
      R.pipe(R.prop('body'), R.head, R.prop('name'))(result),
      'Schreinerei Mayer'
    );
  });
});

const createTestServer = (
  route: string,
  requestHandler: RequestHandler
): Express => {
  const app = express();
  app.get(route, requestHandler);
  return app;
};
