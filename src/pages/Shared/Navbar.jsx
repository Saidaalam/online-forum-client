import { Link } from 'react-router-dom';
import { IoIosNotifications } from "react-icons/io";
import logo from '../../Images/nexora-logo.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../assets/Provider/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [announcementCount, setAnnouncementCount] = useState(0);

  const handleLogOut = () => {
    logOut()
        .then(() => { })
        .catch(error => console.log(error));
}

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://online-forum-server-coral.vercel.app/announcements');
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const announcements = await response.json();
        setAnnouncementCount(announcements.length);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className='navbar bg-base-100 container px-4 mx-auto'>
      <div className='flex-1'>
        <Link to='/' className='flex gap-2 items-center'>
          <img className='w-auto h-12' src={logo} alt='' />
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 mx-2 text-[#9ACD32] font-bold text-lg'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/membership'>Membership</Link>
          </li>
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li className="relative">
            <Link to='/announcements'>
              <IoIosNotifications className='text-3xl' />
              {announcementCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {announcementCount}
                </span>
              )}
            </Link>
          </li>
          {
            user ? <>
                <button onClick={handleLogOut}></button>
            </> : <>
                <li><Link to="/login">JOIN US</Link></li>
            </>
        }
        </ul>
        {user && (
          <div className='dropdown dropdown-end z-50'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='w-10 rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li className='ml-3'>
                {user.displayName}
              </li>
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
              <li className='mt-2'>
                <button
                  onClick={logOut}
                  className='bg-gray-200 block text-center bg-[#9ACD32]'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
