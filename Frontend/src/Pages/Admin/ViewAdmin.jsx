import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEnvelope, FaPhone, FaUserTag } from "react-icons/fa";

const ViewAdmin = () => {
  const [adminData, setAdminData] = useState(null); // State for admin details
  const [services, setServices] = useState([]); // State for services
  const [reports, setReports] = useState([]); // State for reports
  const [showReports, setShowReports] = useState(false); // State for toggling between tables
  const { email } = useParams(); // Extract 'email' from the URL

  // Fetch Admin Details, Services, and Reports
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // console.log("email", email); // Verify the value of the email parameter

        // Fetch admin details and services
        const response = await fetch(`http://localhost:4002/adminDetails/${email}`);
        const data = await response.json();
        // console.log("show data", data);
        if (data.length > 0) {
          // Extract admin details from the first entry
          const { A_Name, A_Email, A_Phone, A_Role } = data[0];
          setAdminData({ A_Name, A_Email, A_Phone, A_Role });

          // Extract services from the response
          const servicesList = data.map((item) => ({
            Service_Name: item.Add_Service_Name,
            Service_Category: item.Add_Service_Category,
          }));
          setServices(servicesList);
        }

        // Fetch reports
        const reportResponse = await fetch(`http://localhost:4002/adminReportAction/${email}`);
        const reportData = await reportResponse.json();
        setReports(reportData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAdminData();
  }, [email]);

  // Loading State
  if (!adminData) {
    return <div>Loading admin page ...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Profile Section */}
      <aside className="w-1/3 bg-white p-6 shadow-lg">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-3xl">
            {adminData.A_Name.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-lg font-semibold">{adminData.A_Name}</h2>
          <span className="text-sm text-gray-500">{adminData.A_Role}</span>
        </div>

        <div className="mt-8">
          <h3 className="font-semibold mb-4">Details</h3>
          <hr />
          <ul className="space-y-2 text-sm">
            <li className="flex items-center py-1">
              <FaEnvelope className="mr-2 text-xl text-gray-500" />
              <strong>Email:</strong> {adminData.A_Email}
            </li>
            <li className="flex items-center py-1">
              <FaUserTag className="mr-2 text-xl text-gray-500" />
              <strong>Role:</strong> {adminData.A_Role}
            </li>
            <li className="flex items-center py-1">
              <FaPhone className="mr-2 text-xl text-gray-500" />
              <strong>Phone:</strong> {adminData.A_Phone}
            </li>
          </ul>
        </div>
      </aside>

      {/* Right Content Section */}
      <main className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          {/* Toggle Button */}
          {/* <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setShowReports(!showReports)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {showReports ? "Show Services" : "Show Reports"}
            </button>
          </div> */}



          <header className="flex justify-between items-center mb-6">
  <h2 className="text-xl font-semibold">Admin Activity</h2>
  <div className="flex items-center space-x-2">
    <span className={`text-sm font-medium ${showReports ? "text-green-500" : "text-gray-500"}`}>
      Services Added
    </span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={!showReports}
        onChange={() => setShowReports((prev) => !prev)}
        className="sr-only peer"
      />
      <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300">
        <div className="w-4   h-4 bg-white rounded-full transform transition-transform duration-300 peer-checked:translate-x-5"></div>
      </div>
    </label>
    <span className={`text-sm font-medium ${!showReports ? "text-green-500" : "text-gray-500"}`}>
      Report Actions 
    </span>
  </div>
</header>


          {/* Services Table */}
          {!showReports && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <table className="min-w-full text-sm border border-gray-300">
                <thead>
                  <tr className="text-left bg-gray-100 text-gray-500">
                    <th className="pb-2 px-4 border">Service Name</th>
                    <th className="pb-2 px-4 border">Service Category</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length > 0 ? (
                    services.map((service, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-slate-200" : "bg-white"}
                      >
                        <td className="py-2 px-4 border">{service.Service_Name}</td>
                        <td className="px-4 border">{service.Service_Category}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center py-4">
                        No services available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Reports Table */}
          {showReports && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Reports</h3>
              <table className="min-w-full text-sm border border-gray-300">
                <thead>
                  <tr className="text-left bg-gray-100 text-gray-500">
                    <th className="pb-2 px-4 border">Report ID</th>
                    <th className="pb-2 px-4 border">Report Date</th>
                    <th className="pb-2 px-4 border">Description</th>
                    <th className="pb-2 px-4 border">Report Type</th>
                    <th className="pb-2 px-4 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length > 0 ? (
                    reports.map((report, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-slate-200" : "bg-white"}
                      >
                        <td className="py-2 px-4 border">{report.Report_ID}</td>
                        <td className="py-2 px-4 border">{new Date(report.Report_Date).toLocaleDateString()}</td>
                        <td className="px-4 border">{report.Report_Description}</td>
                        <td className="px-4 border">{report.Report_Type}</td>
                        <td className="px-4 border">{report.Report_Status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No reports available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewAdmin;
