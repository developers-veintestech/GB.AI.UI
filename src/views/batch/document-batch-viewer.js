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
  Spinner,
} from "reactstrap";

// core components
import axios from "axios";
import { NavLink } from "react-router-dom";
import DocumentCard from "./document-card";
import "./batch.scss";

const DocumentBatchViewer = ({ batchData, refresh }) => {
  const [loading, setLoading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(
    batchData.status === "Processed"
  );

  const handleProcessNow = async (batchId) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://localhost:7125/api/batch/${batchId}/process`
      );
      console.log("Processing successful:", response);
      setIsProcessed(true);
      refresh(true);
    } catch (error) {
      console.error("Processing failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4 position-relative">
      {loading && (
        <div className="loading-overlay">
          <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}

      <div className="mb-4">
        <p>
          <strong>Batch ID:</strong> {batchData.id}
        </p>
        <p>
          <strong>Status:</strong> {batchData.status}
          {!isProcessed && (
            <Button
              className="ml-2 custom-small-btn"
              color="secondary"
              size="sm"
              onClick={() => handleProcessNow(batchData.id)}
            >
              Process Now
            </Button>
          )}
        </p>
        <p>
          <strong>Created Date:</strong>{" "}
          {new Date(batchData.created_date).toLocaleString()}
        </p>
      </div>

      {batchData.documents.map((doc) => (
        <DocumentCard batchId={batchData.id} key={doc.id} documents={doc} />
      ))}
    </div>
  );
};

export default DocumentBatchViewer;
