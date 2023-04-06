import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends, setOtherUserFriends } from 'state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const Friend = ({ friendId, name, subtitle, userPicturePath, isProfile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id, friends } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);
    const isSelf = friendId === _id;

    const host = {
        url: process.env.REACT_APP_HOST_URL,
        port: process.env.REACT_APP_HOST_PORT,
    };

    const patchFriend = async () => {
        const response = await fetch(`http://${host.url}:${host.port}/users/${_id}/${friendId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        dispatch(setFriends({ friends: data }));

        if (isProfile) {
            const friend_response = await fetch(`http://${host.url}:${host.port}/users/${friendId}/friends`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const friend_data = await friend_response.json();
            dispatch(setOtherUserFriends({ friends: friend_data }));
        }
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            '&:hover': {
                                color: palette.primary.light,
                                cursor: 'pointer',
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>

            {!isSelf && (
                <IconButton onClick={() => patchFriend()} sx={{ backgroundColor: primaryLight, p: '0.6rem' }}>
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    ) : (
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    )}
                </IconButton>
            )}
        </FlexBetween>
    );
};

export default Friend;
