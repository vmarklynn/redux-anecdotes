import { createNotification } from "../reducers/notificationReducer"
import { useDispatch, useSelector } from "react-redux"

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)

  dispatch(createNotification('TEST THIS IS AN ALERT'))


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
