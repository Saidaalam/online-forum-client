import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../../../firebase/firebase.config';
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth(app);

  const onSubmit = (data) => {
    const { name, photo, email, password } = data;

    // Validate password
    if (password.length < 6) {
      toast.error('Password should be at least 6 characters or more');
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error('Password should have at least one uppercase letter');
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error('Password should have at least one lowercase letter');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: photo
        }).then(() => {
          toast.success('Registration successful!');
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error('Registration failed. Please try again.');
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
        <title>Nexora | Register</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-2">
            <h2 className="text-3xl text-center mt-6 mb-4 text-[#9ACD32]">Register Your Account</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Your Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Your Name"
                {...register('name', { required: "Name is required" })}
                className="input input-bordered"
              />
              {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                {...register('photo', { required: "Photo URL is required" })}
                className="input input-bordered"
              />
              {errors.photo && <p className="text-red-600">{errors.photo.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
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
                <span className="label-text font-bold">Password</span>
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
                  className="text-xl absolute right-4 top-3 dark:text-black text-[#9ACD32]"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover mt-2 dark:text-black">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-4">
              <button type="submit" className="btn bg-[#9ACD32] text-white">Register</button>
            </div>
            <div className="flex justify-center mt-4 gap-16">
              <button type="button" onClick={handleGoogleSignIn} className="text-4xl text-[#9ACD32] mx-2"><FaGoogle /></button>
              <button type="button" onClick={handleGithubSignIn} className="text-4xl text-[#9ACD32] mx-2"><FaGithub /></button>
            </div>
            <ToastContainer />
          </form>
          <p className="text-center dark:text-black mb-6">Already have an account? <Link to="/login"><span className="text-red-700">Join US</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
