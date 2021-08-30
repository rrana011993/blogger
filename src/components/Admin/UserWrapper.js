const UserWrapper = (props) => {

    const deleteUserHandler = (event) => {
        event.preventDefault()
        props.onDeleteUser(props.user.username)
      }

    return (
        <li
            className="list-group-item"> 
            <h2>{"Name: "+props.user.username}</h2>
            <button onClick = {deleteUserHandler}>Delete User</button>
            <hr></hr>
            <br></br>
            </li>
    )
}

export default UserWrapper