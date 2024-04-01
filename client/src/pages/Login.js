import React, { useEffect } from "react";
import { Button, Col, Form, Input, message, Row } from "antd";
import "../resourses/authentication.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function Login() {
  const dispatch = useDispatch();
  const naviate = useNavigate();
  const onFinish = (values) => {
    dispatch({ type: "showLoading" });
    axios
      .post("/api/users/login", values)
      .then((res) => {
        dispatch({ type: "hideLoading" });
        message.success("Login successfull");
        localStorage.setItem("pos-user", JSON.stringify(res.data));
        naviate("/home");
      })
      .catch(() => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("pos-user")) naviate("/home");
  }, []);

  return (
    <div className="authentication">
      <h4>
        <img
          src="https://i.pinimg.com/564x/bb/42/15/bb421588478f7ac7f5c263bafab5f9ea.jpg"
          alt=""
        ></img>
      </h4>
      <Row>
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>
              <h3>Instant Super Market</h3>
            </h1>
            <hr />
            <h3>Login</h3>

            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Not Yet Registered ? Click Here To Register
              </Link>
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
