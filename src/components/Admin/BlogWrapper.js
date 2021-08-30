const BlogWrapper = (props) => {

    const deleteBlogHandler = (event) => {
        event.preventDefault()
        props.onDeleteBlog(props.blog.title)
      }

      const approveBlogHandler = (event) => {
        event.preventDefault()
        props.onApproveBlog(props.blog.title)
      }


    return (
        <li
            className="list-group-item"> 
            <h2>{"Title: "+props.blog.title}</h2>
            <h3>{"Body: "+props.blog.body}</h3>
            <p>{"Approved? " + props.blog.approved}</p>
            <p>{"Author: "+props.blog.author}</p>
            <button onClick = {deleteBlogHandler}>Delete Blog</button>
            {!props.blog.approved && <button onClick = {approveBlogHandler}>Approve Blog</button>}
            <hr></hr>
            <br></br>
            </li>
    )
}

export default BlogWrapper