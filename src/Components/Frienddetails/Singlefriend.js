import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Singlefriend = () => {
    const singleFriend = {
        backgroundColor: "goldenrod",
        border: "3px solid red",
        borderRadius: "10px",
        padding: "10px",
        marginTop: "10px"
    }
    const history = useHistory();
    const { slug } = useParams();
    const handleFriend = () => {
        history.push("/friends")
    }
    const url = `/friends`;
    const [friend, setFriend] = useState([]);
    useEffect(() => {
        const url = `https://jsonplaceholder.typicode.com/users/${slug}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setFriend(data))
    }, [slug])
    return (
        <div style={singleFriend}>
            <h2>I am : {friend.name}</h2>
            <h4>Email : {friend.email}</h4>
            <h4>Phone : {friend.phone}</h4>
            <h4>Company : {friend.company?.name}</h4>
            <h4>Website : {friend.website}</h4>
            <Link to={url}>Visit</Link>
            <button onClick={handleFriend}>See All Friend</button>
        </div>
    );
};

export default Singlefriend;