import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useNavigate, useLocation } from 'react-router-dom';
import Searchbar from '../components/Searchbar.jsx';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Menu',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'inventory',
        title: 'Inventory',
        icon: <InventoryIcon />,
    },
    {
        segment: 'account',
        title: 'My Account',
        icon: <AccountCircleIcon />,
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

function LandingPageContent({ pathname }) {
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Searchbar />
        </Box>
    );
}

LandingPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function LandingPageInner(props) {
    const navigate = useNavigate();
    const location = useLocation();

    // Adapter for react-router-dom
    const router = React.useMemo(() => {
        return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: (path) => navigate(path),
        };
    }, [location, navigate]);

    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                title: 'Book Inventory Application',
            }}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout>
                <LandingPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}

export default function LandingPage() {
    return (
    <LandingPageInner />
    );
}
