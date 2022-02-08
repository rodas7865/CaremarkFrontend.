
import React, { useReducer, useState } from 'react';
import { withRouter } from '../hooks.js';
import api from "../../Api";
import ('./home.css')

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            hoursOcupied:10,
            numberColab:[],
            numberScale:89,
        };
    }

    componentDidMount() {
        let hoursOcupied=0,
            numberColab=[],
            numberScale=0

        const currentDate=new Date(),
            first=currentDate.getDate()-currentDate.getDay(),
            last=first+6

        const firstDay=new Date(currentDate.setDate(first)),
            lastDay=new Date(currentDate.setDate(last))

        api.getEscalas().then(result=>{

            if(result==='Acesso Negado'){
                localStorage.setItem('token',null)
                this.props.navigate('/')
            }else{

                result.map((result)=>{

                    const start=new Date(result.inicio),
                        end = new Date(result.fim)

                    if(start >= firstDay && start <= lastDay && end >= firstDay && end <= lastDay){
                        numberScale += 1
                        hoursOcupied += end.getTime()-start.getTime()

                        result.users.forEach(result=>{
                            if(!numberColab.includes(result)){
                                numberColab.push(result)
                            }
                        })
                    }

                })
            }
            this.setState({
                numberScale,
                numberColab,
                hoursOcupied,
                loading:false
            })
        })

    }

    render() {
        if (this.state.loading) {
            return (<> loading </>)
        } else {
            return (
                <div className="container">
                    <h1 className={'Title'}>This week's Performance</h1>
                    <table className={'Dashboard'}>
                        <tr>
                            <th className={'Cell'}>
                                <h3>Hours Ocupied</h3>
                                <p className={'expose'}>{msToTime(this.state.hoursOcupied)}</p>
                            </th>
                            <th className={'Cell'}>
                                <h3>Number of Colaborators</h3>
                                <p className={'expose'}>{this.state.numberColab.length}</p>
                            </th>
                            <th className={'Cell'}>
                                <h3>Number of Scales</h3>
                                <p className={'expose'}>{this.state.numberScale}</p>
                            </th>
                        </tr>
                    </table>

                </div>
            );
        }
    }

}

function msToTime(duration) {
    var minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) );

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + ":" + minutes;
}

export default withRouter(Home);