import React, { useState } from 'react';
import Friend from '../Friend/Friend';
import './Friends.css';

const Friends = () => {
    const [users, setUsers] = useState([]);
    useState(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    return (
        <div>
            <h2>Total Users : {users.length}</h2>
            <div className="users-container">
                {
                    users.map(allUsers =>
                        <Friend key={allUsers.id} allUsers={allUsers}></Friend>
                    )
                }
            </div>
        </div>
    );
};

export default Friends;