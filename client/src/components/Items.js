import React, { Component } from "react";

export default class Items extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            loading: true,
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch("/api/items", { method: "GET" });
            const itemsData = await response.json();
            console.log(response);
            this.setState({
                items: itemsData,
                loading: false,
            });
        } catch (err) {
            console.error("ERROR: ", err);
        }
    }

    render() {
        const { items, loading } = this.state;
        if (items.length === 0) {
            return <div>No item found!</div>;
        }
        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <div>
                    {items.map(item => {
                        return (
                            <div key={item.id}>
                                <div>{item.superhero}'s {item.name}</div>
                                <img src={item.imageUrl} alt={item.name} />
                                <div>{item.description}</div>
                                <div>{item.price}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    };
};

