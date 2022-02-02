import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import '../Calendar/calendar.css'
import interactionPlugin from '@fullcalendar/interaction'
import api from '../../Api.js'
import {withRouter} from "../hooks";

class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state={

            escalas:[]
        }
    }

    async componentDidMount() {
        const getEscalas = (await api.getEscalas()==='Acesso Negado')?(this.props.navigate('/')):(await api.getEscalas())
        let escalas=[]

        getEscalas.map( async (result) => {

            let escala = {
                id:result.id,
                title: await api.getUser(result.user_id).then(result=>{return result.nome + " " + result.sobrenome}),
                start: result.inicio,
                end:result.fim
            }
            escalas.push(escala)
        })
        console.log(getEscalas)
        this.setState({
            escalas:escalas
        })
    }

    select = () => {

    }

    render() {
        return (

            <main className='calendar_content'>

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    select={(info)=>{
                        let data = new Date(info.startStr)
                        alert(data.getDate())
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
                />
            </main>
        )
    }

}

export default withRouter(Calendar)
