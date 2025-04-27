export default function WhyChooseUs() {
  const reasons = [
    {
      icon: "fa-car",
      title: "Extensive Selection",
      description: "Choose from thousands of certified vehicles that meet the highest standards"
    },
    {
      icon: "fa-tag",
      title: "Best Prices",
      description: "Competitive pricing with no hidden fees and flexible financing options"
    },
    {
      icon: "fa-shield-alt",
      title: "Quality Guarantee",
      description: "All vehicles undergo rigorous 150-point inspection and come with warranty"
    },
    {
      icon: "fa-headset",
      title: "Dedicated Support",
      description: "Our customer service team is available 7 days a week to assist you"
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Why Choose AutoMart</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide a seamless car buying experience with transparency and integrity at the heart of everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <i className={`fas ${reason.icon} text-2xl`}></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
