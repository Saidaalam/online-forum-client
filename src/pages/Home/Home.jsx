import { Helmet} from 'react-helmet-async';
import Banner from "./Banner";
import Tag from "./Tag";
import Announcements from './Announcements';
import Post from './Post';

const Home = () => {
    return (
        <div>
           <Helmet>
            <title>Nexora | Home</title>
           </Helmet>
           <Banner></Banner>
            <Tag></Tag>
            <Announcements></Announcements>
            <Post></Post>
        </div>
    );
};

export default Home;