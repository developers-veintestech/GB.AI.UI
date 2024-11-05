
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


const BatchDetail = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7125/api/batch/List');
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {  
    fetchData();
  }, []);

  return (
    <>
      <div className="content">      
        <Breadcrumb>
          <BreadcrumbItem><a href="#">Batch List</a></BreadcrumbItem>
          <BreadcrumbItem active>Batch Details</BreadcrumbItem>
        </Breadcrumb>  
        <Row>          
          <Col>
            <Card>
              <CardHeader>                
                <CardTitle tag="h5">Batch List</CardTitle>
              </CardHeader>
              <CardBody>
                
              </CardBody>
            </Card>
          </Col>         
        </Row>
      </div>
    </>
  );
};

export default BatchDetail;
