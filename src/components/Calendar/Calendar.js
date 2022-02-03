import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import '../Calendar/calendar.css'
import interactionPlugin from '@fullcalendar/interaction'
import api from '../../Api.js'
import {withRouter} from "../hooks";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'

class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            popup:false,
            escalas:[{id: '61dc4f1bfb9c401f5b055e78', title: 'Teste Teste', start: '2022-02-02T17:30:00.000Z', end: '2022-03-03T15:30:00.000Z'}],
            info:null,
            users:[],
            selected: null,
            loading:true
        }
    }

     async componentDidMount() {

         const getUsers = (await api.getUsers()==='Acesso Negado')?(this.props.navigate('/')):(await api.getUsers())
         const getEscalas = (await api.getEscalas()==='Acesso Negado')?(this.props.navigate('/')):(await api.getEscalas())
         let escalas=[],
         users=[]

         await getEscalas.map( async (result) => {
             let nomeCompleto =await api.getUser(result.user_id).then(result=>{return result.nome + " " + result.sobrenome})

             let escala = {
                 id:result._id,
                 title: nomeCompleto,
                 start: result.inicio.toString(),
                 end:result.fim.toString()
             }
             escalas.push(escala)

             await this.setState({escala})

             await getUsers.map( async (result) => {

                 let user = {
                     value:result._id,
                     label:result.nome + " " + result.sobrenome
                 }
                 users.push(user)

                 await this.setState({users})
             })
         })

         this.setState({
             loading:false
         })

     }

    select = (info) => {
        this.setState({
            popup:true,
            selected:info.startStr,
        })
    }

    close = () => {
        this.setState({
            popup:false,
        })
    }

    render() {
            if(this.state.loading){
                return (<> loading </>)
            }else{
                return (

                    <main className='calendar_content'>

                        <FullCalendar
                             locale= 'pt'
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
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            events={this.state.escalas}
                            loading={this.state.loading}
                            eventSources={this.state.escalas}
                        />
                        <Popup open={this.state.popup===true} onClose={this.close} modal >
                            <h1 className={'Titulo'}>Nova Escala</h1>
                            <hr className={'Separator'}/>
                            <p>{this.state.selected}</p>
                            <form>
                                <Select
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={this.state.users}
                                />
                            </form>
                        </Popup>
                    </main>
                )
            }

    }

}

export default withRouter(Calendar)
