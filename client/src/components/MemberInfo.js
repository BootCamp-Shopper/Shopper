import React, { Component } from 'react';
// import axios from 'axios';

export default class MemberInfo extends Component {
    constructor() {
        super();
        this.state = {
            memberInfo: {},
            loading: true,
        };
    };

    async componentDidMount() {
        try {
            // const { data } = await axios.get('/api/users/:userId');
            const { userId } = this.props.match.params;
            const member = await fetch(`/api/users/${userId}`, { method: 'GET' });
            const memberData = await member.json();
            console.log(memberData);
            this.setState({
                memberInfo: memberData,
                loading: false,
            });
        } catch (err) {
            console.error('ERROR: ', err);
        }
    }

    render() {
        const { memberInfo, loading } = this.state;
        if (loading) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <li key={memberInfo.id}>
                    <div>
                        <img src={memberInfo.imageUrl} alt='userImage' />
                        <p>Name: {memberInfo.firstName} {memberInfo.lastName}</p>
                        <p>Address: {memberInfo.addresses[0].state}</p>
                        <p>Email: {memberInfo.email}</p>
                        <p>Role: {memberInfo.role}</p>
                    </div>
                </li>
            </div>
        );
    };
};