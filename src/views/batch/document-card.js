
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

const DocumentCard = ({ documents }) => {
  console.log('document', document)
  const [isOpen, setIsOpen] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async (documentId) => {
    try {
      setIsDownloading(true); 

      const response = await axios.get(`https://localhost:7125/api/batch/download/${documentId}`, {
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
      setIsDownloading(false); 
    }
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Card className="mb-3 shadow-sm">
      <CardBody>
        <CardTitle tag="h5">{documents.name}</CardTitle>
        <CardText>Status: {documents.status}</CardText>
        <div className="d-flex justify-content-start">
          <Button
            color="primary"
            href={documents.path}
            target="_blank"
            className="mr-2"
          >
            View
          </Button>
          <Button
            color="secondary"
            onClick={() => handleDownload(documents.id)} // Trigger the API call on click
            disabled={isDownloading} // Disable button during download
          >
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </div>
        <Button color="link" className="mt-2" onClick={toggle}>
          {isOpen ? "Hide Details" : "Show Details"}
        </Button>
        <Collapse isOpen={isOpen}>
          <div className="mt-3">
            {documents.details.map((detail) => (
              <DetailCard key={detail.id} detail={detail} />
            ))}
          </div>
        </Collapse>
      </CardBody>
    </Card>
  );
};


export default DocumentCard;
