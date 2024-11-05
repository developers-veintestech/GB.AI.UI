
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
} from "reactstrap";

// core components
import axios from "axios";


const Batch = () => {
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
        <Row>          
          <Col >
            <Card>
              <CardHeader>                
                <CardTitle tag="h5">Batch List</CardTitle>
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
                      <th >Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((x, i)=>{
                      return <tr>
                      <td className="text-center">
                        {i+1}
                      </td>
                      <td>{x.id}</td>
                      <td>{x.status}</td>                     
                      <td>{x.created_date}</td>                     
                      <td>{x.modified_date}</td>  
                      <td >
                        <Button color="info" size="sm">View Details</Button>
                      </td>
                    </tr>
                    })}                  
                   
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
