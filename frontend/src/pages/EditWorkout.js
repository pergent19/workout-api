import { useState, useEffect } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from "react-router-dom"

const EditWorkout = () => {
    const {user} = useAuthContext()
    const [updatedWorkout, setUpdatedWorkout] = useState([])
    // const [formData, setFormData] = useState(updatedWorkout)
    // const [editWorkout, setEditWorkout] = useState({
    //     title: updatedWorkout.title,
    //     load: updatedWorkout.load,
    //     reps: updatedWorkout.reps
    //   });

    let { id } = useParams()
  
    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch(`/api/workouts/${id}`, {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()
  
        if (response.ok) {
            setUpdatedWorkout(json);
        }
      }
  
      if (user) {
        fetchWorkouts()
      }
      
    }, [id, user])


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUpdatedWorkout({
            ...updatedWorkout,
            [name]: value,
        });
    };

    const handleEditButton = async (e) => {  
        e.preventDefault()

        const requestOptions = {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${user.token}`, },
            body:  {
              title: "Boss Raul",
              load: 1,
              reps: 1
              }
          };


        const response = await fetch(`/api/workouts/${id}`, requestOptions);
        const data = await response.json();
        console.log(data)

        
            // this.setState({ postId: data.id });

        
        // return
        // try {
            
        //     const response = await fetch(`/api/workouts/${id}`, { 
        //         method: "PUT",
        //         headers: {'Authorization': `Bearer ${user.token}`},
        //         body: JSON.stringify(updateWorkout),
        //     });
            
        //     const data = await response.json();
        //     console.log(data)
        //     // setUpdatedWorkout(updatedWorkout.map((workout) => (workout._id === id ? response.data : workout)));
        //     // setEditTodoId(null);
        // } catch (error) {
        // console.error('Error updating todo:', error);
        // }

    }


  return (
    <form className="login" onSubmit={handleEditButton}>
      <h3>Edit Workout</h3>
      
      <label>Title</label>
      <input 
        type="text" 
        name="title"
        onChange={handleOnChange}
        value={updatedWorkout.title || ''} 
      />
      <label>Load:</label>
      <input 
        type="number" 
        name="load"
        onChange={handleOnChange}
        value={updatedWorkout.load || 0} 
      />
     <label>Reps:</label>
      <input 
        type="number"
        name="reps" 
        onChange={handleOnChange}
        value={updatedWorkout.reps || 0} 
      />
    <button className="todo-button">
        Edit
    </button>

      {/* <button disabled={isLoading}>Log in</button> */}
      {/* {error && <div className="error">{error}</div>} */}
    </form>
  )
}

export default EditWorkout