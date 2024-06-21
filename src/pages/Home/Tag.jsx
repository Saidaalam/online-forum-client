import { useEffect, useState } from "react";

const Tag = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch("https://online-forum-server-coral.vercel.app/tags")
            .then(response => response.json())
            .then(data => {
                setTags(data);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
            });
    }, []);

    return (
        <div className="mt-10">
            <h2 className="text-4xl font-bold text-center">Choose Your Favorite Tag</h2>
            <p className="text-center mt-6">Discover and explore posts by selecting your favorite tags.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {tags.map((tag, index) => (
                    <div key={index} className="card card-side bg-base-100 shadow-xl">
                        <div className="avatar">
                        <div className="w-24 h-24 rounded-full mt-10 ml-4">
                        <img src={tag.image} alt={tag.tag} />
                       </div>
                       </div>
                        <div className="card-body">
                            <h2 className="card-title">{tag.tag}</h2>
                            <p>Explore posts related to {tag.tag}</p>
                            <p><span className="font-semibold">Topics: </span>{tag.topic}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tag;
