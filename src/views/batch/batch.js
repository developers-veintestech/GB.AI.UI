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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { AiOutlineCloudUpload } from 'react-icons/ai';
import './batch.scss'; // Assuming you have a CSS file for additional styles
import { DateTimeFormatter } from "components/Shared/DateTimeFormatter";

const Batch = () => {
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const notificationAlertRef = useRef(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7125/api/batch/List");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const onViewDetailHandler =(id) => {
    navigate(`/admin/batch-detail/${id}`);
  };

  useEffect(() => {  
    fetchData();
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

  const handleUpload = async () => {
    const formData = new FormData();
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      alert("Please select files to upload.");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7125/api/batch/documents/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful:', response.data);
      fetchData();
      notify("Files uploaded successfully!", "success");
      setFiles([]); // Clear files after successful upload
    } catch (error) {
      console.error('Upload failed:', error);
      notify("Upload failed! Please try again.", "danger"); 
    }
  };

  const handleProcessNow = async (batchId) => {
    try {
      const response = await axios.post(`https://localhost:7125/api/batch/${batchId}/process`);
      console.log('Processing successful:', response);
      notify("Batch processed successfully!", "success");
      fetchData();
    } catch (error) {
      console.error('Processing failed:', error);
      notify("Processing failed! Please try again.", "danger");
    }
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
                <CardTitle tag="h4">Upload Batch</CardTitle>
              </CardHeader>
              <CardBody
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="m-3 drop-area"
              >
                <div className="icon-container">
                  <AiOutlineCloudUpload size={50} color="#007bff" />
                </div>
                <p>Drag & drop files here</p>
                <p>or</p>
                <Button color="info" onClick={() => document.getElementById('fileInput').click()}>
                  Select Files
                </Button>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
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
                  <Button color="primary" onClick={handleUpload}>
                    Upload
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
                      {/* <th className="text-center">#</th> */}
                      <th>Batch Id</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Modified Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((x, i) => (
                      <tr key={x.id}>
                        {/* <td className="text-center">{i + 1}</td> */}
                        <td>{x.id}</td>
                        <td>{x.status}</td>
                        <td>{DateTimeFormatter(x.created_date)}</td>
                        <td>{DateTimeFormatter(x.modified_date)}</td>
                        <td>
                          {x.status === "Pending" ? (
                            <Button color="secondary" size="sm" onClick={() => handleProcessNow(x.id)}>
                              Process Now
                            </Button>
                          ) : (
                            <Button color="info" size="sm" onClick={() => onViewDetailHandler(x.id)}>
                              View Details
                            </Button>
                          )}
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