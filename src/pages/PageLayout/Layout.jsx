// import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';   
import Navbar from '../../component/header';
import logo from '../..//assets/download.png';

// import Notification from './Notification';

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
              <Navbar 
                appName="Water Distributor"
                logoSrc={logo}
                onUserIconClick={() => console.log("User clicked profile")}
                onMenuToggle={() => console.log("Menu toggle clicked")}
              />
        {/* <Notification /> */}
        <main className="flex-2 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
