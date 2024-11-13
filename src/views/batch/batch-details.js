import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
  Modal,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { NavLink as RouterNavLink, useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { getBatchDetail } from "services/document";
import "./batch.scss";

// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import FieldsTable from "./fields-table";

const BatchDetail = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [horizontalTabs, setHorizontalTabs] = useState({ 0: "document" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await getBatchDetail(id);
      setData(response.receiveObj);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const changeActiveTab = (tabName, index) => {
    setHorizontalTabs((prevTabs) => ({
      ...prevTabs,
      [index]: tabName,
    }));
  };


  // Define a function to get the download URL
  const getDocumentDownloadUrl = (batchId, documentId, splitId) => {
    return `${process.env.REACT_APP_API_BASE_URL}batch/${batchId}/document/${documentId}/split/${splitId}/download`;
  };

  // Fetch documents in parallel and create an object with document IDs as keys and blob URLs as values
  const fetchDocumentsInParallel = async (batchId, documentId, splitIds) => {
    try {
      // Create an array of promises for each document
      setLoading(true);
      const fetchPromises = splitIds.map(async (splitId) => {
        const url = getDocumentDownloadUrl(batchId, documentId, splitId);
        const response = await axios.get(url, { responseType: "blob" });
        const blobUrl = URL.createObjectURL(response.data);

        // Return an object with document ID as the key and blob URL as the value
        return { [splitId]: blobUrl };
      });

      // Wait for all promises to resolve
      const results = await Promise.all(fetchPromises);

      // Combine all objects into a single object
      const blobUrlMap = Object.assign({}, ...results);

      return blobUrlMap;
    } catch (error) {
      console.error("Error fetching documents:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const thumbnailPluginInstance = thumbnailPlugin();
  const fullScreenPluginInstance = fullScreenPlugin();
  const zoomPluginInstance = zoomPlugin();

  const openModal = (detail) => {
    setSelectedDetail(detail);
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setSelectedDetail(null);
    setIsModalOpen(false);
  }

  const onDocumentChangeHandler = async (document) => {
    setSelectedDocument(document)
    //const splitIds = document.details.map(x=>x.id);
    //const categoryDocuments = await fetchDocumentsInParallel(id, document.id, splitIds);

  }

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id, refresh]);

  useEffect(() => {
    async function fetchDocumentData() {
      if (data && data.documents.length > 0) {
        const document = data.documents[0];
        await onDocumentChangeHandler(document);

        // Create a new object where the key is the index and the value is the static text 'document'
        const documentObject = document.details.reduce((acc, curr, index) => {
          acc[index] = 'document';  // Setting the value as static text 'document'
          return acc;
        }, {});
        setHorizontalTabs(documentObject);

      }
    }

    fetchDocumentData();

  }, [data]);

  return (
    <>
      <div className="content">
        {loading && (
          <div className="loading-overlay">
            <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
          </div>
        )}
        <Breadcrumb>
          <BreadcrumbItem>
            <RouterNavLink to={"/admin/batch"}> Batch List </RouterNavLink>
          </BreadcrumbItem>
          <BreadcrumbItem active>Batch Details</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <ListGroup>
                  {data &&
                    data.documents.map((document, i) => (
                      <ListGroupItem action active={document.id === selectedDocument?.id ? true : false} color="info" tag="button" onClick={() => onDocumentChangeHandler(document)}>
                        {`# ${i + 1} Document (${document.name})`}
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card color="light">
              <CardBody className="pt-2">
                {selectedDocument && selectedDocument.details.length > 0 &&
                  selectedDocument.details.map((detail, index) => (
                    <Row key={index}>
                      <Col>
                        <Card color="" className="my-2">
                          <CardHeader>
                            <CardText>
                              Category: <strong>{detail.category}</strong>
                            </CardText>
                          </CardHeader>
                          <CardBody className="pt-2">
                            <Nav className="nav-pills-info" pills>
                              <NavItem>
                                <NavLink
                                  data-toggle="tab"
                                  href="#pablo"
                                  color="primary"
                                  className={horizontalTabs[index] === `document` ? "active btn-sm" : "btn-sm"}
                                  onClick={() => changeActiveTab("document", index)}
                                >
                                  Document
                                </NavLink>
                              </NavItem>
                              <NavItem>
                                <NavLink
                                  data-toggle="tab"
                                  href="#pablo"
                                  className={horizontalTabs[index] === "fields" ? "active" : ""}
                                  onClick={() => changeActiveTab("fields", index)}
                                >
                                  Fields
                                </NavLink>
                              </NavItem>
                            </Nav>
                            <TabContent className="tab-space pt-1 pb-0" activeTab={horizontalTabs[index]}>
                              <TabPane tabId="document">
                                <div style={{ height: '500px' }}>
                                  {/* Thumbnail view for the first page */}
                                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                    <Viewer
                                      fileUrl={getDocumentDownloadUrl(id, selectedDocument.id, detail.id)}
                                      plugins={[
                                        // Register plugins
                                        defaultLayoutPluginInstance
                                      ]}
                                    />
                                  </Worker>

                                  {/* <Button color="primary" onClick={()=>openModal(detail)}>
                                    View Full PDF
                                  </Button> */}
                                </div>
                              </TabPane>
                              <TabPane tabId="fields">
                                <div>
                                  {Object.keys(detail.fields).length > 0 
                                    ?
                                    <FieldsTable data={detail.fields}></FieldsTable>
                                    :
                                    <Card color="" className="my-2">
                                      No Record Found.
                                    </Card>
                                  }
                                </div>

                              </TabPane>
                            </TabContent>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  ))}
                {(!selectedDocument || selectedDocument.details.length == 0) && (
                  <Row>
                    <Col>
                      <Card color="" className="my-2">
                        No Category Found.
                      </Card>
                    </Col>
                  </Row>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BatchDetail;