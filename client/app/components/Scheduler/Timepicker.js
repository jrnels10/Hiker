import React from 'react';
import DatePicker from 'react-datepicker';
import {
    getFromStorage,
    setInStorage
} from "../../utils/storage";
import axios from "axios";
import moment from 'moment';


class Parent extends React.Component {

    constructor(props) {
        super();
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            props,
            startDate: moment(),
            endDate: moment(),
            token: getFromStorage("Hiker")
        };
    }

    handleChange(date) {
        this.setState({
            endDate: date
        });

        console.log(date.format())
    }

    handleSubmit = () => {
        let body = {
            token: this.state.token,
            endDate: this.state.endDate.format(),
            name: this.state.props.info.trailName,
            begintime: this.state.startDate,
            completetime: this.state.endDate,
        }
        axios.post("/api/checkin", body)
            .then(res => {
                console.log(res);
            })

        console.log(body)
        if (body.completetime == '' || body.name == '') {
            console.log("enter additional info")
        }
        else {

            axios.post("/add-trail", body)
                .then(res => { console.log(res) })
                .catch(err => { console.log(err) })

        }
    }


    render() {

        return (
            <div className='timer'>
                <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="LLL"
                    timeCaption="time"
                />
                <button className='w-100 btn-primary' toggle='true' onClick={this.handleSubmit}>Check in</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        )
    }
}


export default Parent;