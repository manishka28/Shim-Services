import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
  return (
    <>
      <div className="bg-black text-white min-h-screen lg-6">
        <div className="text-center pt-8">
          <h2 className="text-3xl font-bold italic">Discover Services</h2>
        </div>

        <div className="flex justify-center pt-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-2/5 p-2 bg-transparent border border-gray-400 rounded-md text-white"
          />
          <button className="ml-2 p-2 bg-green-700 hover:bg-blue-700 text-white rounded-md">
            Search
          </button>
        </div>

        {/* Update the grid layout here */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8">
          <ServiceCard
            heading="Electrical Repair"
            image="https://tse2.mm.bing.net/th?id=OIP.PNKf3_tFyS15I0wuyl8uzwHaHa&pid=Api&P=0&h=180"
          />
          <ServiceCard
            heading="Plumbing"
            image="https://webstockreview.net/images/plumber-clipart-21.jpg"
          />
          <Link to="/beauty" className="text-inherit no-underline">
            <ServiceCard
              heading="Beauty Services"
              image="https://tse4.mm.bing.net/th?id=OIP.d0XrL7923LJpIkKb2A85iwHaH4&pid=Api&P=0&h=180"
            />
          </Link>
          <Link to="/appliance" className="text-inherit no-underline">
            <ServiceCard
              heading="Appliance Repair"
              image="https://tse3.mm.bing.net/th?id=OIP.ElBjNs5gIpqIc5KCviOmGAHaHu&pid=Api&P=0&h=180"
            />
          </Link>
          <ServiceCard
            heading="Carpentry"
            image="https://tse2.mm.bing.net/th?id=OIP.zyrzPSA4bWw6CUb9we0oIQAAAA&pid=Api&P=0&h=180"
          />
          <ServiceCard
            heading="Gardening"
            image="https://tse1.mm.bing.net/th?id=OIP.NKA0OX49_PYvoMdRV-vqEwHaHa&pid=Api&P=0&h=180"
          />
          <ServiceCard
            heading="Painting"
            image="https://tse1.mm.bing.net/th?id=OIP.f4FtyCG7Qq0qhu_ihZf2-QAAAA&pid=Api&P=0&h=180"
          />
          <ServiceCard
            heading="Pest Control"
            image="https://tse3.explicit.bing.net/th?id=OIP.kmrQ-dvG9rAbyCXswDQ-tgHaHa&pid=Api&P=0&h=180"
          />
          <ServiceCard
            heading="House Cleaning"
            image="https://tse2.mm.bing.net/th?id=OIP.8K7xMhlQ1yKYprBgTz8FigAAAA&pid=Api&P=0&h=180"
          />
          <ServiceCard
            heading="Network Services"
            image="https://tse4.mm.bing.net/th?id=OIP.MS6K_WJSKuK97ydOyUTS1AHaFH&pid=Api&P=0&h=180"
          />
        </div>
      </div>
    </>
  );
}

function ServiceCard({ heading, image }) {
  return (
    <div className="text-center">
      <img
        src={image}
        alt={heading}
        className="h-20 w-20 border-2 border-white rounded-full mx-auto hover:shadow-md"
      />
      <div className="text-lg mt-4">{heading}</div>
    </div>
  );
}

export default Services;
