import { useState } from 'react';
import axios from 'axios';
import banner from '../../Images/banner.jpg';

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://online-forum-server-coral.vercel.app/api/search?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="hero" style={{ backgroundImage: `url(${banner})`, height: '500px' }}>
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="">
          <h1 className="mb-5 text-5xl font-bold">WELCOME TO NEXORA FORUM</h1>
          <p className="mb-5 text-2xl">How Can We Help?</p>
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tag..."
              className="input input-bordered flex-1 max-w-xs mr-2"
            />
            <button
              onClick={handleSearch}
              className="btn bg-[#9ACD32] border-none text-lg text-white"
            >
              Search
            </button>
          </div>
        </div>
        {searchResults.length > 0 && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-3 gap-4">
              {searchResults.map((post) => (
                <div key={post._id} className="card bg-base-200">
                  <div className="card-body">
                    <h2 className="card-title text-sm text-gray-500 mb-2">Post Title: {post.postTitle}</h2>
                    <p className="text-sm text-gray-500 mb-2">Tags: {post.tags.join(', ')}</p>
                    <p className="text-sm text-gray-500 mb-2">Time: {new Date(post.time).toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mb-2">Comments: {post.commentsCount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
