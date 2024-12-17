
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

const DocumentCard = ({onDocumentDownloadHandler, onSplitDownloadHandler, document, index }) => {  
  const [isOpen, setIsOpen] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
 

  const toggle = () => setIsOpen(!isOpen);
  const columnsPerRow = 4;

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
        <CardHeader>
          <CardTitle tag="h4">Document  {index+1}</CardTitle>
        </CardHeader>
      <CardBody className="pt-0">        
        <Row>
          <Col sm={12} className="d-flex">
            <CardText className="mt-2"><strong>Document Name: </strong>{document.name}</CardText>
            <Button
                  color="info"
                  onClick={()=>onDocumentDownloadHandler(document.id)}
                  target="_blank"
                  className="mr-2 ml-2"
                  size="sm"
                >
                  Download
                </Button>
          </Col>
          <Col sm={12} className="mb-2">
            <CardText><strong>Status: </strong>{document.status}
             
            </CardText>        
           </Col>
        </Row>
        {document.status === 'Processed' &&
          <Card color="link" className="mt-2 card-shadow">     
          <CardHeader>
            <CardTitle tag="h4">Split Documents</CardTitle>
          </CardHeader>     
          <CardBody >
            {rows.map((row, rowIndex) => (
                  <Row key={rowIndex} className="mb-1">
                    {row.map((item, colIndex) => (
                      <Col key={colIndex} md={3}>
                            <DetailCard key={item.id} detail={item} documentId={document.id} onSplitDownloadHandler={onSplitDownloadHandler} />
                      </Col>
                    ))}
                  </Row>
                ))}
          </CardBody>
        </Card>
        }
        
       
      </CardBody>
    </Card>
  );
};


export default DocumentCard;
