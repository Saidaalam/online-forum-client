import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await fetch("https://online-forum-server-coral.vercel.app/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUsers(userData);
        } else {
          console.error("Failed to fetch users:", userResponse.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  
  const handleMakeAdmin = async (user) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${user._id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          text: "Admin Added Successfully.",
          showConfirmButton: false,
          timer: 1500
        });
        setUsers(prevUsers =>
          prevUsers.map(u => u._id === user._id ? { ...u, role: 'admin' } : u)
        );
      }
    } catch (error) {
      console.error('Error making user admin:', error);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-4xl text-center font-bold mb-8 mt-10">Manage Users</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Index</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Action</th>
            <th className="py-2 px-4 border-b">Subscription</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="text-center">
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                    {user.role === 'admin' ? 'Admin' : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn bg-blue-500"
                      >
                        <FaUsers className="text-white text-2xl" />
                      </button>
                    )}
                  </td>
                <td className="py-2 px-4 border-b">{user.badges}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;
