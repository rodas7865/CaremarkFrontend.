
import React, { useReducer, useState } from 'react';
import { withRouter } from '../hooks.js';
import ('./home.css')

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            hoursOcupied:10,
            numberColab:12,
            numberScale:89,
        };
    }

    componentDidMount() {
        let hoursOcupied=null,
            numberColab=null,
            numberScale=null

        const currentDate=new Date(),
            first=currentDate.getDate()-currentDate.getDay(),
            last=first+6

        const firstDay=new Date(currentDate.setDate(first)),
            lastDay=new Date(currentDate.setDate(last))
            this.setState({
                loading:false
            })

        console.log(firstDay + " " + lastDay)
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
                                <p className={'expose'}>{this.state.hoursOcupied}</p>
                            </th>
                            <th className={'Cell'}>
                                <h3>Number of Colaborators</h3>
                                <p className={'expose'}>{this.state.numberColab}</p>
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

export default withRouter(Home);