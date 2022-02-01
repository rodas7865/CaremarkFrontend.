import React, { Component } from "react";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
const BaseapiUrl = 'http://virtualsolution.adequateshop.com:168';
class Editemployee extends Component {
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
  componentDidMount(props) {
    var Empid = this.props.match.params.id;
    this.GetEmployeeById(Empid);
  }
  GetEmployeeById(Empid) {
    const apiUrl = BaseapiUrl + "api/Employee?id=" + Empid;
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          debugger;
          if (result) {
            this.setState({
              employeeName: result.EmployeeName,
              employeeSalary: result.EmployeeSalary,
              employeeAddress: result.Adress
            });
          }
          else {
            alert("employeee record not found!")
          }
        },
        (error) => {
          this.setState({ IsApiError: true });
        }
      )
  }

  UpdateEmployee() {
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
      Id: this.props.match.params.id,
      employeeName: this.state.employeeName,
      employeeSalary: this.state.employeeSalary,
      Adress: this.state.employeeAddress
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    };

    let baseurl = BaseapiUrl + "/api/Employee?id=" + this.props.match.params.id;
    fetch(baseurl, requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        if (results) {
          alert("Updated successfully!");
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  render() {
    return (
      <div>
        <h1>Edit Employee</h1>
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
                <Button variant="success" onClick={() => this.UpdateEmployee()}>Save</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )

  }
}
export default Editemployee;