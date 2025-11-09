import React, { useContext } from 'react';
import AuthContext from './src/Auth/AuthContext';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router';

const UpdateProfile = () => {

 const { user, updateUser ,setLoading} = useContext(AuthContext);
 const navigate=useNavigate()


// Update my Profile page is here 
const handleUpdateProfile=(e)=>{
    e.preventDefault()
    const name=e.target.name.value;
    const photo=e.target.photo.value;
    const finalPhoto=photo|| user?.photoURL
    updateUser({
        displayName:name,
        photoURL:finalPhoto,
    }).then(res=>{

         Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Logout successful",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      navigate("/")
    }).catch(error=>{}).finally(()=>setLoading(false))
  

  
    
}




    return (
      <div>
        <div className="flex bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500  justify-center items-center min-h-screen bg-base-200">
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-center mb-4">
                My Profile
              </h2>

              <div className="flex justify-center mb-4">
                <img
                  src={
                    user
                      ? user?.photoURL
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="w-30 h-30 rounded-full border-2 border-gray-300"
                />
              </div>

              <form onSubmit={handleUpdateProfile}>
                <div className="form-control mb-3">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    name="name"
                    defaultValue={user?.displayName}
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control mb-3">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    name="photo"
                    type="text"
                    placeholder="Enter photo URL"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control mb-3">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    defaultValue={user?.email}
                    type="email"
                    placeholder="Your email"
                    className="input input-bordered w-full bg-gray-100"
                    readOnly
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
};

export default UpdateProfile;