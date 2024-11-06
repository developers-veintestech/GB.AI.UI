
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
} from "reactstrap";

// core components
import axios from "axios";
import { NavLink } from "react-router-dom";
import DocumentCard from "./document-card";

const DocumentBatchViewer = ({batchData}) => {
  return (
    <div className="container my-4">
      <h2 className="text-center">Batch Details</h2>
      <div className="mb-4">
        <p><strong>Batch ID:</strong> {batchData.id}</p>
        <p><strong>Status:</strong> {batchData.status}</p>
        <p><strong>Created Date:</strong> {new Date(batchData.created_date).toLocaleString()}</p>
      </div>

      {batchData.documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} />
      ))}
    </div>
  );
};

export default DocumentBatchViewer;
