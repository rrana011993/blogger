const BlogWrapper = (props) => {

    return (
        <li
            className="list-group-item"> 
            <h2>{"Title: "+props.blog.title}</h2>
            <h3>{"Body: "+props.blog.body}</h3>
            <p>{"Approved? " + props.blog.approved}</p>
            <p>{"Author: "+props.blog.author}</p>
            <hr></hr>
            <br></br>
            </li>
    )
}

export default BlogWrapper