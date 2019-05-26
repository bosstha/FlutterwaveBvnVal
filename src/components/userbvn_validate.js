import React, { Component } from 'react';
import axios from "axios";
import "./Validate.css";
import UserBvn from './userbvn';

class UserValidate extends Component {
    constructor(props){
        super(props);
        this.state = { data: {}, isLoading:false, isLoaded: false}
        this.validate = this.validate.bind(this);
        this.renderDetails = this.renderDetails.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(e){
        e.preventDefault();
        this.setState({
            data:{},
            isLoading:false,
            isLoaded:false
        })
    }

    validate(bvn){
        this.setState({isLoading: true, isLoaded: false})
        const URL = `https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/${bvn}?seckey=FLWSECK-38ec88fb9821259ba77c1a0866722086-X`
             
        axios.get(URL, {headers:{'content-type': 'application/json'}})
        .then(response => {
            if(response.data.status === "success"){
                let details = response.data.data
                this.setState(st => ({
                    isLoaded:true, 
                    isLoading:false,
                    data: {...st.data, ...details}
                }))
            }
        })
    }
    renderDetails(){
        const {isLoaded, isLoading, data } = this.state
        if(isLoading){
            return <div className={"loader"}></div>
        } else{
            if(isLoaded){
                return (
                    <div className="Validate-details">
                        <div className="Validate-hi">Hi, {data["first_name"]}</div>
                        <form className="Validate-details-form" onSubmit={this.submit}>
                            <div>
                                <label className="name">First Name: </label>
                                <input id="name" defaultValue={data["first_name"]} disabled />
                            </div>
                            <div>
                                <label className="name">Last Name: </label>
                                <input id="name" defaultValue={data["last_name"]} disabled />
                            </div>
                            <div>
                                <label className="name">Date Of Birth: </label>
                                <input id="name" defaultValue={data["date_of_birth"]} disabled />
                            </div>
                            <div>
                                <label className="name">Phone Number: </label>
                                <input id="name" defaultValue={data["phone_number"]} disabled />
                            </div>

                            <button>OK</button>
                        </form>
                    </div>
                )
            } else {
                return <div></div>
            }
        }
    }

    render(){
        return(
            <div className="d-flex">
                <div className="Validate">
                    < UserBvn validate={this.validate} isLoading={this.state.isLoading} isLoaded={this.state.isLoaded}/>
                    {this.renderDetails()}
                </div>
            </div>
            
        )
    }
}

export default UserValidate;