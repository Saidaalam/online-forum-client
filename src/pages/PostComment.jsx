import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PostComment = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [selectedComment, setSelectedComment] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://online-forum-server-coral.vercel.app/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();
                setComments(data.comments); // Assuming data.comments contains the comments array
            } catch (error) {
                console.error('Error fetching comments:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch comments',
                });
            }
        };

        fetchComments();
    }, [id]);

    const handleFeedbackChange = (commentId, feedback) => {
        const updatedComments = comments.map(comment =>
            comment._id === commentId ? { ...comment, feedback, reportButtonDisabled: !feedback } : comment
        );
        setComments(updatedComments);
    };

    const handleReportComment = async (commentId) => {
        const comment = comments.find(comment => comment._id === commentId);
        try {
            console.log(`Reported comment ${commentId} with reason: ${comment.feedback}`);
            const updatedComments = comments.map(comment =>
                comment._id === commentId ? { ...comment, reportButtonDisabled: true } : comment
            );
            setComments(updatedComments);

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Comment reported successfully',
            });
        } catch (error) {
            console.error('Error reporting comment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to report comment',
            });
        }
    };

    const openModal = (comment) => {
        setSelectedComment(comment);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedComment(null);
        setModalOpen(false);
    };

    return (
        <div className="container mx-auto px-4">
            <Helmet>
        <title>Nexora | Post Comment</title>
      </Helmet>
            <h1 className="text-4xl text-center font-bold mt-10">Post Comments</h1>
            
            <table className="w-full mt-6 border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Email</th>
                        <th className="border border-gray-200 px-4 py-2">Comment</th>
                        <th className="border border-gray-200 px-4 py-2">Feedback</th>
                        <th className="border border-gray-200 px-4 py-2">Report</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(comments) && comments.map(comment => (
                        <tr key={comment._id} className="border border-gray-200 text-center">
                            <td className="border border-gray-200 px-4 py-2">{comment.email}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                {comment.comment.length > 20 ? (
                                    <>
                                        {`${comment.comment.substring(0, 20)}... `}
                                        <button className="text-blue-500 underline" onClick={() => openModal(comment)}>Read More</button>
                                    </>
                                ) : (
                                    comment.comment
                                )}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                                <select
                                    value={comment.feedback || ""}
                                    onChange={(e) => handleFeedbackChange(comment._id, e.target.value)}
                                >
                                    <option value="">Select feedback</option>
                                    <option value="Inappropriate">Inappropriate</option>
                                    <option value="Spam">Spam</option>
                                    <option value="Offensive">Offensive</option>
                                </select>
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                                    onClick={() => handleReportComment(comment._id)}
                                    disabled={comment.reportButtonDisabled}
                                >
                                    Report
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal open={modalOpen} onClose={closeModal} center>
                <h2 className="text-xl font-bold mb-4">Full Comment</h2>
                <p>{selectedComment && selectedComment.comment}</p>
            </Modal>
        </div>
    );
};

export default PostComment;
