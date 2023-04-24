import React from 'react'

function Signup() {
  return (
    <div>
        <div className='row'>
            <div className='col-4'></div>
                <div className='col-4 border-0'>
                    <form >
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" className="form-control" placeholder="Enter Name" />

                        </div>
                        <div className="form-group">
                            <label>Email address: </label>
                            <input type="email" className="form-control" placeholder="Enter email" />

                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password: </label>
                            <input type="password" className="form-control" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-warning">Submit</button>
                    </form>
                </div>
            <div className='col-4'></div>
        </div>
    </div>
  )
}

export default Signup