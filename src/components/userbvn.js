import React, { Component } from 'react'
import "./User.css";

class UserBvn extends Component {
    constructor(props){
        super(props);
        this.state = { bvn: ""}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e){
        e.preventDefault()
        if(isNaN(this.state.bvn)){
            alert("Please check the BVN and try again")
            this.setState({ bvn: ""})
        } else {
            this.props.validate(this.state.bvn)
            this.setState({ bvn: ""})
        }
        
    }

    render(){
        const {bvn} = this.state
        return(
            <form className="FormVal" onSubmit={this.handleSubmit}>
                <label className="bvn">Customer BVN Validation </label>
                <input
                    type="text"
                    id="bvn"
                    name="bvn"
                    placeholder="Please Enter BVN"
                    value={bvn} 
                    onChange={this.handleChange}
                    required
                    disabled={(this.props.isLoaded) ? true: false}
                    />
                    {(this.props.isLoaded) ? "" : <button disabled={(this.props.isLoading) ? true : false}>{(this.props.isLoading) ? "Validating..." : "Validate"}</button>}
            </form>
        )
    }
}

export default UserBvn;