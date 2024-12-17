import React, { useState } from "react";
import classnames from "classnames";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { login } from "../../layouts/Auth/Auth";

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    emailFocus: false,
    passFocus: false,
    loading: false,
    clientid:"",
    clientsecret:""

  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setState({ ...state, loading: true });

    const clientid = "ATLASDev";
    const clientsecret = "secret";

    try {
      const payload = { username: email, password, clientid, clientsecret };
      const response = await login(payload); 
      console.log('response8888', response)

      if (response.success) {
        localStorage.setItem("token", response.token); 
        window.location.href = "/dashboard"; 
      } else {
        alert(response.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging in. Please try again.");
    } finally {
      setState({ ...state, loading: false });
    }
  };

  return (
    <div className="content">
      <Container>
        <Col className="ml-auto mr-auto" lg="4" md="6">
          <Form className="form" onSubmit={handleLogin}>
            <Card className="card-login card-white">
              <CardHeader>                
                <CardTitle className="text-center" tag="h1">Log in</CardTitle>             
              </CardHeader>
              <CardBody>
                <InputGroup className={classnames({ "input-group-focus": state.emailFocus })}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="tim-icons icon-email-85" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="text"
                    value={state.email}
                    onChange={(e) => setState({ ...state, email: e.target.value })}
                    onFocus={() => setState({ ...state, emailFocus: true })}
                    onBlur={() => setState({ ...state, emailFocus: false })}
                  />
                </InputGroup>
                <InputGroup className={classnames({ "input-group-focus": state.passFocus })}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="tim-icons icon-lock-circle" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={state.password}
                    onChange={(e) => setState({ ...state, password: e.target.value })}
                    onFocus={() => setState({ ...state, passFocus: true })}
                    onBlur={() => setState({ ...state, passFocus: false })}
                  />
                </InputGroup>
              </CardBody>
              <CardFooter>
                <Button block className="mb-3" color="primary" size="lg" type="submit" disabled={state.loading}>
                  {state.loading ? "Signing In..." : "Sign In"}
                </Button>
                <div className="pull-left">
                  <h6>
                    <a className="link footer-link" href="#create" onClick={(e) => e.preventDefault()}>
                      Create Account
                    </a>
                  </h6>
                </div>
                <div className="pull-right">
                  <h6>
                    <a className="link footer-link" href="#help" onClick={(e) => e.preventDefault()}>
                      Need Help?
                    </a>
                  </h6>
                </div>
              </CardFooter>
            </Card>
          </Form>
        </Col>
      </Container>
    </div>
  );
};

export default Login;
