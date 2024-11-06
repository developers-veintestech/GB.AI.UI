
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
// react plugin used to create charts
// react plugin for creating vector maps

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Progress,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Breadcrumb,
  BreadcrumbItem,
  Collapse,
  CardText,
} from "reactstrap";

// core components
import axios from "axios";
import { NavLink } from "react-router-dom";
import DetailCard from "./detail-card";
import './batch.scss'; // Assuming you have a CSS file for additional styles

const DocumentCard = ({ document }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  const columnsPerRow = 3;

  // Function to split items into rows
  const splitIntoRows = (array, columns) => {
    const rows = [];
    for (let i = 0; i < array.length; i += columns) {
      rows.push(array.slice(i, i + columns));
    }
    return rows;
  };
  const rows = splitIntoRows(document.details, columnsPerRow);

  return (
    <Card className="mb-3 card-shadow">
      <CardBody>
        <Row>
        <Col className="ml-2 mb-2">
        <CardText><strong>Document Name: </strong>{document.name}</CardText>
        </Col>
        <Col className="ml-9 mr-5">
        <CardText><strong>Status: </strong>{document.status}
        <Button
            color="primary"
            href={document.path}
            target="_blank"
            className="mr-2 ml-2"
            size="sm"
          >
            View
          </Button></CardText>
        
        </Col>
        </Row>
        <Card color="link" className="mt-2 card-shadow" onClick={toggle}>
          <CardHeader>  {isOpen ? "Hide Details" : "Show Details"}</CardHeader>
        <CardBody>
        <Collapse isOpen={isOpen}>
              {rows.map((row, rowIndex) => (
                <Row key={rowIndex} className="mb-3">
                  {row.map((item, colIndex) => (
                    <Col key={colIndex} md={4}>
                      <DetailCard key={item.id} detail={item} />
                    </Col>
                  ))}
                </Row>
              ))}
        </Collapse>
        </CardBody>
        </Card>
       
      </CardBody>
    </Card>
  );
};


export default DocumentCard;
