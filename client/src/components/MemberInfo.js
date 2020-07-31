import React, { Component } from 'react';
import axios from 'axios';

export default class MemberInfo extends Component {
    constructor() {
        super();
        this.state = {
            memberInfo: [],
            loading: true,
        };
    };

    async componentDidMount() {
        try {
            const { data } = await axios.get('/api/users/:userId');
            this.setState({
                memberInfo: data,
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
        if (!memberInfo.length) {
            return <div>Member does not exist.</div>
        }

        return (
            <div>
                {memberInfo.map(member => (
                    <li key={member.id}>
                        <div>
                            <img src={member.imageUrl} alt='userImage' />
                            <p>Name: {member.firstName} {member.lastName}</p>
                            <p>Address: {member.address}</p>
                            <p>Email: {member.email}</p>
                            <p>Role: {member.role}</p>
                        </div>
                    </li>
                ))}
            </div>
        );
    };
};