import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./batch.scss";
import { getBatchList, getProviderList, postDocumentUpload } from "services/document";
import { DateTimeFormatter } from "components/Shared/DateTimeFormatter";

const Batch = () => {
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [providers, setProviders] = useState([]);
  const notificationAlertRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await getBatchList();
      setData(response.receiveObj);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchProvider = async () => {
    try {
      const response = await getProviderList();
      setProviders(response.receiveObj);
    } catch (error) {
      console.error("Error fetching providers:", error.message);
    }
  };

  const onViewDetailHandler = (id) => {
    navigate(`/admin/batch-detail/${id}`);
  };

  useEffect(() => {
    fetchData();
    fetchProvider();
  }, []);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleProviderChange = (e) => {
    setSelectedProvider(e.target.value);
  };

  const handleUpload = async () => {
    if (selectedProvider === "") {
      notify("Please select a provider.", "danger");
      return;
    }

    if (files.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("providerId", selectedProvider);
    files.forEach((file) => {
      formData.append("files", file);
    });

    setIsLoading(true);
    try {
      const response = await postDocumentUpload(formData);

      const newBatchId = response.receiveObj;
      fetchData();
      notify("Files uploaded successfully!", "success");

      setFiles([]);
      setIsLoading(false);

      navigate(`/admin/batch-detail/${newBatchId}`);
    } catch (error) {
      console.error("Upload failed:", error);
      notify("Upload failed! Please try again.", "danger");
    } finally {
      setIsLoading(false);
    }
  };

  const getProviderName = (providerId) => {
    const provider = providers.find((p) => p.id === providerId);
    return provider ? provider.name : "";
  };

  const getDocumentNames = (documents) => {
    if (!documents || documents.length === 0) return "";
  
    return documents
      .filter((doc) => !doc.is_patient_split)
      .map((doc) => doc.name) 
      .join(", "); 
  };  

  const notify = (message, type) => {
    const options = {
      place: "tr",
      message: <div>{message}</div>,
      type: type,
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  return (
    <>
      <NotificationAlert ref={notificationAlertRef} />
      <div className="content">
        {/* Drag-and-Drop Upload Card */}
        <Row>
          <Col>
            <Card className="upload-card">
              <CardHeader>
                <CardTitle tag="h4">Batch Upload</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={3} className="ml-2">
                    <label for="providerSelect" className="font-weight-bold">Provider</label>
                    <Input
                      type="select"
                      name="provider"
                      id="providerSelect"
                      value={selectedProvider}
                      onChange={handleProviderChange}
                    >
                      <option value="" disabled>
                        Select a provider
                      </option>
                      {providers.map((provider) => (
                        <option key={provider.id} value={provider.id}>
                          {provider.name}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </Row>
              </CardBody>
              <CardBody
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="m-4 drop-area"
              >
                <div className="icon-container">
                  <AiOutlineCloudUpload size={50} color="#007bff" />
                </div>
                <p>Drag & drop files here</p>
                <p>or</p>
                <Button
                  color="info"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Select Files
                </Button>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  multiple
                  onChange={handleFileChange}
                />
              </CardBody>

              {/* Show list of selected files and Upload button */}
              {files.length > 0 && (
                <CardBody>
                  <h5>Files to Upload:</h5>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                  <Button
                    color="primary"
                    onClick={handleUpload}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="loader">
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span>Uploading..</span>
                        </div>
                      </>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>

        {/* Batch List Table */}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Batch List</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Batch Id</th>
                      <th>Status</th>
                      <th>Provider</th>
                      <th>File Name</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((x, i) => (
                      <tr key={x.id}>
                        <td className="text-center">{i + 1}</td>
                        <td>{x.id}</td>
                        <td>{x.status}</td>
                        <td>{getProviderName(x.provider_id)}</td>
                        <td>{getDocumentNames(x.documents)}</td>
                        <td>{DateTimeFormatter(x.created_date)}</td>
                        <td>
                          <Button
                            color="info"
                            size="sm"
                            onClick={() => onViewDetailHandler(x.id)}
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Batch;
