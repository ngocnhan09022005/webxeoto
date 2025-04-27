export default function Testimonials() {
  const testimonials = [
    {
      name: "Michael Johnson",
      purchase: "Purchased Toyota Camry",
      rating: 5,
      comment: "The buying process was incredibly smooth. The car was exactly as described, and the customer service was exceptional. I would definitely recommend AutoMart to anyone looking for a quality vehicle.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Williams",
      purchase: "Purchased Honda CR-V",
      rating: 4.5,
      comment: "I was hesitant about buying a car online, but AutoMart made it so easy. The detailed photos and vehicle history gave me confidence, and their 7-day return policy sealed the deal. My Honda is perfect!",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "David Thompson",
      purchase: "Purchased BMW 3 Series",
      rating: 5,
      comment: "The financing options were fantastic, and I got a much better rate than my local dealership offered. The delivery was prompt, and the vehicle exceeded my expectations. I'll be a returning customer for sure.",
      image: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from customers who found their perfect car through AutoMart
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 overflow-hidden">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.purchase}</p>
                </div>
              </div>
              <div className="text-yellow-400 flex mb-4">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
                {testimonial.rating % 1 === 0.5 && <i className="fas fa-star-half-alt"></i>}
                {[...Array(5 - Math.ceil(testimonial.rating))].map((_, i) => (
                  <i key={i} className="far fa-star"></i>
                ))}
              </div>
              <p className="text-gray-600 italic">{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
