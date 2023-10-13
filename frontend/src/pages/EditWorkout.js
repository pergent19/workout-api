import { useState, useEffect } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from "react-router-dom"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext" //1
import Modal from "../components/Modal"

const EditWorkout = () => {
    const { dispatch } = useWorkoutsContext() //2
    const {user} = useAuthContext()
    const [updatedWorkout, setUpdatedWorkout] = useState([])
    let { id } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState('')
    const [icon, setIcon] = useState('');

    useEffect(() => {
      const fetchWorkouts = async () => {
        
        const response = await fetch(`/api/workouts/${id}`, {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
        const json = await response.json()
        //console.log(json)
        if (response.ok) {
            setUpdatedWorkout(json);
        }
      }
  
      if (user) {
        fetchWorkouts()
      }
      
    }, [id, user])

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      
      if(icon === 'success-icon') {
        window.location.href = `/`;
        setIsModalOpen(false);
      } else {
        setIsModalOpen(false);
      }
      
    };


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
            headers: { 'Authorization': `Bearer ${user.token}`, 'Content-Type': 'application/json', },
            body:  JSON.stringify(updatedWorkout)
          };

        const response = await fetch(`/api/workouts/${id}`, requestOptions);
        const data = await response.json();


        if(response.ok) {
          setIcon('success-icon')
          setContent(`Success! Your action was completed for ${data.title}`)
          openModal();
          dispatch({type: 'UPDATE_WORKOUT', payload: data}) //3
        } else {
          console.log(data)
          setIcon('unsuccess-icon')
          setContent(`${data.error} - ${data.emptyFields} is empty `)
          openModal()
        }
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
    <button className="button-update">
        Edit
    </button>

    <Modal isOpen={isModalOpen} closeModal={closeModal} content={content} icon={icon} />
    </form>
  )
}

export default EditWorkout