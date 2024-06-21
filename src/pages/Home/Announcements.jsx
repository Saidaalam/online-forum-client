import { useLoaderData } from "react-router-dom";

const Announcements = () => {
  const announcements = useLoaderData();

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center mt-10">Latest Announcements</h2>
      <p className="text-center mt-4">Stay updated with our latest news, feature releases, events, and important updates.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="p-6 border rounded shadow-lg">
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full mr-3" src={announcement.authorImage} alt={announcement.authorName} />
              <p className="text-gray-600">{announcement.authorName}</p>
            </div>
            <h3 className="text-2xl font-bold mb-2 mt-4">{announcement.title}</h3>
            <p className="text-gray-700 mb-4">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
