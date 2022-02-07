import React, { Component } from "react";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../Users/adduser.css'
const BaseapiUrl = 'http://virtualsolution.adequateshop.com:168';
class Addemployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeName: '',
      employeeSalary: '',
      employeeAddress: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    })
  }
  AddEmployee() {
    debugger;
    if (this.state.employeeName == "" || this.state.employeeName == undefined) {
      alert("employee Name is required");
    } else if (this.state.employeeSalary == "" || this.state.employeeSalary == undefined) {
      alert("employee Salary is required");
    } else if (this.state.employeeAddress == "" || this.state.employeeAddress == undefined) {
      alert("employee Address  is required");
    }

    let MeetingToken = Math.floor(Math.random() * 100000000 + 1);
    let body = {
      employeeName: this.state.employeeName,
      employeeSalary: this.state.employeeSalary,
      Adress: this.state.employeeAddress
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };

    let baseurl = BaseapiUrl + "/api/Employee/";
    fetch(baseurl, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        if (results) {
          alert("Added successfully!");
          this.setState({
            employeeName: '',
            employeeSalary: '',
            employeeAddress: ''
          })
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  render() {
    return (
      <div>
        <h1>Add Employee</h1>
        <Link variant="primary" to="/">View Employee list</Link>
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="employeeName">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  type="text"
                  name="employeeName"
                  value={this.state.employeeName}
                  onChange={this.handleChange}
                  placeholder="Employee Name" />
              </Form.Group>
              <Form.Group controlId="employeeSalary">
                <Form.Label>Employee Salary</Form.Label>
                <Form.Control
                  type="text"
                  name="employeeSalary"
                  value={this.state.employeeSalary}
                  onChange={this.handleChange}
                  placeholder="Employee Salary" />
              </Form.Group>
              <Form.Group controlId="employeeAddress">
                <Form.Label>EmployeeAddress</Form.Label>
                <Form.Control
                  type="text"
                  name="employeeAddress"
                  value={this.state.employeeAddress}
                  onChange={this.handleChange}
                  placeholder="Address" />
              </Form.Group>
              <Form.Group>
                <Button variant="success" onClick={() => this.AddEmployee()}>Save</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )

  }
}
export default Addemployee;