import React, { useEffect, useState, useRef } from "react";
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
  Table,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import axios from "axios";
import NotificationAlert from "react-notification-alert";

const Batch = () => {
  const [data, setData] = useState([]);
  const [modalBatchUpload, setModalBatchUpload] = useState(false);
  const [files, setFiles] = useState([]);
  const notificationAlertRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7125/api/batch/List");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModalBatchUpload = () => {
    setModalBatchUpload((prevState) => !prevState);
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(Array.from(selectedFiles));
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
    } catch (error) {
      console.error('Upload failed:', error);
      notify("Upload failed! Please try again.", "danger"); 
    }

    toggleModalBatchUpload(); 
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
        <Row>
          <Col>
            <Card>
              <CardHeader
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardTitle tag="h5">Batch List</CardTitle>
                <Button color="primary" onClick={toggleModalBatchUpload}>
                  Batch Upload
                </Button>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
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
                        <td className="text-center">{i + 1}</td>
                        <td>{x.id}</td>
                        <td>{x.status}</td>
                        <td>{x.created_date}</td>
                        <td>{x.modified_date}</td>
                        <td>
                          {x.status === "Pending" ? (
                            <Button color="secondary" size="sm" onClick={() => handleProcessNow(x.id)}>
                              Process Now
                            </Button>
                          ) : (
                            <Button color="info" size="sm">
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

      <Modal
        modalClassName="modal-upload"
        isOpen={modalBatchUpload}
        toggle={toggleModalBatchUpload}
      >
        <div className="modal-header">
          <button
            type="button"
            className="close"
            onClick={toggleModalBatchUpload}
          >
            <i className="tim-icons icon-simple-remove mb-2"></i>
          </button>
          <h5 className="modal-title">Batch Document Upload</h5>
        </div>
        <ModalBody>
          <input type="file" multiple onChange={handleFileChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={toggleModalBatchUpload}>
            Close
          </Button>
          <Button color="primary" onClick={handleUpload}>
            Upload
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Batch;
