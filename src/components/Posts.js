import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-12">
        <h1>Header</h1>
       </div>
       
        
        <div className="col-md-2 navbar-default navbar-static-side">
        <h2>Nav</h2>
        <img src=" http://dummyimage.com/verticalbanner" className="img-responsive"/>
        </div>
        <div className="col-md-10">
        {this.props.posts.map((post, i) =>
    
          <div className="well" key={i}>
              <h1 className="plan-name">
                { post.name }
              </h1>
              <div>
                  <div className="col-md-4 ">
                    <h5>Id</h5>
                    <p>{ post.id }</p>
                  </div>
                  <div className="col-md-4">
                    <h5>Name</h5>
                    <p>{  post.name }</p>
                  </div>
                  <div className="col-md-4">
                    <h5>Login User name</h5>
                    <p>{ post.owner.login }</p>
                  </div>
                  
                  <div className="col-md-4">
                    <h5>Full Detail</h5>
                    <p>{ post.full_name }</p>
                  </div>
                  <div className="col-md-6">
                    <h5>Description</h5>
                    <p>{ post.description }</p>
                  </div>
                </div>
                <div className="clearfix"></div>
          </div>
        )}
    </div>
       <div className="col-md-12">
           <h1>Footer
           </h1>
           </div>
      </div>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}