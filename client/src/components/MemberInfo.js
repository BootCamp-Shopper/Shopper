import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Items from './Items';

export default class MemberInfo extends Component {
    constructor() {
        super();
        this.state = {
            memberInfo: {},
            memberId: null,
            loading: true,
        };
    };

    async componentDidMount() {
        try {
            // const { data } = await axios.get('/api/memberInfos/:memberInfoId');
            const { userId } = this.props.match.params;
            const member = await fetch(`/api/users/${userId}`, { method: 'GET' });
            const memberData = await member.json();

            // console.log(memberData);

            this.setState({
                memberInfo: memberData.user,
                memberId: memberData.id,
                loading: false,
            });
        } catch (err) {
            console.error('ERROR: ', err);
        }
    }

    render() {
        const { memberInfo, memberId, loading } = this.state;
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
            // return <Redirect to={`/users/${memberId}`} component={MemberInfo} />
            return <Redirect to='/superpowers' component={Items} />
        }
    };
};