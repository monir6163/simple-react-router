import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Friend = (props) => {
    const { id, name, email, phone, website, address } = props.allUsers;
    const singleFriend = {
        backgroundColor: "goldenrod",
        border: "3px solid red",
        borderRadius: "10px",
        padding: "10px",
    }
    const history = useHistory();
    const url = `/friend/${id}`;
    const handlePage = () => {
        history.push("/home")
    }
    return (
        <div style={singleFriend}>
            <h2>I am : {name}</h2>
            <h4>Email : {email}</h4>
            <h4>Phone : {phone}</h4>
            <h4>Address : {address.city}</h4>
            <h4>Website : {website}</h4>
            <Link to={url}>Visit Me</Link>
            <Link to={url}>
                <button>Visit Me</button>
            </Link>
            <button onClick={handlePage}>Visit Me</button>
        </div>
    );
};

export default Friend;