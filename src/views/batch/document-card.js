
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

const DocumentCard = ({ document }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Card className="mb-3 shadow-sm">
      <CardBody>
        <CardTitle tag="h5">{document.name}</CardTitle>
        <CardText>Status: {document.status}</CardText>
        <div className="d-flex justify-content-start">
          <Button
            color="primary"
            href={document.path}
            target="_blank"
            className="mr-2"
          >
            View
          </Button>
          <Button
            color="secondary"
            href={document.path}
            download
          >
            Download
          </Button>
        </div>
        <Button color="link" className="mt-2" onClick={toggle}>
          {isOpen ? "Hide Details" : "Show Details"}
        </Button>
        <Collapse isOpen={isOpen}>
          <div className="mt-3">
            {document.details.map((detail) => (
              <DetailCard key={detail.id} detail={detail} />
            ))}
          </div>
        </Collapse>
      </CardBody>
    </Card>
  );
};


export default DocumentCard;
