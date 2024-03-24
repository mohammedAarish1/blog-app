import React from 'react';
import { useFormik } from 'formik';
import { useFirebaseContext } from '../context/FirebaseContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

  const navigate = useNavigate()

  const { loginStatus, setLoginStatus, handleSignup, user, handleLogin, setLogoutBtn, errorMessage, setErrorMessage } = useFirebaseContext()

  const { values, handleChange, handleSubmit, } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cPassword: '',

    },
    onSubmit: () => {
      if (!loginStatus) {
        if (values.password !== values.cPassword) {
          return toast.error("Password don't matched")
        }
        if (values.firstName && values.lastName && values.email && values.password) {
          handleSignup(values.email, values.password, values.firstName, values.lastName)
          toast.success("Congragulations! registered succesfully")

          setLoginStatus(true)
        }
        else {
          return toast.error('All fields are mandatory')
        }
      } else {
        if (values.email && values.password) {


          handleLogin(values.email, values.password).then((user) => {
            if (user)
              navigate('/')



          })



          // navigate('/')
          setLogoutBtn(false)


        } else {
          return toast.error('All fields are mandatory')
        }
      }
    }
  })



  return (
    <div className='grid grid-cols-2'>
      <div className=' flex justify-end '>
        <img src="https://img.freepik.com/free-photo/3d-render-secure-login-password-illustration_107791-16640.jpg?w=740&t=st=1711164554~exp=1711165154~hmac=bf56a729dfab67f878329168bb6c8f897798a190ca35e7cd2e980b882301246e" alt="" className='w-2/3' />
      </div>
      <div className=' flex  flex-col  p-10 '>
        <h1 className=' mb-4 text-2xl text-center'>{loginStatus ? "Log in" : "Sign up"}</h1>
        <div className='border p-4 shadow-lg shadow-slate-700 '>
          <form className='flex gap-3 flex-col' onSubmit={handleSubmit}>
            {!loginStatus && (
              <>
                <div className='flex gap-2 justify-between'>
                  <div className='flex flex-col gap-2 w-1/2'>
                    <label htmlFor="firstname">First Name</label>
                    <input type="firstname" name='firstName' id='firstname' placeholder='Enter Your First Name' className='p-2 rounded-sm shadow-md outline-none  ' value={values.firstName} onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2 w-1/2'>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="lastname" name='lastName' id='lastname' placeholder='Enter Your Last Name' className='p-2 rounded-sm shadow-md outline-none ' value={values.lastName} onChange={handleChange} />
                  </div>
                </div>
              </>
            )}
            <div className='flex flex-col gap-2'>
              <label htmlFor="email">Email</label>
              <input type="email" name='email' placeholder='Enter Your Email' className='p-2 shadow-md  rounded outline-none ' value={values.email} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="email">Password</label>
              <input type="password" name='password' placeholder='Enter Your password' className='p-2 shadow-md outline-none rounded ' value={values.password} onChange={handleChange} />
              {loginStatus && errorMessage ? <p className='text-xs text-red-500 text-center'>{errorMessage}</p> : null}
            </div>
            {!loginStatus && (
              <div className='flex flex-col gap-2'>
                <label htmlFor="email">Confirm Password</label>
                <input type="cPassword" name='cPassword' placeholder='Re-enter Your password' className='p-2 shadow-md outline-none rounded ' value={values.cPassword} onChange={handleChange} />

              </div>
            )}
            <div>
              <button type='submit' className={`${loginStatus ? 'bg-blue-400 text-white hover:bg-blue-500' : 'bg-gradient-to-r from-indigo-800 via-purple-500 to-indigo-800 text-white'} px-3 py-2 rounded w-full block`}>{loginStatus ? "Log in" : "Sign up"}</button>
            </div>
          </form>
        </div>
        <div className='mt-4 text-center'>
          {loginStatus ? <p>Don't have an account ? <span onClick={() => setLoginStatus(!loginStatus)} className='text-purple-800 text-xl cursor-pointer'>Sign up</span></p> : <p>Already have an account ? <span onClick={() => setLoginStatus(!loginStatus)} className=' text-xl text-blue-800 cursor-pointer'>Log in</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Auth;
