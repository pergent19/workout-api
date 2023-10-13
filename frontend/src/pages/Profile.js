import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from "react-router-dom"
// import { useWorkoutsContext } from "../hooks/useAuthContext"
import Modal from "../components/Modal"

const Profile = () =>  {
  const {user ,dispatch} = useAuthContext()
  let { id } = useParams()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false); 

  useEffect(() => {

    const fectchUser = async () => {
      const response = await fetch(`/api/user/${id}`, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      // console.log(json)
      //console.log(json)
      if (response.ok) {
          setUsername(json.username);
          setEmail(json.email);
          setPassword(json.password);
      }
    }
   

    if (user) {
      fectchUser()
    }
    
  }, [id, user])

  const handleUsernameChange = (e) => {
    const { name, value } = e.target;
    setUsername(value);
    //setUsername({...username, [name]: value});
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    // setEmail({...email, [name]: value});
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEditButton = async (e) => {  
    e.preventDefault()

    const updatedData = {
        email: email,
        username: username,
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json', },
        body:  JSON.stringify(updatedData)
      };

    const response = await fetch(`/api/user/${id}`, requestOptions);
    const data = await response.json();
    console.log(data);
    if(response.ok) {
 
        const storedValue = localStorage.getItem('user');
        let parsedValue;

        if (storedValue) {
          parsedValue = JSON.parse(storedValue);
          parsedValue.email = data.email 
        }

        localStorage.setItem('user', JSON.stringify(parsedValue))

      dispatch({type: 'UPDATE_USER', payload: parsedValue}) 
        
     }

    // if(response.ok) {
    //   setIcon('success-icon')
    //   setContent(`Success! Your action was completed for ${data.title}`)
    //   openModal();
    //   dispatch({type: 'UPDATE_WORKOUT', payload: data}) //3
    // } else {
    //   console.log(data)
    //   setIcon('unsuccess-icon')
    //   setContent(`${data.error} - ${data.emptyFields} is empty `)
    //   openModal()
    // }
}

  return (
        <div className="card-container">
            <div className="card">
                <h2>Profile Page</h2>
                <form onSubmit={handleEditButton}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                    disabled={!isEditing}
                    name="username"
                    type="text"
                    id="username"
                    value={username || ''}
                    onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                    disabled={!isEditing}
                    name="email"
                    type="email"
                    id="email"
                    value={email || ''}
                    onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                    disabled
                    type="password"
                    id="password"
                    value={password || ''}
                    onChange={handlePasswordChange}
                    />
                </div>
                {isEditing ? <button className="button-update" disabled={!isEditing}>Update</button> : ''}

                </form>
                
                {!isEditing ? <button className="button-update button-update-color" onClick={() => setIsEditing(true)}>Edit</button> : ''}
                
            </div>
        </div>
  );
}

export default Profile;