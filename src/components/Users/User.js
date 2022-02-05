import React from 'react';
import './user.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../Api.js'
import {withRouter} from "../hooks";
import Popup from "reactjs-popup";
import {Button, Checkbox, TextField} from "@mui/material";
import Switch from '@mui/material/Switch'


class Employeelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedField:null,
      loadingScale:true,
      newUser:{
        nome:'',
        sobrenome:'',
        area:'',
        email:'',
        password:'',
        admin:false},

      selectedTitle:null,
      popup:false,
      popupNew:false,
      Loading:true,
      IsApiError: false,
      rows:[],
      columns:[
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'firstName', headerName: 'First name', width: 100 },
        { field: 'lastName', headerName: 'Last name', width: 100 },
        { field: 'field', headerName: 'Field', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },

        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
              `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ],
      userRows:[],
      userColumns:[
        { field: 'start', headerName: 'Start', width: 150 },
        { field: 'end', headerName: 'End', width: 150 },
        { field: 'date', headerName: 'Date', width: 150 },
      ],
    }
  }

  componentDidMount() {
    let rows = []
    api.getUsers().then(result=>{
      if(result==='Acesso Negado'){
        localStorage.setItem('token',null)
        this.props.navigate('/')
      }else {
        result.forEach(result => {
          console.log(result)
          let id = result._id,
              firstName = result.nome,
              lastName = result.sobrenome,
              field = result.area,
              email = result.email

          let row = {
            id,
            firstName,
            lastName,
            field,
            email,
          }

          rows.push(row)
        })
      }
      this.setState({
        rows,
        Loading:false
      })
    })
  }

  selected=(info)=>{
    this.setState({
      popup:true,
      selectedTitle:info.firstName + ' ' + info.lastName + ' ',
      selectedField:info.field,
    })
  }

  close=()=>{
    this.setState({
      popup:false,
      popupNew:false,
      loadingScale:true
    })
  }

  newPopup=()=>{
    this.setState({
      popupNew:true
    })
  }

  open=()=>{
    let userRows=[]
    api.getEscalas().then(result=>{
      result.forEach(result=>{
        if(result.users.includes(this.state.selectedTitle)){

          let start = new Date(result.inicio).toLocaleTimeString()
          let end= new Date(result.fim).toLocaleTimeString()
          let date = new Date(result.inicio).toLocaleDateString()

          let row = {
            id:result._id,
            start,
            end,
            date
          }

          userRows.push(row)
        }
      })
      this.setState({
        userRows,
        loadingScale:false,
      })
    })
  }

  updateField = (e) => {
    e.preventDefault()
    const target = e.target;
    const value = target.value;
    const fieldName = target.name;
    if(fieldName==='admin'){
      var newUser = this.state.newUser;
      newUser[fieldName]=target.checked
      this.setState({
        newUser
      })
    }else{
      var newUser = this.state.newUser;
      newUser[fieldName]=value
      this.setState({
        newUser
      })
    }

    console.log(newUser)
  }

  newUser=()=>{
    if(!(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).test(this.state.newUser.email)){
      alert('Invalid Email')
    } else {
      if((/^$|\s+/).test(this.state.newUser.nome)){
        alert('First name cant be empty')
      } else {
      if((/^$|\s+/).test(this.state.newUser.sobrenome)){
        alert('Last name cant be empty')
      } else {
        if((/^$|\s+/).test(this.state.newUser.area)){
          alert('Field name cant be empty')
        } else {
          if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(this.state.newUser.password)){
            alert('Invalid Password')
          } else {
          api.registerUser(this.state.newUser).then(result=>{
            console.log(result)
          })
    }}}}}
  }

  render() {
    if (this.state.loading) {
      return (<> loading </>)
    } else {
      return (
          <div style={{height: 400, width: '100%',}}>
            <p id={'T'}><h2>Employees List</h2></p>
            <Button id={'button'} variant={"outlined"} color={"success"} onClick={()=>this.newPopup()}>New Employee</Button>
            <hr id={'Separator'}/>
            <DataGrid
                sx={{
                  color: '#7875B5',
                  backgroundColor:'rgba(255,255,255,0.8)',
                  outlineColor:'#7875B5',
                  borderColor:'#7875B5',
                }}
                rows={this.state.rows}
                columns={this.state.columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                onRowClick={(info)=>this.selected(info.row)}
            />
            <Popup open={this.state.popup===true} onClose={this.close} onOpen={this.open} closeOnDocumentClick={false} modal>
              <h1 className={'Title'}>{this.state.selectedTitle}</h1>
              <h4>{this.state.selectedField}</h4>
              <div style={{height: 400, width: '100%'}}>
                {(this.state.loadingScale)?(<p>Loading</p>):(
                    <DataGrid
                    rows={this.state.userRows}
                    columns={this.state.userColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onRowClick={(info)=>this.selected(info.row)}/>)}

              </div>
              <Button variant={"outlined"} color={"error"} onClick={()=>this.close()} >Close</Button>
            </Popup>
            <Popup open={this.state.popupNew===true} onClose={this.close} closeOnDocumentClick={false} modal>
              <h1 className={'Title'}>New Employee</h1>
              <form onSubmit={(e)=>{e.preventDefault();this.newUser(e)}}>
                <table className={'Table'}>
                  <tr>
                    <th className={'Cell'}>
                      <TextField label={'First Name:'} variant={'outlined'} onChange={(e) => this.updateField(e)} name={'nome'}></TextField>
                    </th>
                    <th className={'Cell'}>
                      <TextField label={'Last Name:'} variant={'outlined'} onChange={(e) => this.updateField(e)} name={'sobrenome'}></TextField>
                    </th>
                  </tr>
                  <tr>
                    <th className={'Cell'}>
                      <TextField label={'Field:'} variant={'outlined'} onChange={(e) => this.updateField(e)} name={'area'}></TextField>
                    </th>
                    <th className={'Cell'}>
                      <TextField label={'Email:'} variant={'outlined'} onChange={(e) => this.updateField(e)} name={'email'}></TextField>
                    </th>
                  </tr>
                  <tr>
                    <th className={'Cell'}>
                      <TextField label={'Password:'} type={'password'} variant={'outlined'} onChange={(e) => this.updateField(e)} name={'password'}></TextField>
                    </th>
                    <th className={'Cell'}>
                      Admin:
                      <Switch label={'Admin:'} variant={'outlined'} onChange={(e) => this.updateField(e)} name={'admin'}></Switch>
                    </th>
                  </tr>
                  <tr>
                    <th className={'Cell'}>
                      <Button type={'Submit'} variant={"outlined"} color={"error"}>Create</Button>
                    </th>
                    <th className={'Cell'}>
                      <Button variant={"outlined"} color={"error"} onClick={()=>this.close()} >Cancel</Button>
                    </th>
                  </tr>
                </table>
              </form>
            </Popup>
          </div>)
    }
  }


}
export default withRouter(Employeelist);