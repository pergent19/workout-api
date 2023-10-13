import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails2 = ({ workout, onDeleteHandler }) => {
//   const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

//   const handleClick = async () => {
//     if (!user) {
//       return
//     }

//     const response = await fetch('/api/workouts/' + workout._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     })
//     const json = await response.json()

//     if (response.ok) {
//       //dispatch({type: 'DELETE_WORKOUT', payload: json})
//     }
//   }

const handleClick = async () => {
    if (!user) {
              return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()
    
    if (response.ok) {
        onDeleteHandler(json._id)
    }

}

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>
      <Link to={`/edit/${workout._id}`}><span className="material-symbols-outlined edit">edit</span></Link>
      <span className="material-symbols-outlined delete" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails2