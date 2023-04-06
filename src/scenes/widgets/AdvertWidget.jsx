import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
    const { palette } = useTheme();

    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const host = {
        url: process.env.REACT_APP_HOST_URL,
        port: process.env.REACT_APP_HOST_PORT,
    };

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src={`http://${host.url}:${host.port}/assets/info4.jpeg`}
                style={{ broderRadius: '0.75rem', margin: '0.75rem 0' }}
            />
            <FlexBetween>
                <Typography color={main}>Nya Nyo Scank</Typography>
                <Typography color={medium}>nyanyosnack.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0,5rem 0">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, animi!
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;
