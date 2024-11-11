
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
import { NavLink, useParams } from "react-router-dom";
import './batch.scss'; 
import DocumentViewer from "./document-viewer";


const BatchDetail = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`https://localhost:7125/api/batch/${id}`);
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => { 
    if(id){
      fetchData(id);
    } 
    
  }, [id]);

  return (
    <>
      <div className="content">      
        <Breadcrumb>
          <BreadcrumbItem><NavLink to={'/admin/batch'}> Batch List </NavLink></BreadcrumbItem>
          <BreadcrumbItem active>Batch Details</BreadcrumbItem>
        </Breadcrumb>  
        <Row> 
          <Col>
            <Card>
              <CardHeader>                
                <CardTitle tag="h4">Batch Details</CardTitle>
              </CardHeader>
              <CardBody>
              {data && <DocumentViewer batchData={data} ></DocumentViewer>}
              </CardBody>
            </Card>
          </Col>         
        </Row>
       
      </div>
    </>
  );
};

export default BatchDetail;
