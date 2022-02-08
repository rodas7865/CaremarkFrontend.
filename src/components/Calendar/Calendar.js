import React from 'react'
import FullCalendar, { preventDefault } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import '../Calendar/calendar.css'
import interactionPlugin from '@fullcalendar/interaction'
import api from '../../Api.js'
import { withRouter } from "../hooks";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { Button, TextField } from "@mui/material";
import Switch from "@mui/material/Switch";

class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: null,
            selectedReason: null,
            isAdmin: false,
            popup: false,
            escalas: [],
            info: null,
            users: [],
            selectedStart: null,
            selectedEnd: null,
            End: null,
            Start: null,
            loading: true,
            selectedUsers: [],
            edit: null,
            editPopup: false,
            editTitle: "",
            editStart: null,
            editEnd: null,
            editID: null,
            isConfirmed: false,
            reason: " ",
        }
    }

    componentDidMount() {

        let escalas = [],
            users = []

        api.getEscalas().then(result => {

            if (result === 'Acesso Negado') {
                localStorage.setItem('token', null)
                this.props.navigate('/')
            } else {
                let decode = JSON.parse(atob(localStorage.getItem('token').split('.')[1])),
                    userId = decode.userid
                api.getUser(userId).then(result => {
                    console.log("User Id" + userId)
                    this.setState({
                        isAdmin: result.admin,
                        userName: result.nome + " " + result.sobrenome + " "
                    })
                })

                api.getUsers().then(result => {
                    result.forEach(result => {
                        let user = {
                            value: result._id,
                            label: result.nome + " " + result.sobrenome
                        }
                        users.push(user)

                        this.setState({ users })
                    })
                    this.setState({
                        users
                    })
                })

                result.map((result) => {
                    let id = result._id,
                        start = result.inicio.toString(),
                        end = result.fim.toString(),
                        title = result.users,
                        backgroundColor = (result.confirmado) ? ('#7875B5') : ('#7c7c7c')

                    let escala = {
                        id,
                        title,
                        start,
                        end,
                        backgroundColor,
                    }
                    escalas.push(escala)
                    this.setState({
                        escalas
                    })
                })
            }
            this.setState({
                loading: false
            })
        })

    }

    select = (info) => {
        if (Math.abs(info.start.getTime() - info.end.getTime()) <= 86400000) {
            this.setState({
                popup: true,
                selectedStart: info.start.toLocaleDateString() + " | " + info.start.toLocaleTimeString(),
                selectedEnd: info.end.toLocaleDateString() + " | " + info.end.toLocaleTimeString(),
                Start: info.start,
                End: info.end
            })
        } else {
            alert('Only 0 to 12 hours scales are acceptable.')
        }

    }

    close = () => {
        this.setState({
            popup: false,
            editPopup: false,
        })
    }

    edit = (info) => {
        if (!this.state.isAdmin) {
            if (!info.event.title.includes(this.state.userName)) {
                alert('You can only select the dates with your name.')
            } else {
                api.getEscala(info.event.id).then(result => {
                    this.setState({
                        isConfirmed: result[0].confirmado,
                        selectedReason: result[0].notas,
                    })
                    this.setState({
                        editPopup: true,
                        edit: info,
                        editTitle: info.event.title,
                        editStart: info.event.start.toLocaleDateString() + " | " + info.event.start.toLocaleTimeString(),
                        editEnd: info.event.end.toLocaleDateString() + " | " + info.event.end.toLocaleTimeString(),
                        editID: info.event.id
                    })
                })
            }
        } else {
            api.getEscala(info.event.id).then(result => {
                this.setState({
                    isConfirmed: result[0].confirmado,
                    selectedReason: result[0].notas,
                })
                this.setState({
                    editPopup: true,
                    edit: info,
                    editTitle: info.event.title,
                    editStart: info.event.start.toLocaleDateString() + " | " + info.event.start.toLocaleTimeString(),
                    editEnd: info.event.end.toLocaleDateString() + " | " + info.event.end.toLocaleTimeString(),
                    editID: info.event.id
                })
            })
        }
    }

    deleteEscale = async () => {
        console.log(this.state.editID)
        await api.deleteEscala(this.state.editID)
        window.location.reload()
    }

    newEscale = async () => {
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
                            if (stopFunc === false) {
                                alert('User already has a scale this day.')
                            }
                            stopFunc = true
                            throw Break
                        }
                    })

                } else {

                    if (this.state.selectedUsers[0] === undefined) {
                        stopFunc = true
                        alert('Select at least 1 User')
                    }

                }
            })
            if (!stopFunc) {

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

                if (stopFunc === false) {
                    api.postEscala(Escale).then((result) => {
                        window.location.reload()
                    }
                    )
                }
            }


        }
        catch (e) {
            if (e !== Break) throw e
            stopFunc = true
        }

    }
    loggout = () => {
        localStorage.clear();
    }

    setConfirmed = (e) => {
        e.preventDefault()
        this.setState({
            isConfirmed: !this.state.isConfirmed
        })
    }

    setReason = (e) => {

        e.preventDefault()
        const target = e.target;
        const value = target.value;
        this.setState({
            reason: value,
        })
    }

    saveConfirmed = (e) => {
        const body = {
            confirmado: this.state.isConfirmed,
            notas: this.state.reason
        }
        console.log(body)
        api.patchEscalaConfirm(body, this.state.editID).then(result => {
            window.location.reload()
        })
    }


    render() {
        if (this.state.loading) {
            return (<> loading </>)
        } else {
            return (
                <div className='margin'> 
                <div className='name_box'>
                            <h4 className='name'>Olá {this.state.userName}</h4>
                        </div>
                    <main className='calendar_content'>

                        
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            select={(info) => {
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
                            eventBorderColor={'#4C489D'}
                            eventClick={(info) => { this.edit(info) }}
                        />
                        <Popup open={this.state.popup === true} onClose={this.close} closeOnDocumentClick={false} modal >
                            <h1 className={'Title'}>New Escale</h1>
                            <hr className={'Separator'} />
                            <p>{this.state.selected}</p>
                            <form onSubmit={(e) => { e.preventDefault(); this.newEscale() }}>
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
                                    onChange={(info) => { this.setState({ selectedUsers: info }) }}
                                />
                                <table className={'Table'}>
                                    <tr>
                                        <th className={'Cell'}>
                                            <Button type={'Submit'} variant={"outlined"} color={"success"} >Confirm</Button>
                                        </th>
                                        <th className={'Cell'}>
                                            <Button variant={"outlined"} color={"error"} onClick={() => this.close()} >Cancel</Button>
                                        </th>
                                    </tr>
                                </table>
                            </form>
                        </Popup>

                        {(this.state.isAdmin) ? (
                            <Popup open={this.state.editPopup === true} onClose={this.close} closeOnDocumentClick={false} modal>
                                <h1 className={'Title'}>Edit Escale</h1>
                                <h3>{this.state.editTitle}</h3>
                                <hr className={'Separator'} />
                                <form onSubmit={(e) => { e.preventDefault(); this.deleteEscale(e) }}>
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
                                                <Switch variant={'outlined'} defaultChecked={this.state.isConfirmed} disabled={true}></Switch>
                                                <TextField label={'Reason:'} variant={'outlined'} fullWidth multiline maxRows={'5'} value={this.state.selectedReason} disabled={true}></TextField>

                                            </th>
                                        </tr>
                                        <tr>
                                            <th className={'Cell'}>
                                                <Button type={'Submit'} variant={"outlined"} color={"error"}>Delete</Button>
                                            </th>
                                            <th className={'Cell'}>
                                                <Button variant={"outlined"} color={"error"} onClick={() => this.close()} >Cancel</Button>
                                            </th>
                                        </tr>
                                    </table>
                                </form>
                            </Popup>
                        ) : (
                            <Popup open={this.state.editPopup === true} onClose={this.close} closeOnDocumentClick={false} modal>
                                <h1 className={'Title'}>Edit Escale</h1>
                                <h3>{this.state.editTitle}</h3>
                                <hr className={'Separator'} />
                                <form onSubmit={(e) => { e.preventDefault(); this.saveConfirmed(e) }}>
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
                                                <Switch label={'Admin:'} defaultChecked={this.state.isConfirmed} variant={'outlined'} onChange={(e) => this.setConfirmed(e)}
                                                    name={'admin'}></Switch>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>
                                                <TextField label={'Reason:'} variant={'outlined'} fullWidth multiline maxRows={'5'} placeholder={this.state.selectedReason} onChange={(e) => this.setReason(e)}></TextField>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th className={'Cell'}>
                                                <Button variant={"outlined"} color={"success"} type={'Submit'} >Save</Button>
                                            </th>
                                            <th className={'Cell'}>
                                                <Button variant={"outlined"} color={"error"} onClick={() => this.close()} >Close</Button>
                                            </th>
                                        </tr>
                                    </table>
                                </form>
                            </Popup>
                        )}
                    </main>
                </div>
            )
        }

    }

}

export default withRouter(Calendar)
