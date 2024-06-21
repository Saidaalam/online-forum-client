import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiFillDollarCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdAnnouncement, MdLocalPostOffice, MdPostAdd } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [postCount, setPostCount] = useState(0);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResponse, announcementResponse, userResponse] = await Promise.all([
          fetch('https://online-forum-server-coral.vercel.app/posts/count'),
          fetch('https://online-forum-server-coral.vercel.app/announcements/count'),
          fetch('https://online-forum-server-coral.vercel.app/user', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
          })
        ]);

        const postData = await postResponse.json();
        const announcementData = await announcementResponse.json();
        const userData = await userResponse.json();

        setPostCount(postData.count);
        setAnnouncementCount(announcementData.count);

        if (Array.isArray(userData)) {
          setUsers(userData);
          const isAdminUser = userData.some(user => user.email === 'admin999@gmail.com');
          setIsAdmin(isAdminUser);
        } else {
          console.error('User data is not an array:', userData);
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        window.location.href = '/'; 
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <Helmet>
        <title>Nexora | Dashboard</title>
      </Helmet>
      <div className="w-72 min-h-screen bg-[#9ACD32]">
        <ul className="menu p-4 text-lg">
          {isAdmin ? ( 
            <>
              <li>
                <NavLink to="/adminProfile">
                  <FaHome />
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/manageUser">
                  <MdPostAdd />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/comments">
                  <FaUsers />
                  Reported Comments
                </NavLink>
              </li>
              <li>
                <NavLink to="/announcement">
                  <IoIosPeople />
                  Make Announcement
                </NavLink>
              </li>
            </>
          ) : ( 
            <>
              <li>
                <NavLink to="/singleUser">
                  <CgProfile />
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/addPost">
                  <MdPostAdd />
                  Add Post
                </NavLink>
              </li>
              <li>
                <NavLink to="/myPost">
                  <MdLocalPostOffice />
                  My Posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/membership">
                  <AiFillDollarCircle />
                  Payment
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/membership">
              <IoIosPeople />
              Membership
            </NavLink>
          </li>
          <li>
            <NavLink to="/announcement">
              <MdAnnouncement />
              Announcement
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Total Posts: {postCount}</h2>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Total Announcements: {announcementCount}</h2>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 mt-10">Users</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Index</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Badge</th>
                <th className="py-2 px-4 border-b">My Profile</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.badges}</td>
                  <td className="py-2 px-4 border-b">
                    <Link to={`/user/${user._id}`}>
                      <button className="btn bg-blue-500 text-white text-3xl">
                        <CgProfile />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
