import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { IoMdShare } from 'react-icons/io';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { LiaComments } from 'react-icons/lia';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://online-forum-server-coral.vercel.app/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpVote = async () => {
    try {
      await axios.put(`https://online-forum-server-coral.vercel.app/posts/${id}/upvote`);
      setPost(prevPost => ({ ...prevPost, upVotes: prevPost.upVotes + 1 }));
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const handleDownVote = async () => {
    try {
      await axios.put(`https://online-forum-server-coral.vercel.app/posts/${id}/downvote`);
      setPost(prevPost => ({ ...prevPost, downVotes: prevPost.downVotes + 1 }));
    } catch (error) {
      console.error('Error downvoting post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://online-forum-server-coral.vercel.app/posts/${id}/comments`, {
        email,
        comment,
      });
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, response.data],
      }));
      setEmail('');
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }
  const { authorPicture, authorName, postTitle, postDescription, tags, time, commentsCount, upVotes, downVotes } = post;

  const shareUrl = `http://localhost:3000/post/${id}`;

  return (
    <div className='dark:bg-[#120505] dark:text-white'>
      <Helmet>
        <title>Nexora | Post Details</title>
      </Helmet>
      <div className='card card-side bg-base-100 shadow-xl mt-4'>
        <figure className='p-4 ml-14 h-screen'>
          <img className='h-full rounded-xl' src={authorPicture} alt={authorName} />
        </figure>
        <div className='card-body text-xl'>
          <h2 className='card-title text-3xl font-bold'>Author Name: {authorName}</h2>
          <p className='mt-4 text-lg'>
            <span className='font-semibold'>Description: </span>
            {postDescription}
          </p>
          <p>
            <span className='font-semibold'>Post Title: </span>
            {postTitle}
          </p>
          <p>
            <span className='font-semibold'>Time: </span>
            {new Date(time).toLocaleString()}
          </p>
          <p>
            <span className='font-semibold'>Tags: </span>
            {tags.join(', ')}
          </p>
          <p>
            <span className='font-semibold'>Votes Count: </span>
            {upVotes - downVotes}
          </p>
          <p className='font-semibold flex gap-2 text-2xl items-center'>
            <LiaComments />
            {commentsCount}
          </p>
          <div className='flex justify-between mt-4'>
            <div className='text-2xl flex gap-6 items-center'>
              <button className='flex items-center gap-2' onClick={handleUpVote}>
                <AiOutlineLike />
                {upVotes}
              </button>
              <button className='flex items-center gap-2' onClick={handleDownVote}>
                <AiOutlineDislike />
                {downVotes}
              </button>
            </div>
            <div className='relative'>
              <button
                className='flex items-center gap-2'
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <IoMdShare className='text-3xl' /> <span>Share</span>
              </button>
              {showShareOptions && (
                <div className='absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded p-2'>
                  <FacebookShareButton url={shareUrl} className='flex items-center gap-2 mb-2'>
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className='w-6 h-6 text-blue-600'
                    />{' '}
                    <span>Facebook</span>
                  </FacebookShareButton>
                  <TwitterShareButton url={shareUrl} className='flex items-center gap-2 mb-2'>
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className='w-6 h-6 text-blue-400'
                    />{' '}
                    <span>Twitter</span>
                  </TwitterShareButton>
                  <WhatsappShareButton url={shareUrl} className='flex items-center gap-2'>
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      className='w-6 h-6 text-green-500'
                    />{' '}
                    <span>WhatsApp</span>
                  </WhatsappShareButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <h2 className='text-2xl font-bold text-center mb-4'>Add a Comment</h2>
          <form onSubmit={handleCommentSubmit} className='flex flex-col items-center'>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Your Comment'
              className='border-gray-300 border-solid border-2 rounded-lg px-4 py-2 mb-4 w-1/2 h-32 resize-none'
              required
            />
            <button
              type='submit'
              className='bg-[#9ACD32] text-white font-bold py-2 px-4 rounded'
            >
              Submit Comment
            </button>
          </form>
      </div>
    </div>
  );
};

export default PostDetails;
