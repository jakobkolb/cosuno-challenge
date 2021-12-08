import Head from 'next/head';
import companies from '../data/companies.json';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedCompanies } from '../lib/companies';
import CompanyList from '../components/CompanyList';
import React from 'react';

export default function Home({ sortedCompanies }) {
  console.log(sortedCompanies);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Coding challenge for Cosuno: List of businesses.</p>
      </section>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
      >
        <CompanyList sortedCompanies={sortedCompanies} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const sortedCompanies = getSortedCompanies();
  return {
    props: {
      sortedCompanies: companies,
    },
  };
}
