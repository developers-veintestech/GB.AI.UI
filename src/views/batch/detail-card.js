
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

const DetailCard = ({ detail }) => (
  <Card className="mb-1 border-light">
    <CardBody className="p-2">
      {/* <CardTitle tag="h6">{detail.name}</CardTitle> */}
      <CardText><small><strong>Category:</strong> {detail.category}</small>
        <Button color="info" size="sm" href={detail.path} target="_blank" className="mr-2 ml-2">
          View
        </Button></CardText>
    </CardBody>
  </Card>);

export default DetailCard;
