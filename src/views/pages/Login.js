import React, { useRef, useState } from "react";
import classnames from "classnames";
import { Button, Card, CardHeader, CardBody, CardFooter, CardTitle, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Col } from "reactstrap";
import { login } from "../../layouts/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { userLogin } from "services/auth";
import NotificationService from "components/Shared/NotificationService";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const notificationRef = useRef(); 
  const [state, setState] = useState({
    username: "",
    password: "",
    emailFocus: false,
    passFocus: false,
    loading: false,
    errors: {}
  });

  const validateForm = () => {
    const errors = {};
    const { username, password } = state;
    // Validate that the email is not blank
    if (!username) {
      errors.username = "Email is required.";
    }

    // Validate that the password is not blank
    if (!password) {
      errors.password = "Password is required.";
    }

    setState({ ...state, errors });
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = state;

    if (!validateForm()) {      
      return;
    }

    setState({ ...state, loading: true });

    try {
      
      const payload = { username, password};
      const response = await userLogin(payload); 
      //console.log('response8888', response)

      if (response.receiveObj) {
        const token = JSON.stringify( response.receiveObj.token);
        localStorage.setItem("token", token); 
        const decodedToken = jwtDecode(response.receiveObj.token);
        localStorage.setItem("userDetails", JSON.stringify(decodedToken)); 
        navigate("/admin/batch"); 
        
      }  else {
        notificationRef.current.notify(response.message || "Invalid credentials. Please try again.", "danger");
      }
    }  catch (error) {
      console.error(error);
      notificationRef.current.notify("Invalid credentials. Please try again.", "danger");
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
                <InputGroup className={classnames({ "input-group-focus": state.emailFocus, "has-danger": state.errors.username })}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="tim-icons icon-email-85" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="text"
                    value={state.username}
                    onChange={(e) => setState({ ...state, username: e.target.value })}
                    onFocus={() => setState({ ...state, emailFocus: true })}
                    onBlur={() => setState({ ...state, emailFocus: false })}
                  />
                </InputGroup>
                {state.errors.username && <div style={{ color: 'red', fontSize: '12px' }}>{state.errors.username}</div>}

                <InputGroup className={classnames({ "input-group-focus": state.passFocus, "has-danger": state.errors.password })}>
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
                {state.errors.password && <div style={{ color: 'red', fontSize: '12px' }}>{state.errors.password}</div>}
              </CardBody>
              <CardFooter>
                <Button block className="mb-3" color="primary" size="lg" type="submit" disabled={state.loading}>
                  {state.loading ? "Signing In..." : "Sign In"}
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </Col>
      </Container>
      <NotificationService ref={notificationRef} />
    </div>
  );
};

export default Login;
