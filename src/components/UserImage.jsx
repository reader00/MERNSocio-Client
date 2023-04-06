import { Box } from '@mui/material';

const UserImage = ({ image, size = '60px' }) => {
    const host = {
        url: process.env.REACT_APP_HOST_URL,
        port: process.env.REACT_APP_HOST_PORT,
    };

    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: 'cover', borderRadius: '50%' }}
                width={size}
                height={size}
                alt="user"
                src={`http://${host.url}:${host.port}/assets/${image}`}
            />
        </Box>
    );
};

export default UserImage;
