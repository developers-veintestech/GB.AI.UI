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
  CardText,
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

  const onDocumentDownloadHandler = async (documentId) => {
    try {
      setLoading(true); 

      const response = await axios.get(`https://localhost:7125/api/batch/${batchData.id}/document/${documentId}/download`, {
        responseType: "blob", 
      });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

     
      const filename = response.headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '');
      if (filename) {
        link.setAttribute('download', filename); 
      } else {
        link.setAttribute('download', `document_${documentId}.pdf`); 
      }

      link.href = fileURL;
      document.body.appendChild(link);
      link.click();
      link.remove(); 
    } catch (error) {
      console.error("Error downloading the file:", error.response || error);
    } finally {
      setLoading(false); 
    }
  };

  const onSplitDownloadHandler = async (documentId, splitDocumentId) => {
    try {
      setLoading(true); 

      const response = await axios.get(`https://localhost:7125/api/batch/${batchData.id}/document/${documentId}/split/${splitDocumentId}/download`, {
        responseType: "blob", 
      });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

     
      const filename = response.headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '');
      if (filename) {
        link.setAttribute('download', filename); 
      } else {
        link.setAttribute('download', `document_${documentId}.pdf`); 
      }

      link.href = fileURL;
      document.body.appendChild(link);
      link.click();
      link.remove(); 
    } catch (error) {
      console.error("Error downloading the file:", error.response || error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Card className="mb-1 ml-2 border-light">
      {loading && (
        <div className="loading-overlay">
          <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
        </div>
      )}
      <Row className="mb-2">
        <Col>
          <CardText><strong>Batch ID:</strong> {batchData.id}</CardText>
        </Col>        
        {/* <Col>
          <Button
              className="ml-2"
              color="primary"              
              onClick={() => handleProcessNow(batchData.id)}
            >
              Process Now
            </Button>
        </Col> */}
      </Row>
      <Row className="mb-2">
        <Col>
          <CardText><strong>Status:</strong> {batchData.status}</CardText>
        </Col>
      </Row>
      {!isProcessed &&
        <Row className="mb-2">
          <Col>
            <Button
                className="ml-2"
                color="primary"                      
                onClick={() => handleProcessNow(batchData.id)}
              >
                Split Now
            </Button>
          </Col>
      </Row>
      }    

      {batchData.documents.map((doc, index) => (
        <DocumentCard batchId={batchData.id} key={doc.id} document={doc} 
          index={index}
          onDocumentDownloadHandler={onDocumentDownloadHandler}
          onSplitDownloadHandler={onSplitDownloadHandler}
          />
      ))}
    </Card>
  );
};

export default DocumentBatchViewer;
