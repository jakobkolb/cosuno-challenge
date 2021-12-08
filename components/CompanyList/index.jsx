import React, { useState } from 'react';
import * as R from 'ramda';
import Searchbar from '../Searchbar';
import Company from '../Company';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const CompanyList = ({ sortedCompanies }) => {
  const [companies, updateCompanies] = useState(sortedCompanies);
  return (
    <Container>
      <Col>
        <Row>
          <h2>Suche</h2>
        </Row>
        <Row>
          <Searchbar updater={updateCompanies} />
        </Row>
        <Row>
          <h2>Resultate</h2>
        </Row>
      </Col>
      {R.map(
        (company) => (
          <Row>
            <Company {...company} />
          </Row>
        ),
        companies
      )}
    </Container>
  );
};

export default CompanyList;
