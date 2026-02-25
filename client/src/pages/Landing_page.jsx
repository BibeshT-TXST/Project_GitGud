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
import InventoryPage from './Inventory_page.jsx';
import AccountsPage from './Accounts.jsx';
import DashboardPage from './Dashboard.jsx';
import myLogo from '../assets/logo.png';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';


const NAVIGATION = [
    {
        kind: 'header',
        title: 'Menu',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon sx={{ color: '#363524' }} />,
    },
    {
        segment: 'inventory',
        title: 'Inventory',
        icon: <InventoryIcon sx={{ color: '#363524' }} />,
    },
    {
        segment: 'account',
        title: 'My Account',
        icon: <AccountCircleIcon sx={{ color: '#363524' }} />,
    },
];

const demoTheme = createTheme({
    palette: {
        primary: { main: '#363524' },
        background: { default: '#F5F1EE' },
        text: { primary: '#363524' },
    },
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#363534',
                    color: '#F5F1EE',
                    '& .MuiIconButton-root': { color: '#F5F1EE' },
                    '& .MuiSvgIcon-root': { color: '#F5F1EE' },
                },
            },
        },
    },
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
    // Render InventoryPage when the inventory route is active
    if (pathname.includes('/inventory')) {
        return <InventoryPage />;
    }

    if (pathname.includes('/account')){
        return <AccountsPage />
    }

    if (pathname.includes('/dashboard')){
        return <DashboardPage />
    }

    // Default content: show Dashboard for bare /landing or unknown routes
    return <DashboardPage />;
}

LandingPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function LandingPageInner(props) {
    const navigate = useNavigate();
    const location = useLocation();

    // Adapter for react-router-dom with base path handling
    const router = React.useMemo(() => {
        return {
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: (path) => {
                // Prepending path that doesn't start with /landing
                const fullPath = path.startsWith('/landing') ? path : `/landing${path}`;
                navigate(fullPath);
            },
        };
    }, [location, navigate]);

    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src={myLogo} alt="Book Inventory logo" />,
                title: '',
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
