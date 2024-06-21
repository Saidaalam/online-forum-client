import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [sortByPopularity, setSortByPopularity] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const postsPerPage = 5;

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://online-forum-server-coral.vercel.app/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                const sortedByDate = data.sort((a, b) => new Date(b.time) - new Date(a.time));
                setAllPosts(sortedByDate);
                setPosts(sortedByDate.slice(0, postsPerPage));
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const sortedPosts = [...allPosts];
        if (sortByPopularity) {
            sortedPosts.sort((a, b) => (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes));
        } else {
            sortedPosts.sort((a, b) => new Date(b.time) - new Date(a.time));
        }

        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        setPosts(sortedPosts.slice(indexOfFirstPost, indexOfLastPost));
    }, [sortByPopularity, currentPage, allPosts]);

    const handleSortByPopularity = () => {
        setSortByPopularity(!sortByPopularity);
        setCurrentPage(1);
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return <div className="container mx-auto px-4 text-center mt-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl text-center font-bold mt-10">Checkout The Posts</h1>
            <div className="flex justify-center mt-6 mb-4">
                <button
                    className="bg-[#9ACD32] text-center mb-4 text-2xl text-white px-4 py-2 rounded"
                    onClick={handleSortByPopularity}
                >
                    {sortByPopularity ? 'Sort by Newest' : 'Sort by Popularity'}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
    <Link key={post._id} to={`/post/${post._id}`}>
        <div className="bg-white rounded shadow p-4 cursor-pointer">
            <div className="flex items-center mb-4">
                <img
                    className="w-24 h-24 rounded-full mr-4"
                    src={post.authorPicture}
                    alt="Author"
                />
                <div>
                    <h2 className="text-2xl font-bold">{post.postTitle}</h2>
                    <p className="text-gray-600 mt-3">{new Date(post.time).toLocaleString()}</p>
                </div>
            </div>
            <div>
                {post.tags && (
                    <p className='mb-2'><strong>Tags:</strong> {post.tags.join(', ')}</p>
                )}
                <p className='mb-2'><strong>Comments Count:</strong> {post.commentsCount}</p>
                <p><strong>Votes Count:</strong> {post.upVotes - post.downVotes}</p>
            </div>
        </div>
    </Link>
))}

            </div>
            <div className="flex justify-center mt-8">
                {[...Array(Math.ceil(allPosts.length / postsPerPage)).keys()].map(number => (
                    <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`px-3 py-1 mx-1 border rounded ${currentPage === number + 1 ? 'bg-[#9ACD32] text-white' : 'bg-white text-black'}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Post;
