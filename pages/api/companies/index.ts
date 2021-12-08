import { getSortedCompanies } from '../../../lib/companies';
import * as R from 'ramda';

const getSearchQuery = R.ifElse(
  R.path(['query', 'search']),
  R.path(['query', 'search']),
  R.always('')
);

const wrapStringInList = R.ifElse(
  R.pipe(R.type, R.equals('String')),
  R.unapply(R.identity),
  R.identity
);

const getTagQuery = R.ifElse(
  R.path(['query', 'tags']),
  R.pipe(R.path(['query', 'tags']), wrapStringInList),
  R.always([])
);

export default (req, res) => {
  const companies = R.converge(getSortedCompanies, [
    getSearchQuery,
    getTagQuery,
  ])(req);
  res.status(200).json(companies);
};
