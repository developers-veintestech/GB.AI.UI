
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

const DetailCard = ({ detail }) =>{
  console.log('detail', detail)
  return (
  <Card className="mb-2 border-light">
    <CardBody className="p-2">
      {/* <CardTitle tag="h6">{detail.name}</CardTitle> */}
      <CardText><small>Category: {detail.category}</small></CardText>
      <div className="d-flex justify-content-start">
        <Button color="info" href={detail.path} target="_blank" className="mr-2">
          View
        </Button>
        <Button color="success" href={detail.path} download>
          Download
        </Button>
      </div>
    </CardBody>
  </Card>)};

export default DetailCard;
