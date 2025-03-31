import "./Testimonial.scss";

const testimonials = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    text: "Booking my seat in advance has never been easier! The system is seamless, and I never have to worry about last-minute rushes.",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Jane Doe",
    text: "I love how I can select my preferred seat and pay online. It’s convenient and saves so much time!",
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Jim Beam",
    text: "No more long queues! This booking system ensures I get a seat without the stress of waiting at the station.",
  },
  {
    id: 4,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Elisa Maza",
    text: "Reliable and efficient! I can track my bookings and even reschedule if my plans change.",
  },
  {
    id: 5,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "William Smith",
    text: "A game changer! The ability to see available seats and book in advance has made traveling so much easier.",
  },
  {
    id: 6,
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Emily Clarke",
    text: "The best part is the transparency! I know my fare upfront, and there are no hidden charges.",
  },
  {
    id: 7,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Michael Brown",
    text: "I appreciate the user-friendly interface. It’s easy to book, and the payment options are very convenient.",
  },
  {
    id: 8,
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Sophia Johnson",
    text: "This system has revolutionized public transport! No more uncertainty—I always have a confirmed seat.",
  },
];

const Testimonial = () => {
  return (
    <>
      <h1 className="text-center font-bold">What Our Customers Say</h1>
      <div className="testimonial-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="testimonial-img"
            />
            <h5>{testimonial.name}</h5>
            <p>{testimonial.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Testimonial;
