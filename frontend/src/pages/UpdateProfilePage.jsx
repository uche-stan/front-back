import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { Toast } from '../utils/alert';


const UpdateProfilePage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);

//   const {user, loading, setLoading} = useValue()
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
    photo: null,
  });

  const decodedToken = user? jwtDecode(JSON.stringify(user)): null;


  useEffect(() => {
    console.log("decoded user")
    console.log(decodedToken)
    const fetchProfile = async () => {
        if (user && user.token) {
           
            try {
                const {data} = await getProfile(decodedToken);
                setProfile(data);
                setName(data.name || '');
                setEmail(data.email || '');
                setPhone(data.phone || '');
               
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }
        }
    };
    fetchProfile();
}, [user]);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('phone', phone);
  if (photo) {
      formData.append('photo', photo);
  }
  try {
      const {data, status} = await updateProfile(decodedToken, formData);
      if (status === 200){
        setProfile(data);
        setLoading(false);
        Toast.fire({
          icon: 'success',
          title: 'Profile updated successfully',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: false,
      });
      }
     
  } catch (error) {
    setLoading(false);
    Toast.fire({
      icon: 'error',
      title: 'Failed to update profile',
      timer: 4000,
      showConfirmButton: false,
      timerProgressBar: false,
  });
      console.error('Failed to update profile', error);
  }
};




  return (
    <>
        <section className="text-gray-600 body-font relative">

          <form onSubmit={handleSubmit} className=" container px-5 py-24 mx-auto flex justify-center">
            <div className="lg:w-1/3 md:w-1/2 bg-indigo-200 rounded-lg p-8 flex  flex-col w-full mt-10 md:mt-0 relative z-10 shadow-md">
              <h2 className="text-gray-900  text-center text-lg mb-1 font-medium title-font">
                Edit Profile
              </h2>
            
              <div className="relative mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="photo" className="leading-7 text-sm text-gray-600">
                  Profile picture
                </label>
                <input
                 style={{display:"none"}}
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />

            
              </div>


            
              <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                {false? 'Saving...': 'Save'} 
              </button>
            
            </div>
          </form>



          <div className='flex justify-center'>
          <Link to="/" className="text-indigo-500 inline-flex items-center">
                    
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      Back home
          </Link>
          </div>
      
      </section>

      
    </>
  )
}

export default UpdateProfilePage
