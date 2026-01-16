import * as React from 'react';
import PropTypes from 'prop-types';
import Box, { boxClasses } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Menu',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: DashboardIcon,
    },
    {
        segment: 'inventory',
        title: 'Inventory List',
        icon: InventoryIcon,
    },
    {
        segment: 'account',
        title: 'My Account',
        icon: AccountCircleIcon,
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
        </Box>
    );
}

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutbasic(props){
    const { window } = props;
    const router = useDemoRouter('/dashboard');
    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                title: 'Book Inventory Application',
            }}
            router={router}
            theme={demoTheme}
            window ={window}
        >
            <DashboardLayout>
                <LandingPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}

export default function LandingPage(props) {
    return (
        <DemoProvider>
            <DashboardLayoutbasic {...props} />
        </DemoProvider>
    );
}           
