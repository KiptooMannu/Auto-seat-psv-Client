import { CheckCircle } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the animation plays only once
    threshold: 0.5, // Triggers animation when 50% of the element is visible
  });

  // Online image for the About Section
  const imageURL =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExMVFhUXGBUVFxgVGRgXFxgXFRUWFxYYFxgYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGRAQGysdHh0tLS0tLS4tLS0tLS0tLS0tKy0tLS4tLS0tLS0tLS0tLS0rLS0tLS0tLS4rLS0tLS0tLf/AABEIAHsBmgMBIgACEQEDEQH/..."; // Truncated for brevity

  return (
    <section className="flex flex-col items-center justify-center p-6 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-4">About Us</h2>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Image container with square aspect ratio */}
        <div className="w-64 h-64 bg-gray-300 rounded-lg overflow-hidden">
          <img
            src={imageURL}
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Text content */}
        <div className="max-w-md text-center md:text-left">
          <p className="text-gray-700">
            We provide top-notch vehicle rental services, ensuring customer
            satisfaction with seamless booking and excellent support.
          </p>
          <div className="mt-4 flex items-center justify-center md:justify-start gap-4">
            <CheckCircle className="text-green-500" size={24} />
            <span className="text-lg font-medium">Reliable & Secure</span>
          </div>
          <div className="mt-2 flex items-center justify-center md:justify-start gap-4">
            <CheckCircle className="text-green-500" size={24} />
            <span className="text-lg font-medium">Affordable Prices</span>
          </div>
          <div className="mt-2 flex items-center justify-center md:justify-start gap-4">
            <CheckCircle className="text-green-500" size={24} />
            <span className="text-lg font-medium">24/7 Support</span>
          </div>

          {/* Animated statistics */}
          <div ref={ref} className="mt-6 flex justify-around">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600">
                {inView ? <CountUp start={0} end={500} duration={3} /> : 0}+
              </h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600">
                {inView ? <CountUp start={0} end={100} duration={3} /> : 0}+
              </h3>
              <p className="text-gray-600">Vehicles Available</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-600">
                {inView ? <CountUp start={0} end={10} duration={3} /> : 0}+
              </h3>
              <p className="text-gray-600">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
