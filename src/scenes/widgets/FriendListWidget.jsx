import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends, setOtherUserFriends } from 'state';

const FriendListWidget = ({ userId, isProfile }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isSelf = _id === userId;
    const { friends } = useSelector((state) => (isProfile && !isSelf ? state.otherUser : state.user));
    console.log('isSelf', isSelf);
    console.log('userId', userId);
    console.log('friends');
    console.log(friends);

    const host = {
        url: process.env.REACT_APP_HOST_URL,
        port: process.env.REACT_APP_HOST_PORT,
    };

    const getFriends = async () => {
        const response = await fetch(`http://${host.url}:${host.port}/users/${userId}/friends`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log('datafwl');
        console.log(data);
        if (isProfile && !isSelf) {
            dispatch(setOtherUserFriends({ friends: data }));
        } else {
            dispatch(setFriends({ friends: data }));
        }
    };

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: '1.5rem' }}>
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occumation}
                        userPicturePath={friend.picturePath}
                        userIdProfile={userId}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
