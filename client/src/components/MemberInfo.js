import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class MemberInfo extends Component {
    constructor() {
        super();

        this.state = {
            memberInfo: {},
            memberId: null,
            loading: true,
            error: {error: false, message: ''},
        };
    };

    async componentDidMount() {
        try {
            // const { data } = await axios.get('/api/memberInfos/:memberInfoId');
            const { userId } = this.props.match.params;
            
            this.props.history.listen((location,action) => {
                this.props.handleClick(document.location.pathname);
            });
            
            const member = await fetch(`/api/users/${userId}`, { method: 'GET' });
            const memberData = await member.json();

            this.setState({
                memberInfo: memberData.user,
                memberId: memberData.id,
                loading: false,
                error: {error:false, message: ''}
            });
            
        } catch (err) {
            console.error('ERROR: ', err);
     
            this.setState({
                loading: false,
                error: {error: true, message: 'USER DOESN\'T EXIST'}
            })
        }
    }

    render() {
        const { memberInfo, memberId, loading, error } = this.state;
        if(error.error) {
            return <Redirect to="/login"/>
        }

        if (loading) {
            return <div>Loading...</div>
        }

        else if (memberInfo.id === memberId) {
            return (
                <div className="individual-page">
                    <li key={memberInfo.id}>
                        <div>
                            <img src={memberInfo.imageUrl} alt='userImage' />
                            <p>Name: {memberInfo.firstName} {memberInfo.lastName}</p>
                            <p>Address: {memberInfo.addresses[0].line1}, {memberInfo.addresses[0].line2} </p>
                            <p>City: {memberInfo.addresses[0].city} </p>
                            <p>State: {memberInfo.addresses[0].state} </p>
                            <p>Zipcode: {memberInfo.addresses[0].zip} </p>
                            <p>Email: {memberInfo.email}</p>
                            <p>Role: {memberInfo.role}</p>
                        </div>
                    </li>
                </div>
            );
        }
        else {
            return <Redirect to="/superpowers"/>
        }
    };
};