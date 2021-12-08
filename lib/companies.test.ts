import { assert } from 'chai';
import * as R from 'ramda';
import {
  getSortedCompanies,
  companyTagsContain,
  Company,
} from './companies';

describe('getSortedCompanies', () => {
  test('returns list of companies', () => {
    assert.containsAllKeys(
      R.pipe(getSortedCompanies, R.head)('', []),
      ['name', 'tags', 'description', 'logo']
    );
  });
  test('returns all companies with empty search query', () => {
    const companies = getSortedCompanies('', []);
    assert.lengthOf(companies, 3);
  });
  test('returns matching companies with query string', () => {
    const filteredCompanies = getSortedCompanies('Mayer', []);
    assert.lengthOf(filteredCompanies, 1);
    assert.propertyVal(
      filteredCompanies[0],
      'name',
      'Schreinerei Mayer'
    );
  });
  test('returns matchin companies with tags', () => {
    const filteredCompanies = getSortedCompanies('', ['']);
  });
});
describe('companyTagsContain', () => {
  test('returns true, if first list is subset of second list', () => {
    assert.isTrue(
      companyTagsContain(['a', 'b'])({
        tags: ['a', 'b', 'c'],
      } as unknown as Company)
    );
  });
  test('returns false if first list is not contained in second', () => {
    assert.isFalse(
      companyTagsContain(['a', 'b'])({
        tags: ['b', 'c', 'd'],
      } as unknown as Company)
    );
  });
  test('works with empty tag list', () => {
    assert.isFalse(
      companyTagsContain(['a', 'b'])({
        tags: [],
      } as unknown as Company)
    );
  });
});
