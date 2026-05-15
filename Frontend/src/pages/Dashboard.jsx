import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: '',
    name: '',
    contact: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    userDashboard();
  }, []);

  const userDashboard = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + '/dashboard',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          withCredentials: true,
        }
      );

      setData(response.data.dashboard);
    } catch (err) {
      console.log('Error fetching user dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  const menuItems = [
    {
      name: 'Add Product',
      path: '/AddProduct',
    },
    {
      name: 'View Product',
      path: '/ViewProduct',
    },
  ];

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>

      <div>

        <aside>

          <div>
            {isSidebarOpen && (
              <h2>User Dashboard</h2>
            )}

            <button
              onClick={() =>
                setSidebarOpen(!isSidebarOpen)
              }
            >
              {isSidebarOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          <nav>
            <div>
              <button>
                Dashboard
              </button>
            </div>

            {menuItems.map((item) => (
              <div key={item.path}>
                <button
                  onClick={() =>
                    navigate(item.path)
                  }
                >
                  {item.name}
                </button>
              </div>
            ))}
          </nav>


          <div>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>


        <main>

          <header>
            <h1>Dashboard</h1>

            <p>
              Welcome Back {data.name}
            </p>
          </header>


          <section>

            <div>
              <h2>User Information</h2>

              <div>
                <div>
                  <h3>Name</h3>
                  <p>{data.name}</p>
                </div>

                <div>
                  <h3>Email</h3>
                  <p>{data.email}</p>
                </div>

                <div>
                  <h3>Contact</h3>
                  <p>{data.contact}</p>
                </div>

                <div>
                  <h3>Address</h3>
                  <p>{data.address}</p>
                </div>
              </div>
            </div>


            <div>
              <h2>Quick Actions</h2>

              <div>
                {menuItems.map((item) => (
                  <div key={item.path}>
                    <h3>{item.name}</h3>

                    <button
                      onClick={() =>
                        navigate(item.path)
                      }
                    >
                      Open
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;