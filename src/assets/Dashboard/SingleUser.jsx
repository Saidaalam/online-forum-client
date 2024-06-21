import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SlBadge } from 'react-icons/sl';

const SingleUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://online-forum-server-coral.vercel.app/singleUser")
    .then(response => {
    if (!response.ok) {
    throw new Error('Failed to fetch users data');
    }
    return response.json();
    })
    .then(data => {
    setUsers(data);
    })
    .catch(error => {
    console.error('Error fetching users data:', error);
    });
    }, []);

  return (
    <div>
         <Helmet>
            <title>Nexora | My Profile</title>
           </Helmet>
      {users.map((user, index) => (
        <div key={index}>
          <img className='w-full h-96' src={user.background}/>
          <div className="avatar flex">
            <div className="w-40 h-40 absolute rounded-full ml-28 -mt-32 flex items-center justify-center bg-white shadow-lg">
              <img src={user.image} alt={user.name} className="w-full h-full rounded-full" />
            </div>
            <div className="absolute ml-72 -mt-20">
              <h2 className="text-2xl text-white">{user.name}</h2>
              <p className='text-white'>{user.email}</p>
            </div>
          </div>

          <div className='flex gap-2 items-center text-2xl mt-12 text-center justify-center'>
            <SlBadge className='text-[#C29B0C]' />
            <p>{user.badges}</p>
          </div>

          <div className="card-body">
            {user.recentPosts && (
              <div className="recent-posts">
                <h3 className="text-3xl text-center font-bold mb-8">Recent Posts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.recentPosts.map((post, index) => (
                    <div key={index} className="card bg-white shadow-lg rounded-lg p-6">
                         <div className="mt-4 items-center">
                        <img src={post.tagImage} alt={post.tag} className="mr-2" />
                       <div className='font-semibold text-xl mt-2'>
                       <p className="text-gray-600 mb-2">{post.tag}</p>
                      <p className="text-gray-500 text-sm">{post.date}</p>
                       </div>
                      </div>
                      <h4 className="text-2xl font-bold mb-2 mt-2">{post.title}</h4>
                      <p className="text-gray-700 mb-4">{post.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleUser;
