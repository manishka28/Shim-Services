import React, { useState, useEffect } from 'react';
import Order from '../Components/Order';
import { useAuth } from '../context/AuthContext';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) {
        console.error('No user is logged in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:4002/bookings');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const filteredOrders = data.filter(order => order.U_Email === currentUser.U_Email);

        const statusMap = {
          'Pending': 'In Progress',
          'Confirmed': 'Scheduled',
          'Completed': 'Completed'
        };

        const mappedOrders = filteredOrders.map(order => ({
          ...order,
          status: statusMap[order.Book_Status] || order.Book_Status,
        }));

        const sortedOrders = mappedOrders.sort((a, b) => {
          const statusOrder = { 'In Progress': 1, 'Scheduled': 2, 'Completed': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });

        setOrders(sortedOrders);
        await fetchBills(sortedOrders);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  const fetchBills = async (orders) => {
    let billData = {};
    for (const order of orders) {
      if (order.status === 'Scheduled') {
        try {
          const billResponse = await fetch(`http://localhost:4002/bills/${order.Book_ID}`);
          if (billResponse.ok) {
            const bill = await billResponse.json();
            billData[order.Book_ID] = bill;
          } else if (billResponse.status === 404) {
            console.warn(`Bill not found for Book_ID: ${order.Book_ID}`);
          } else {
            console.error(`Failed to fetch bill for Book_ID ${order.Book_ID}: Status ${billResponse.status}`);
          }
        } catch (error) {
          console.error(`Error fetching bill for Book_ID ${order.Book_ID}:`, error);
        }
      }
    }
    setBills(billData);
  };

  const handleCancel = (id) => {
    setOrders(prevOrders => prevOrders.filter(order => order.Book_ID !== id));
    alert(`Order ${id} has been canceled.`);
  };

  const handleGetHelp = (id) => {
    alert(`Help has been requested for Order ${id}.`);
  };

  const handlePayNow = (orderId) => {
    const bill = bills[orderId];
    if (bill && bill.Bill_Mode === 'online') {
      alert(`Redirecting to payment gateway for order ${orderId}`);
    } else {
      alert(`No online payment available for order ${orderId}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6">My Orders</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
        {orders.filter(order => order.status === 'In Progress').length > 0 ? (
          orders
            .filter(order => order.status === 'In Progress')
            .map(order => (
              <Order key={order.Book_ID} order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
            ))
        ) : (
          <p>No orders in progress.</p>
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Scheduled</h2>
        {orders.filter(order => order.status === 'Scheduled').length > 0 ? (
          orders
            .filter(order => order.status === 'Scheduled')
            .map(order => (
              <Order
                key={order.Book_ID}
                order={order}
                onCancel={handleCancel}
                onHelp={handleGetHelp}
                onPayNow={handlePayNow}
                payNow={bills[order.Book_ID]?.Bill_Mode === 'online'}
              />
            ))
        ) : (
          <p>No scheduled orders.</p>
        )}
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Completed</h2>
        {orders.filter(order => order.status === 'Completed').length > 0 ? (
          orders
            .filter(order => order.status === 'Completed')
            .map(order => (
              <Order key={order.Book_ID} order={order} onCancel={handleCancel} onHelp={handleGetHelp} />
            ))
        ) : (
          <p>No completed orders.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
