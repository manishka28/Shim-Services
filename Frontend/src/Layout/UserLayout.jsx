import { Outlet } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';

function UserLayout() {
  return (
    <div>
      <Navigation />
      
      <main>
        <Outlet />  {/* This renders the child routes */}
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;
