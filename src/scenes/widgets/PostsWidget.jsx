import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import PostWidget from './PostWidget';

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    console.log('Posts Pertama Kali');
    console.log(posts);
    const token = useSelector((state) => state.token);

    const host = {
        url: process.env.REACT_APP_HOST_URL,
        port: process.env.REACT_APP_HOST_PORT,
    };

    const getPosts = async () => {
        const response = await fetch(`http://${host.url}:${host.port}/posts`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    console.log('POSTS UserId', userId);
    const getUserPosts = async () => {
        const response = await fetch(`http://${host.url}:${host.port}/posts/${userId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                        isProfile={isProfile}
                    ></PostWidget>
                )
            )}
        </>
    );
};

export default PostsWidget;
