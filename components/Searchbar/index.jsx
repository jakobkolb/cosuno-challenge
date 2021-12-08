import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import {
  InputGroup,
  Col,
  Row,
  Form,
  FormControl,
} from 'react-bootstrap';
import superagent from 'superagent';

const inputHandler = (updateState) =>
  R.pipe(R.path(['target', 'value']), updateState);

const updateCompanies = async (updater, searchBarState, tags) => {
  await superagent
    .get('/api/companies')
    .query({ search: searchBarState })
    .query({ tags })
    .then(R.prop('body'))
    .then(updater);
};

const onSelectedOptionsChange = R.curry((setTags, event) => {
  R.pipe(
    R.path(['target', 'selectedOptions']),
    R.map(R.prop('value')),
    setTags
  )(event);
});

const Option = (value) => <option value={value}>{value}</option>;

const Searchbar = ({ updater }) => {
  const [searchBarState, searchBarUpdate] = useState('');

  const options = [
    'Sanitär',
    'Heitzung',
    'Klima',
    'Bautischler',
    'Möbelbau',
    'Restauration',
  ];
  const [tags, setTags] = useState([]);

  useEffect(
    () => updateCompanies(updater, searchBarState, tags),
    [searchBarState, tags]
  );

  return (
    <InputGroup className="mb-3">
      <Col>
        <Row>
          <Form.Label>Firmenname</Form.Label>
          <FormControl
            placeholder="Name"
            aria-label="Business name"
            aria-describedby="basic-addon2"
            onChange={inputHandler(searchBarUpdate)}
            on
          />
        </Row>
        <Row className="mt-2">
          <Form.Label>Spezialisierung</Form.Label>
          <Form.Select
            multiple
            aria-label="Default select example"
            onChange={onSelectedOptionsChange(setTags)}
          >
            {R.map(Option, options)}
          </Form.Select>
        </Row>
      </Col>
    </InputGroup>
  );
};

export default Searchbar;
