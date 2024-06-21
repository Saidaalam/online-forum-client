import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiDelete } from "react-icons/ti";
import Swal from 'sweetalert2';
import { MdOutlineInsertComment } from 'react-icons/md';
import { Helmet } from 'react-helmet-async';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://online-forum-server-coral.vercel.app/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                const postsWithIndex = data.map((post, index) => ({ ...post, index: index + 1 }));
                setPosts(postsWithIndex);
            } catch (error) {
                console.error('Error fetching posts:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch posts',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(`https://online-forum-server-coral.vercel.app/posts/${postId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            setPosts(posts.filter(post => post._id !== postId));
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Post deleted successfully',
            });
        } catch (error) {
            console.error('Error deleting post:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete post',
            });
        }
    };

    if (loading) {
        return <div className="container mx-auto px-4 text-center mt-8">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <Helmet>
                <title>Nexora | My Posts</title>
            </Helmet>
            <h1 className="text-4xl text-center font-bold mt-10">My Posts</h1>
            <table className="w-full mt-6 border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Index</th>
                        <th className="border border-gray-200 px-4 py-2">Post Title</th>
                        <th className="border border-gray-200 px-4 py-2">Votes</th>
                        <th className="border border-gray-200 px-4 py-2">Comments</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post._id} className="border border-gray-200">
                            <td className="border border-gray-200 px-4 py-2 text-center">{post.index}</td>
                            <td className="border border-gray-200 px-4 py-2">{post.postTitle}</td>
                            <td className="border border-gray-200 px-4 py-2 text-center">{post.upVotes - post.downVotes}</td>
                            <td className="border border-gray-200 px-4 py-2 text-center">
                            <Link  key={post._id} to={`/PostComment/${post._id}`} className="text-blue-500">
                                    <MdOutlineInsertComment size={28} style={{ display: 'block', margin: 'auto' }} />
                                </Link>
                            </td>
                            <td className="border border-gray-200 px-4 py-2 text-center">
                                <button
                                    className="text-4xl text-red-600 px-4 py-1 rounded"
                                    onClick={() => handleDeletePost(post._id)}
                                >
                                    <TiDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyPosts;
