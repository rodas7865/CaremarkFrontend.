import React from 'react'
import FullCalendar, {preventDefault} from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import '../Calendar/calendar.css'
import interactionPlugin from '@fullcalendar/interaction'
import api from '../../Api.js'
import {withRouter} from "../hooks";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import {Button, TextField} from "@mui/material";
import Switch from "@mui/material/Switch";

class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            isAdmin:false,
            popup:false,
            escalas:[],
            info:null,
            users:[],
            selectedStart:null,
            selectedEnd:null,
            End:null,
            Start: null,
            loading:true,
            selectedUsers:[],
            edit:null,
            editPopup:false,
            editTitle:"",
            editStart:null,
            editEnd:null,
            editID:null,
            isConfirmed:false,
        }
    }

     componentDidMount() {

        let escalas=[],
            users=[]

        api.getEscalas().then(result=>{

            if(result==='Acesso Negado'){
                localStorage.setItem('token',null)
                this.props.navigate('/')
            }else{
                let decode=JSON.parse(atob(localStorage.getItem('token').split('.')[1])),
                    userId=decode.userid
                api.getUser(userId).then(result=>{
                    console.log("User Id"+ userId)
                    this.setState({
                        isAdmin:result.admin
                    })
                })

                api.getUsers().then(result=>{
                    result.forEach(result=>{
                        let user = {
                            value:result._id,
                            label:result.nome + " " + result.sobrenome
                        }
                        users.push(user)

                        this.setState({users})
                    })
                    this.setState({
                        users
                    })
                })

                result.map((result)=>{
                    let id=result._id,
                        start=result.inicio.toString(),
                        end=result.fim.toString(),
                        title=result.users

                        let escala = {
                            id,
                            title,
                            start,
                            end
                        }
                        escalas.push(escala)
                        this.setState({
                            escalas
                        })
                    })
            }
            this.setState({
                loading:false
            })
        })

     }

    select = (info) => {
        if(Math.abs(info.start.getTime()-info.end.getTime())<=86400000){
            this.setState({
                popup:true,
                selectedStart:info.start.toLocaleDateString() + " | " + info.start.toLocaleTimeString()   ,
                selectedEnd:info.end.toLocaleDateString() + " | " + info.end.toLocaleTimeString(),
                Start:info.start,
                End:info.end
            })
        } else {
            alert('Only 0 to 12 hours scales are acceptable.')
        }

    }

    close = () => {
        this.setState({
            popup:false,
            editPopup:false,
        })
    }

    edit=(info)=>{
        api.getEscala(info.event.id).then(result=>{
            this.setState({
                isConfirmed:result[0].confirmado
            })
            this.setState({
                editPopup:true,
                edit:info,
                editTitle:info.event.title,
                editStart:info.event.start.toLocaleDateString() + " | " + info.event.start.toLocaleTimeString(),
                editEnd:info.event.end.toLocaleDateString() + " | " + info.event.end.toLocaleTimeString(),
                editID:info.event.id
            })
        })
    }

    deleteEscale=async ()=>{
        console.log(this.state.editID)
       await  api.deleteEscala(this.state.editID)
        window.location.reload()
    }

    newEscale=async ()=>{
        let Break = {}
        let stopFunc = false
        try {
            this.state.escalas.forEach(result => {
                let start = new Date(result.start)
                let end = new Date(result.end)
                if (start.getDate() === this.state.Start.getDate() || end.getDate() === this.state.End.getDate() || start.getDate() === this.state.End.getDate() || end.getDate() === this.state.Start.getDate()) {
                    let users = result.title
                    this.state.selectedUsers.forEach(async (result) => {
                        if (users.includes(result.label + " ")) {
                            if(stopFunc===false) {
                                alert('User already has a scale this day.')
                            }
                            stopFunc = true
                            throw Break
                        }
                    })

                } else {

                    if (this.state.selectedUsers[0] === undefined) {
                        alert('Select at least 1 User')

                    } else {

                        let users = []
                        this.state.selectedUsers.forEach(result => {
                            users.push(result.label + " ")
                        })
                        let Escale = {
                            confirmado: true,
                            users: users,
                            notas: " ",
                            inicio: this.state.Start,
                            fim: this.state.End
                        }

                        if(stopFunc===false){
                        api.postEscala(Escale).then((result)=>{
                            window.location.reload()}
                        )}
                    }

                }

            })
        }
        catch (e){
            if (e !== Break) throw e
            stopFunc=true
        }

    }
    loggout=()=>{
        localStorage.clear();
    }

    setConfirmed=()=>{
        this.setState({
            isConfirmed:!this.state.isConfirmed
        })
    }

    render() {
            if(this.state.loading){
                return (<> loading </>)
            }else{
                return (

                    <main className='calendar_content'>


                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            select={(info)=>{
                                this.select(info)
                            }}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'timeGridWeek'
                            }}
                            selectable={this.state.isAdmin}
                            selectMirror={true}
                            dayMaxEvents={true}
                            events={this.state.escalas}
                            loading={this.state.loading}
                            eventSources={this.state.escalas}
                            eventBackgroundColor={'#7875B5'}
                            eventBorderColor={'#4C489D'}
                            eventClick={(info)=>{this.edit(info)}}
                        />
                        <Popup open={this.state.popup===true} onClose={this.close} closeOnDocumentClick={false} modal >
                            <h1 className={'Title'}>New Escale</h1>
                            <hr className={'Separator'}/>
                            <p>{this.state.selected}</p>
                            <form onSubmit={(e)=>{e.preventDefault();this.newEscale()}}>
                                <table className={'Table'}>
                                    <tr>
                                        <th className={'Cell'}>
                                            <TextField label={'Start:'} variant={'outlined'} value={this.state.selectedStart} disabled={true} className={'Table'}></TextField>
                                        </th>
                                        <th className={'Cell'}>
                                            <TextField label={'End:'} variant={'outlined'} value={this.state.selectedEnd} disabled={true}></TextField>
                                        </th>
                                    </tr>
                                </table>
                                <Select
                                    placeholder={'Select your users...'}
                                    className={'Select'}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={this.state.users}
                                    onChange={(info)=>{this.setState({selectedUsers:info})}}
                                />
                                <table className={'Table'}>
                                    <tr>
                                        <th className={'Cell'}>
                                            <Button type={'Submit'} variant={"outlined"} color={"success"} >Confirm</Button>
                                        </th>
                                        <th className={'Cell'}>
                                            <Button variant={"outlined"} color={"error"} onClick={()=>this.close()} >Cancel</Button>
                                        </th>
                                    </tr>
                                </table>
                            </form>
                        </Popup>
<<<<<<< Updated upstream
                        {(this.state.isAdmin)?(
                            <Popup open={this.state.editPopup===true} onClose={this.close} closeOnDocumentClick={false} modal>
                                <h1 className={'Title'}>Edit Escale</h1>
                                <h3>{this.state.editTitle}</h3>
                                <hr className={'Separator'}/>
                                <form onSubmit={(e)=>{e.preventDefault();this.deleteEscale(e)}}>
                                    <table className={'Table'}>
                                        <tr>
                                            <th className={'Cell'}>
                                                <TextField label={'Start:'} variant={'outlined'} value={this.state.editStart} disabled={true} className={'Table'}></TextField>
                                            </th>
                                            <th className={'Cell'}>
                                                <TextField label={'End:'} variant={'outlined'} value={this.state.editEnd} disabled={true}></TextField>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className={'Cell'}>
                                                <Button type={'Submit'} variant={"outlined"} color={"error"}>Delete</Button>
                                            </th>
                                            <th className={'Cell'}>
                                                <Button variant={"outlined"} color={"error"} onClick={()=>this.close()} >Cancel</Button>
                                            </th>
                                        </tr>
                                    </table>
                                </form>
                            </Popup>
                        ):(
                            <Popup open={this.state.editPopup===true} onClose={this.close} closeOnDocumentClick={false} modal>
                                <h1 className={'Title'}>Edit Escale</h1>
                                <h3>{this.state.editTitle}</h3>
                                <hr className={'Separator'}/>
                                <form onSubmit={(e)=>{e.preventDefault();this.deleteEscale(e)}}>
                                    <table className={'Table'}>
                                        <tr>
                                            <th className={'Cell'}>
                                                <TextField label={'Start:'} variant={'outlined'} value={this.state.editStart} disabled={true} className={'Table'}></TextField>
                                            </th>
                                            <th className={'Cell'}>
                                                <TextField label={'End:'} variant={'outlined'} value={this.state.editEnd} disabled={true}></TextField>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                Confirmed:
                                                <Switch label={'Admin:'} variant={'outlined'} defaultChecked={this.state.isConfirmed} onClick={() => this.setConfirmed}
                                                        name={'admin'}></Switch>
                                                <TextField label={'Reason:'} variant={'outlined'} fullWidth multiline maxRows={'5'} onChange={(e) => this.setReason(e)}></TextField>

                                            </th>
                                        </tr>
                                        <tr>
                                            <th className={'Cell'}>
                                                <Button variant={"outlined"} color={"success"} onClick={()=>this.close()} >Save</Button>
                                            </th>
                                            <th className={'Cell'}>
                                                <Button variant={"outlined"} color={"error"} onClick={()=>this.close()} >Close</Button>
                                            </th>
                                        </tr>
                                    </table>
                                </form>
                            </Popup>
                        )}
=======
                        <Popup open={this.state.editPopup===true} onClose={this.close} closeOnDocumentClick={false} modal>
                            <h1 className={'Title'}>Edit Escale</h1>
                            <h3>{this.state.editTitle}</h3>
                            <hr className={'Separator'}/>
                            <form onSubmit={(e)=>{e.preventDefault();this.deleteEscale(e)}}>
                            <table className={'Table'}>
                                <tr>
                                    <th className={'Cell'}>
                                        <TextField label={'Start:'} variant={'outlined'} value={this.state.editStart} disabled={true} className={'Table'}></TextField>
                                    </th>
                                    <th className={'Cell'}>
                                        <TextField label={'End:'} variant={'outlined'} value={this.state.editEnd} disabled={true}></TextField>
                                    </th>
                                </tr>
                                <tr>
                                    <th className={'Cell'}>
                                        <Button type={'Submit'} variant={"outlined"} color={"error"}>Delete</Button>
                                    </th>
                                    <th className={'Cell'}>
                                        <Button variant={"outlined"} color={"error"} onClick={()=>this.close()} >Cancel</Button>
                                    </th>
                                </tr>
                            </table>
                            </form>
                            
                        </Popup>
                        <button onClick={this.loggout}>Logout</button>
>>>>>>> Stashed changes
                    </main>
                )
            }

    }

}

export default withRouter(Calendar)
