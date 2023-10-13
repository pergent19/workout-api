import { useEffect, useState }from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails2 from '../components/WorkoutDetails2'
import WorkoutForm from '../components/WorkoutForm'
import AddForm from '../components/AddForm'

const Home = () => {
  const {user} = useAuthContext()
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        setWorkouts(json)
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [user])

  const addHandler = (workout) => {
    console.log(workout)
    setWorkouts((prevState) => {
      return [workout, ...prevState]
    });
  };

  const deleteHandler = (workoutId) => {
    setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
  }

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails2 key={workout._id} workout={workout} onDeleteHandler={deleteHandler}/>
        ))}
      </div>
      <AddForm onAddHandler={addHandler}/>
    </div>
  )
}

export default Home