import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import '../Calendar/calendar.css'
import interactionPlugin from '@fullcalendar/interaction'

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state={

        }
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
                    events={[
                        { title: 'event 1', date: '2022-01-18' },
                        { title: 'event 2', date: '2019-04-02' }
                    ]}
                />
            </main>
        )
    }

}

