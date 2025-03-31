import { CheckCircle } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  // Online image for the About Section
  const imageURL = "data:image/jpeg;base64,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";

  // useInView hook to trigger the counting animation when the stats section comes into view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
        {/* Image Section */}
        <div className="lg:w-1/2 mb-8 lg:mb-0 h-full">
          <div className="max-w-lg mx-auto lg:mx-0 h-full">
            <img
              src={imageURL}
              alt="Public Transport Bus"
              className="w-full h-full rounded-lg shadow-lg object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2">
          <div className="max-w-lg mx-auto lg:mx-0">
            <h2 className="text-4xl font-bold text-[#000d6b] mb-6">About Us</h2>
            <h3 className="text-3xl font-bold text-[#000d6b] mb-6">
              Welcome to Automated Public Service Vehicle Seat Booking System
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              At Automated Public Service Vehicle Seat Booking System, we are revolutionizing 
              the public transportation experience with our innovative automated seat booking platform. 
              Whether you commute daily or travel occasionally, our system ensures a smooth journey.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Enjoy real-time seat availability, a secure booking process, and reliable service 
              at your fingertips. Forget the hassle of crowded buses and last-minute booking stress.
            </p>
            <div>
              <p className="text-lg text-gray-700 flex items-center mb-4">
                <CheckCircle className="mr-2 text-blue-600" />
                Real-time seat availability and booking.
              </p>
              <p className="text-lg text-gray-700 flex items-center mb-4">
                <CheckCircle className="mr-2 text-blue-600" />
                Hassle-free and secure online payments.
              </p>
              <p className="text-lg text-gray-700 flex items-center">
                <CheckCircle className="mr-2 text-blue-600" />
                Quick and easy booking process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={ref}
        className="about-stats mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { label: "Customers", end: 150, desc: "Satisfied Customers" },
          { label: "Bookings", end: 5000, desc: "Successful Bookings" },
          { label: "Routes", end: 200, desc: "Covered Routes" },
          { label: "Vehicles", end: 1000, desc: "Registered Vehicles" },
        ].map((stat, index) => (
          <div
            key={index}
            className="stat-item text-center p-6 bg-gray-100 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          >
            <p className="text-lg text-gray-600 mb-2">{stat.label}</p>
            <h4 className="text-3xl text-red-600 font-bold mb-2">
              {inView ? <CountUp start={0} end={stat.end} duration={2} suffix="+" /> : "0+"}
            </h4>
            <p className="text-lg text-gray-600">{stat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
