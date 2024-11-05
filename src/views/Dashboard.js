/*!

=========================================================
* Black Dashboard PRO React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Progress,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import axios from "axios";

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

const Dashboard = () => {
  const [data, setData] = useState(null);
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
                <div className="tools float-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Something else
                      </DropdownItem>
                      <DropdownItem
                        className="text-danger"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        Remove Data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
                <CardTitle tag="h5">Management Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th className="text-center">#</th>
                      <th>Name</th>
                      <th>Job Position</th>
                      <th>Milestone</th>
                      <th className="text-right">Salary</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <div className="photo">
                          <img
                            alt="..."
                            src={require("assets/img/tania.jpg")}
                          />
                        </div>
                      </td>
                      <td>Tania Mike</td>
                      <td>Develop</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">25%</span>
                            <Progress bar max="100" value="25" />
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">€ 99,225</td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="success"
                          id="tooltip618296632"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip618296632"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="danger"
                          id="tooltip707467505"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip707467505"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="photo">
                          <img alt="..." src={require("assets/img/robi.jpg")} />
                        </div>
                      </td>
                      <td>John Doe</td>
                      <td>CEO</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">77%</span>
                            <Progress bar max="100" value="77" />
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">€ 89,241</td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="success"
                          id="tooltip216846074"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip216846074"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="danger"
                          id="tooltip391990405"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip391990405"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="photo">
                          <img alt="..." src={require("assets/img/lora.jpg")} />
                        </div>
                      </td>
                      <td>Alexa Mike</td>
                      <td>Design</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">41%</span>
                            <Progress bar max="100" value="41" />
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">€ 92,144</td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="success"
                          id="tooltip191500186"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip191500186"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon btn-neutral"
                          color="danger"
                          id="tooltip320351170"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip320351170"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="photo">
                          <img alt="..." src={require("assets/img/jana.jpg")} />
                        </div>
                      </td>
                      <td>Jana Monday</td>
                      <td>Marketing</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">50%</span>
                            <Progress bar max="100" value="50" />
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">€ 49,990</td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon"
                          color="success"
                          id="tooltip345411997"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip345411997"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon"
                          color="danger"
                          id="tooltip601343171"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip601343171"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="photo">
                          <img alt="..." src={require("assets/img/mike.jpg")} />
                        </div>
                      </td>
                      <td>Paul Dickens</td>
                      <td>Develop</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">100%</span>
                            <Progress bar max="100" value="100" />
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">€ 69,201</td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon"
                          color="success"
                          id="tooltip774891382"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip774891382"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon"
                          color="danger"
                          id="tooltip949929353"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip949929353"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="photo">
                          <img
                            alt="..."
                            src={require("assets/img/emilyz.jpg")}
                          />
                        </div>
                      </td>
                      <td>Manuela Rico</td>
                      <td>Manager</td>
                      <td className="text-center">
                        <div className="progress-container progress-sm">
                          <Progress multi>
                            <span className="progress-value">15%</span>
                            <Progress bar max="100" value="15" />
                          </Progress>
                        </div>
                      </td>
                      <td className="text-right">€ 99,201</td>
                      <td className="text-right">
                        <Button
                          className="btn-link btn-icon"
                          color="success"
                          id="tooltip30547133"
                          size="sm"
                          title="Refresh"
                          type="button"
                        >
                          <i className="tim-icons icon-refresh-01" />
                        </Button>
                        <UncontrolledTooltip delay={0} target="tooltip30547133">
                          Tooltip on top
                        </UncontrolledTooltip>
                        <Button
                          className="btn-link btn-icon"
                          color="danger"
                          id="tooltip156899243"
                          size="sm"
                          title="Delete"
                          type="button"
                        >
                          <i className="tim-icons icon-simple-remove" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          target="tooltip156899243"
                        >
                          Tooltip on top
                        </UncontrolledTooltip>
                      </td>
                    </tr>
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

export default Dashboard;
