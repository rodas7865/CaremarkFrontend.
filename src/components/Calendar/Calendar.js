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
            escalas:[],
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
                 start: result.inicio,
                 end:result.fim
             }
             escalas.push(escala)
         })

         await getUsers.map( (result) => {

             let user = {
                 value:result._id,
                 label:result.nome + " " + result.sobrenome
             }
             users.push(user)
         })

          this.setState({
             escalas,
             users,
             loading:false
         })
        console.log(this.state.escalas)
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
                            events={this.state.escalas || []}
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
