import React from 'react'

function Update_profile() {
  return (
    <div>
        <div className='row'>
            <div className='col-4'></div>
                <div className='col-4 border-0'>
                    <form >
                        <div className="form-group">
                            <label >Name: </label>
                            <input type="text" className="form-control" placeholder="Enter Name" />

                        </div>
                        <div className="form-group">
                            <label >Email address: </label>
                            <input type="email" className="form-control" placeholder="Enter email" />

                        </div>
                        <div className="form-group">
                            <label >Phone: </label>
                            <input type="Number" className="form-control" placeholder="" />
                        </div>
                        <div className="form-group">
                            <label >Street: </label>
                            <input type="text" className="form-control" placeholder="" />
                        </div>
                        <div className="form-group">
                            <label >City: </label>
                            <input type="text" className="form-control" placeholder="" />
                        </div>
                        <div className="form-group">
                            <label >State: </label>
                            <input type="text" className="form-control" placeholder="" />
                        </div>
                        <div className="form-group">
                            <label >Pincode: </label>
                            <input type="Number" className="form-control" placeholder="" />
                        </div>
                        <button type="submit" className="btn btn-warning">Submit</button>
                    </form>
                </div>
            <div className='col-4'></div>
        </div>
    </div>
  )
}

export default Update_profile