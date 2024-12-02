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
  Table,
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
import SortingTable from "components/SortingTable/SortingTable";
import MemoizedViewer from "./pdf-viewer";
import { reExcecuteDocumentCategory } from "services/document";

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
  const getSplitDocumentDownloadUrl = (batchId, documentId, splitId) => {
    return `${process.env.REACT_APP_API_BASE_URL}batch/${batchId}/document/${documentId}/split/${splitId}/download`;
  };

   // Define a function to get the download URL
   const getDocumentDownloadUrl = (batchId, documentId) => {
    return `${process.env.REACT_APP_API_BASE_URL}batch/${batchId}/document/${documentId}/download`;
  };

  // Fetch documents in parallel and create an object with document IDs as keys and blob URLs as values
  const fetchDocumentsInParallel = async (batchId, documentId, splitIds) => {
    try {
      // Create an array of promises for each document
      setLoading(true);
      const fetchPromises = splitIds.map(async (splitId) => {
        const url = getSplitDocumentDownloadUrl(batchId, documentId, splitId);
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
        let isPatientSplitDocument = data.documents.filter(x => x.is_patient_split);
 
        if(isPatientSplitDocument && isPatientSplitDocument.length > 0){
          const document = isPatientSplitDocument[0];
          await onDocumentChangeHandler(document);
  
          // Create a new object where the key is the index and the value is the static text 'document'
          const documentObject = document.details.reduce((acc, curr, index) => {
            acc[index] = 'document';  // Setting the value as static text 'document'
            return acc;
          }, {});
          setHorizontalTabs(documentObject);
        }
      }
    }
    fetchDocumentData();

  }, [data]);

  const reExcecuteDocument = (categoryId) =>{
    let request = {
      batchId: id,
      documentId: selectedDocument.id,
      categoryIds:[categoryId]
    }
     reExcecuteDocumentCategory(request);
  }

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
          <Col md="4" className="pr-1">
            <Card className="card-user">
              <CardBody className="document-list-item-height">
                <ListGroup>
                  {data &&
                    data.documents.filter(x => x.is_patient_split).map((document, i) => (
                      <ListGroupItem action active={document.id === selectedDocument?.id ? true : false} color="info" tag="button" onClick={() => onDocumentChangeHandler(document)}>
                        {`# ${i + 1} Document (${document.name})`}
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </CardBody>
            </Card>
            {selectedDocument &&
              <Card className="card-user">
                <CardHeader>
                            <CardText>
                              <strong>Original Document</strong>
                            </CardText>
                          </CardHeader>
                <CardBody className="document-viewer">    
                  <MemoizedViewer key={`document-pdf-viewer-${selectedDocument.id}`} fileUrl={getDocumentDownloadUrl(id, selectedDocument.id)} />            
                </CardBody>
              </Card>
            }
            
          </Col>
          <Col md="8">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {selectedDocument && selectedDocument.details.length > 0 &&
                  selectedDocument.details.map((detail, index) => (
                    <Row key={index}>
                      <Col>
                        <Card color="" className="mb-2">
                          <CardHeader>
                            <CardText>
                              Category: <strong>{detail.category}</strong>
                            </CardText>
                          </CardHeader>
                          <CardBody className="pt-2">
                            <Nav className="nav-pills-info category-tab" pills>
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
                              <NavItem>
                                <NavLink
                                  data-toggle="tab"
                                  href="#pablo"
                                  className={horizontalTabs[index] === "summary" ? "active" : ""}
                                  onClick={() => changeActiveTab("summary", index)}
                                >
                                  Summary
                                </NavLink>
                              </NavItem>
                              <NavItem className="re-excecute">
                                <Button size="sm" onClick={() => {reExcecuteDocument(detail.id)}} >
                                  Re-Excecute
                                </Button>
                              </NavItem>
                            </Nav>
                            
                            <TabContent className="tab-space pt-0 pb-0" activeTab={horizontalTabs[index]}>
                              <TabPane tabId="document">
                                <Card color="light" className="my-2">
                                  <CardBody className="p-2 tab-content-height">
                                    {/* <div style={{ height: '500px' }}> */}
                                      {/* Thumbnail view for the first page */}
                                      <MemoizedViewer key={`pdf-viewer-${index}`} fileUrl={getSplitDocumentDownloadUrl(id, selectedDocument.id, detail.id)} />
                                        {/* <Viewer key={`pdf-viewer-${index}`}
                                          fileUrl={getDocumentDownloadUrl(id, selectedDocument.id, detail.id)}
                                          plugins={[
                                            // Register plugins
                                            defaultLayoutPluginInstance
                                          ]}
                                        /> */}
                                      
                                    {/* </div> */}
                                  </CardBody>
                                </Card>
                              </TabPane>
                              <TabPane tabId="fields">
                                <Card color="light" className="my-2">
                                    <CardBody className="p-2">                                      
                                      <Card className="m-0">    
                                        <CardBody className="p-0 tab-content-height">                                      
                                        <Table>
                                          <thead className="text-primary">
                                            <tr>
                                              <th className="text-center">#</th>
                                              <th>Field Name</th>
                                              <th>Field Value</th>                                        
                                            </tr>
                                          </thead>
                                          <tbody>
                                          {Object.keys(detail.fields).length > 0 ?
                                          <>
                                            {Object.entries(detail.fields).map(([key, value],i) => (
                                              <tr>
                                                <td className="text-center">{i+1}</td>
                                                <td>{key}</td>
                                                <td>{value}</td>
                                              </tr>))}
                                          </>:
                                          <tr>
                                            <td className="text-center" colSpan={3}>No Record Found</td>
                                          </tr>
                                          }
                                            
                                            </tbody>
                                            </Table>
                                            </CardBody>
                                      </Card>
                                    </CardBody>
                                  </Card>                             
                                {/* <div style={{ height: '500px' }}>
                                  {Object.keys(detail.fields).length > 0 
                                    ?
                                    <FieldsTable data={detail.fields}></FieldsTable>
                                    :
                                    <Card color="" className="my-2">
                                      No Record Found.
                                    </Card>
                                  }
                                </div> */}

                              </TabPane>
                              <TabPane tabId="summary">
                                <Card color="light" className="my-2">
                                    <CardBody className="p-2">                                      
                                      <Card className="m-0">    
                                        <CardBody className="tab-content-height">                                      
                                          <p>{detail.summary ? detail.summary: 'No Summary Found'}</p>
                                        </CardBody>
                                      </Card>
                                    </CardBody>
                                  </Card>                               
                              </TabPane>
                            </TabContent>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  ))}
                  </Worker>
                {(!selectedDocument || selectedDocument.details.length === 0) && (
                  <Row>
                    <Col>
                      <Card color="" className="my-2">
                        No Category Found.
                      </Card>
                    </Col>
                  </Row>
                )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BatchDetail;