import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../../../firebase/firebase.config'; 
import { Helmet } from "react-helmet-async";
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth(app);

const onSubmit = (data) => {
  const { email, password } = data;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log('Logged in user:', user);
      toast.success('Login successful');

      // Make a POST request to your backend to add the user
      try {
        const response = await axios.post('https://online-forum-server-coral.vercel.app/user', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        });
        console.log('User added to backend successfully', response.data);
      } catch (error) {
        console.error('Error adding user to backend:', error);
        toast.error('Failed to add user to backend. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    });
};


  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        toast.success("Login with Google successful!");
      })
      .catch(error => {
        console.error('Error logging in with Google:', error.message);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleGithubSignIn = () => {
    const githubProvider = new GithubAuthProvider();
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        toast.success("Login with GitHub successful!");
      })
      .catch(error => {
        console.error('Error logging in with GitHub:', error.message);
        toast.error("An error occurred. Please try again.");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="dark:bg-[#120505] dark:text-white min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Nexora | Join US</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-2"><h2 className="text-3xl text-center mt-6 mb-4 text-[#9ACD32]">Join With Us</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: "Email is required" })}
                className="input input-bordered"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register('password', { required: "Password is required" })}
                  className="input input-bordered w-80"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-xl absolute right-4 top-3 dark:text-white text-[#9ACD32]"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-4">
              <button className="btn bg-[#9ACD32] text-white" type="submit">Login</button>
            </div>
            <div className="flex justify-center mt-4 gap-16">
              <button type="button" onClick={handleGoogleSignIn} className="text-4xl text-[#9ACD32] mx-2"><FaGoogle /></button>
              <button type="button" onClick={handleGithubSignIn} className="text-4xl text-[#9ACD32] mx-2"><FaGithub /></button>
            </div>
            <ToastContainer />
          </form>
          <p className="text-center mb-6 dark:text-black">
            Do not have an account?{" "}
            <Link to="/register">
              <span className="text-red-700">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
