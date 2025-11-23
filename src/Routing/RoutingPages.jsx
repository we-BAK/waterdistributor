import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Layout from '../pages/PageLayout/Layout';
import LoginPage from '../pages/Login/loginpage';

//Stockkeeper component
import StockKeeperDashboard from '../pages/Stockkeeper/stockkeep';
import DistributionForm from '../component/DistributionForm';
import DistributionHistory from '../component/DistributionHistory';
import StockReceivedHistory from '../component/StockReceivedHistory';
import RecordReceived from '../component/RecordReceived';
import CurrentStockTable from '../component/CurrentStockTable';

//Owner page
import OwnerDashboard from '../pages/owner/OwnerDashboard';
// import OwnerPageCards from './../component/OwnerPageCards';

//Salesperson page
import Salesperson from './../pages/disributors/Salesperson';
// import SalesPersonCards from './../component/SalesPersonCards';



const RoutingPages = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/Owner" element={<Layout />}>
                    <Route index element={<OwnerDashboard />} />
                    {/* Future nested owner routes can go here */}
                </Route>

                <Route path="/Sales" element={<Layout />}>
                    <Route index element={<Salesperson />} />
                    {/* Future salesperson routes */}
                </Route> 

                <Route path="/StockKeeper" element={<Layout />}>
                    <Route index element={<StockKeeperDashboard />} />
                    <Route path="distributionForm" element={<DistributionForm />} />
                    <Route path="distributionHistory" element={<DistributionHistory />} />
                    <Route path="currentStock" element={<CurrentStockTable />} />
                    <Route path="recordReceived" element={<RecordReceived />} />
                    <Route path="stockReceivedHistory" element={<StockReceivedHistory />} />
                    {/* Future stock keeper routes */}
                </Route>

                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default RoutingPages;
