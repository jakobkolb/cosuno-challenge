import React from 'react';
import * as R from 'ramda';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

const Company = ({ name, description, tags, logo }) => {
  return (
    <Card className="m-2">
      <Card.Body>
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <Image src={logo} rounded fluid />
            </Col>
            <Col xs={12} md={8}>
              <Row>
                <Card.Title>{name}</Card.Title>
              </Row>
              <Card.Text>{description}</Card.Text>
              <Stack
                direction="horizontal"
                gap={3}
                style={{ disply: 'flex', justifyContent: 'right' }}
              >
                {R.map(
                  (tag) => (
                    <Badge bg="secondary">{tag}</Badge>
                  ),
                  tags
                )}
              </Stack>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Company;
