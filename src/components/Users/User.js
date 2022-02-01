import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const BaseapiUrl = 'http://virtualsolution.adequateshop.com:168';
class Employeelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      IsApiError: false
    }
  }

  componentDidMount() {
    debugger;
    fetch(BaseapiUrl + "/api/Employee/")
      .then(res => res.json())
      .then(
        (result) => {
          debugger;
          this.setState({
            employees: result
          });
        },
        (error) => {
          this.setState({ IsApiError: true });
        }
      )
  }
  deleteEmployee(EmpId) {
    debugger;
    const { employees } = this.state;
    const apiUrl = BaseapiUrl + "/api/Employee?id=" + EmpId;

    fetch(apiUrl, { method: 'DELETE' })
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        this.setState({
          employees: employees.filter(employee => employee.Id !== EmpId)
        });
        alert('Delete successful');
      })
      .catch(error => {
        alert('There was an error!');
        console.error('There was an error!', error);
      });
  }
  render() {
    var employeeslist = this.state.employees;
    debugger;
    return (<div>
      <h2>Employees List</h2>
      <Link variant="primary" to="/addemployee">Add Employee</Link>
      {/* {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>} */}
      <Table className="table" >
        <thead>
          <tr>
            <th>EmpID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {employeeslist.map(emp => (
            <tr key={emp.Id}>
              <td>{emp.Id}</td>
              <td>{emp.EmployeeName}</td>
              <td>{emp.EmployeeSalary}</td>
              <td>{emp.Adress}</td>
              <td>
                <Link variant="info" to={"/editemployee/" + emp.Id}>Edit</Link>

                &nbsp;<Button variant="danger" onClick={() => this.deleteEmployee(emp.Id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>)
  }


}
export default Employeelist;