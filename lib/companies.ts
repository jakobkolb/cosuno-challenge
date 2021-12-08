import * as R from 'ramda';
import companies from '../data/companies.json';

export type Company = {
  name: string;
  tags: ReadonlyArray<string>;
  description: string;
  logo: string;
};

const companyNameContains = (
  query: string
): ((company: Company) => boolean) =>
  R.pipe(R.prop('name'), (name) => name.includes(query));

export const companyTagsContain = (
  tags: ReadonlyArray<string>
): ((company: Company) => boolean) =>
  R.ifElse(
    R.always(!!R.length(tags)),
    R.pipe(R.prop('tags'), R.difference(tags), R.length, R.equals(0)),
    R.T
  );

export const getSortedCompanies = (
  search,
  tags
): ReadonlyArray<Company> =>
  R.pipe(
    R.always<ReadonlyArray<Company>>(companies),
    R.filter(companyNameContains(search)),
    R.filter(companyTagsContain(tags))
  )();
