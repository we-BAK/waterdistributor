import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from '../pages/PageLayout/Layout';
import LoginPage from '../pages/Login/LoginPage';
import LandingPage from '../pages/LandingPage/LandingPage';

//Stockkeeper component
import StockKeeperDashboard from '../pages/Stockkeeper/stockkeep';
import DistributionForm from '../component/DistributionForm';
import DistributionHistory from '../component/DistributionHistory';
import StockReceivedHistory from '../component/StockReceivedHistory';
import RecordReceived from '../component/RecordReceived';
import CurrentStockTable from '../component/CurrentStockTable';

//Owner page
import OwnerDashboard from './../pages/Owner/OwnerDashboard';
// import OwnerPageCards from './../component/OwnerPageCards';

//Salesperson page
import Salesperson from './../pages/disributors/Salesperson';
// import SalesPersonCards from './../component/SalesPersonCards';



const RoutingPages = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />

                 
                    <Route path="/Owner" element={<Layout />}>
                        <Route index element={<OwnerDashboard />} />
                        {/* <Route path="" element={} />
                        <Route path="" element={} />
                        <Route path="" element={} />
                        <Route path="" element={} /> */}
                        {/* <Route path="profile" element={<UserProfile />} /> */}
                    </Route>
                

                
                    <Route path="/Sales" element={<Layout />}>
                        <Route index element={<Salesperson />} />
                        {/* <Route path="" element={} />
                        <Route path="" element={} />
                        <Route path="" element={} />
                        <Route path="" element={} /> */}
                        {/* <Route path="profile" element={<UserProfile />} /> */}
                    </Route> 
                


                
                    <Route path="/StockKeeper" element={<Layout />}>
                        <Route index element={<StockKeeperDashboard />} />
                        <Route path="distributionForm" element={<DistributionForm />} />
                        <Route path="distributionHistory" element={<DistributionHistory />} />
                        <Route path="currentStock" element={<CurrentStockTable />} />
                        <Route path="recordReceived" element={<RecordReceived />} />
                        <Route path="stockReceivedHistory" element={<StockReceivedHistory />} />
                        {/* <Route path="profile" element={<UserProfile />} /> */}
                    </Route>

            
            </Routes>
        </Router>
    );
}

export default RoutingPages;
