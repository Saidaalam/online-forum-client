import { useState, useEffect } from 'react';
import axios from 'axios';
import { TiDelete } from 'react-icons/ti';
import { FaBan } from 'react-icons/fa';

const ReportedComments = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://online-forum-server-coral.vercel.app/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleTakeAction = async (postId, action) => {
    try {
      const response = await axios.put(`https://online-forum-server-coral.vercel.app/posts/${postId}`, { action });
      const updatedPost = response.data;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? { ...post, status: updatedPost.status } : post
        )
      );
      console.log(`Action (${action}) taken successfully for post with ID ${postId}`);
    } catch (error) {
      console.error(`Error taking action (${action}) on post with ID ${postId}:`, error);
    }
  };

  return (
    <div>
      <h2 className="text-4xl text-center mb-4">Reported Activities</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Index</th>
            <th className="py-2 px-4 border-b">Reported By</th>
            <th className="py-2 px-4 border-b">Reported Item</th>
            <th className="py-2 px-4 border-b">Feedback</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{post.authorName}</td>
              <td className="py-2 px-4">{post.postTitle}</td>
              <td className="py-2 px-4">{post.feedback}</td>
              <td className="py-2 px-4 flex">
                <button 
                  className="bg-red-500 text-white py-1 px-3 rounded mr-2"
                  onClick={() => handleTakeAction(post._id, 'delete')}
                >
                  <TiDelete className='text-4xl' />
                </button>
                <button 
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                  onClick={() => handleTakeAction(post._id, 'ban')}
                >
                  <FaBan className='text-3xl' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedComments;
