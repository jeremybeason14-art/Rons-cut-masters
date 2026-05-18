'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#c9a961]/20">
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-4 flex justify-between items-center gap-6">
          <div className="text-xl sm:text-2xl font-bold">
            <span className="gradient-text">Vertical Solutions</span>
          </div>
          <div className="hidden md:flex gap-9 items-center text-sm">
            <a href="#about" className="hover:text-[#c9a961] transition-smooth">
              About
            </a>
            <a href="#services" className="hover:text-[#c9a961] transition-smooth">
              Services
            </a>
            <a href="#why-us" className="hover:text-[#c9a961] transition-smooth">
              Why Us
            </a>
            <a href="#service-area" className="hover:text-[#c9a961] transition-smooth">
              Service Area
            </a>
            <a href="#contact" className="hover:text-[#c9a961] transition-smooth">
              Contact
            </a>
          </div>
          <div className="text-[#c9a961] font-bold text-sm sm:text-base whitespace-nowrap">(202) 423-4218</div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-screen w-full overflow-hidden pt-28 pb-20"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Animated Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-transparent to-[#1a1a1a]">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c9a961] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#8b7355] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-[#0d0d0d] to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 flex flex-col items-center px-5 sm:px-8 lg:px-10 animate-fadeInUp"
          style={{
            width: '100%',
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h1 className="mx-auto w-full text-center text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.08]">
            <span className="gradient-text">Vertical</span> Elevation{' '}
            <span className="text-[#c9a961]">Excellence</span>
          </h1>
          <div className="mx-auto mt-8 mb-20 flex w-full max-w-[780px] justify-center text-center sm:mb-24">
            <p className="mx-auto w-full text-center text-lg leading-8 text-gray-300 sm:text-xl">
              Premium elevator and escalator solutions for the modern building. Trusted by over 500+ businesses across the DMV area.
            </p>
          </div>
          <div
            className="mx-auto flex w-full flex-col items-center gap-5 text-center sm:w-auto sm:flex-row"
            style={{
              justifyContent: 'center',
              marginTop: '32px',
            }}
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-[#c9a961] to-[#e5d4b8] text-black font-bold rounded-lg hover-lift animate-pulse-glow text-center"
            >
              Request Service
            </a>
            <a
              href="tel:+12024234218"
              className="w-full sm:w-auto px-9 py-4 bg-transparent border-2 border-[#c9a961] text-[#c9a961] font-bold rounded-lg hover:bg-[#c9a961] hover:text-black transition-smooth text-center"
            >
              Call Now: (202) 423-4218
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-28 sm:py-32 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-4xl sm:text-5xl font-bold mb-8">
                About <span className="gradient-text">Vertical Solutions</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                For over two decades, Vertical Solutions has been the trusted partner for elevator and escalator services throughout the DMV area. Our commitment to safety, reliability, and expert solutions sets us apart.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We specialize in elevator maintenance, emergency repairs, new installations, and modernization projects. Our team of experienced technicians provides fast response times and long-term partnerships you can count on.
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#c9a961] rounded-full"></div>
                  <span className="text-gray-200">Industry-leading safety standards</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#c9a961] rounded-full"></div>
                  <span className="text-gray-200">24/7 emergency service availability</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#c9a961] rounded-full"></div>
                  <span className="text-gray-200">500+ satisfied commercial partners</span>
                </div>
              </div>
            </div>
            <div className="animate-slideInRight">
              <div className="relative h-96 rounded-lg overflow-hidden border border-[#c9a961]/30">
                <img 
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Professional elevator technician"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="mt-8 bg-gradient-to-br from-[#c9a961]/20 to-[#8b7355]/20 rounded-lg p-8 border border-[#c9a961]/30 glass-effect">
                <div className="space-y-8">
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                    <p className="text-gray-300">Active Commercial Clients</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">20+</div>
                    <p className="text-gray-300">Years of Industry Experience</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
                    <p className="text-gray-300">Emergency Response Team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-28 sm:py-32 px-5 sm:px-8 lg:px-10 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive elevator and escalator solutions for every need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: 'Elevator Maintenance',
                description: 'Preventive maintenance programs to keep your elevators running smoothly and safely.',
                image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Elevator Repairs',
                description: 'Fast emergency and routine repair services to minimize downtime for your building.',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'New Installations',
                description: 'Expert installation of modern elevator systems for new construction and renovations.',
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Elevator Modernization',
                description: 'Upgrade aging systems with the latest technology and safety features.',
                image: 'https://images.unsplash.com/photo-1486893732792-ab266ce5b319?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Escalator Services',
                description: 'Complete escalator installation, maintenance, and repair services.',
                image: 'https://images.unsplash.com/photo-1581092574326-b6c1c5a8ddca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Emergency Service',
                description: '24/7 emergency response team available for critical situations.',
                image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8ZW58MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#c9a961]/20 rounded-lg overflow-hidden hover-lift relative h-96"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${service.image}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-colors duration-300"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="w-full py-28 sm:py-32 px-5 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-20 text-center">
            Why <span className="gradient-text">Choose Us</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20">
            <div className="space-y-10">
              {[
                {
                  title: 'Experienced Technicians',
                  description: 'Our team consists of certified professionals with decades of combined experience.',
                },
                {
                  title: 'Fast Response Times',
                  description: 'Same-day service for emergencies and rapid deployment for all service requests.',
                },
                {
                  title: 'Reliable Partnerships',
                  description: 'Long-term relationships with 500+ commercial clients across the region.',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#c9a961]/20 border border-[#c9a961]/40">
                      <div className="w-2 h-2 bg-[#c9a961] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-10">
              {[
                {
                  title: 'Safety Focused',
                  description: 'All work meets or exceeds industry safety standards and regulations.',
                },
                {
                  title: 'Transparent Pricing',
                  description: 'No hidden fees. Competitive rates with upfront quotes for all services.',
                },
                {
                  title: 'Serving DMV Area',
                  description: 'Trusted provider throughout Washington DC, Maryland, and Virginia.',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 animate-fadeInUp" style={{ animationDelay: `${(index + 3) * 0.1}s` }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-[#c9a961]/20 border border-[#c9a961]/40">
                      <div className="w-2 h-2 bg-[#c9a961] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section id="service-area" className="w-full py-28 sm:py-32 px-5 sm:px-8 lg:px-10 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-20 text-center">
            Our <span className="gradient-text">Service Area</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                region: 'Washington, DC',
                description: 'Serving all neighborhoods and commercial districts throughout the capital.',
              },
              {
                region: 'Maryland',
                description: 'Coverage from Baltimore to the suburbs and surrounding communities.',
              },
              {
                region: 'Northern Virginia',
                description: 'Arlington, Alexandria, Fairfax, and surrounding Virginia cities.',
              },
            ].map((area, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#c9a961]/20 rounded-lg p-8 text-center hover-lift"
              >
                <div className="text-4xl font-bold text-[#c9a961] mb-4">0{index + 1}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{area.region}</h3>
                <p className="text-gray-400">{area.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-[#c9a961]/10 to-[#8b7355]/10 border border-[#c9a961]/30 rounded-lg p-8 text-center glass-effect">
            <p className="text-lg text-gray-300 mb-4">
              Don&apos;t see your location? <span className="text-[#c9a961] font-bold">Contact us</span> - we may still be able to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-28 sm:py-32 px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Ready to elevate your building? Contact us for a free quote or emergency service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-14">
            {[
              {
                label: 'Phone',
                value1: '(202) 423-4218',
                value2: '(240) 347-1085',
              },
              {
                label: 'Email',
                value1: 'VSecompany@gmail.com',
                value2: 'Inquiries & Quotes',
              },
              {
                label: 'Hours',
                value1: '24/7 Emergency Service',
                value2: 'Office: Mon-Fri 8AM-5PM',
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#c9a961]/20 rounded-lg p-6 text-center"
              >
                <div className="text-3xl font-bold text-[#c9a961] mb-3">{contact.label}</div>
                <p className="text-white font-semibold mb-1">{contact.value1}</p>
                <p className="text-gray-400 text-sm">{contact.value2}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#c9a961]/30 rounded-lg p-8 glass-effect">
            <h3 className="text-2xl font-bold mb-6 text-white">Request a Quote</h3>

            {formSubmitted && (
              <div className="mb-6 p-4 bg-[#c9a961]/20 border border-[#c9a961] rounded-lg text-[#c9a961]">
                ✓ Thank you! We&apos;ll contact you within 24 hours.
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-[#c9a961]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a961] transition-smooth"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-[#c9a961]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a961] transition-smooth"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-[#c9a961]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a961] transition-smooth"
                />
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-[#c9a961]/30 rounded-lg text-white focus:outline-none focus:border-[#c9a961] transition-smooth"
                >
                  <option value="">Select a Service</option>
                  <option value="maintenance">Elevator Maintenance</option>
                  <option value="repair">Elevator Repairs</option>
                  <option value="installation">New Installations</option>
                  <option value="modernization">Elevator Modernization</option>
                  <option value="escalator">Escalator Services</option>
                  <option value="emergency">Emergency Service</option>
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Tell us about your project or concern..."
                value={formData.message}
                onChange={handleFormChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black/50 border border-[#c9a961]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a961] transition-smooth resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-[#c9a961] to-[#e5d4b8] text-black font-bold rounded-lg hover-lift transition-smooth"
              >
                Send Quote Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black border-t border-[#c9a961]/20 mt-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 mb-10">
            <div>
              <h4 className="text-lg font-bold gradient-text mb-4">Vertical Solutions</h4>
              <p className="text-gray-400 text-sm">
                Premium elevator and escalator services serving the DMV area since 2004.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#services" className="hover:text-[#c9a961] transition-smooth">Maintenance</a></li>
                <li><a href="#services" className="hover:text-[#c9a961] transition-smooth">Repairs</a></li>
                <li><a href="#services" className="hover:text-[#c9a961] transition-smooth">Installation</a></li>
                <li><a href="#services" className="hover:text-[#c9a961] transition-smooth">Modernization</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>(202) 423-4218</li>
                <li>(240) 347-1085</li>
                <li>VSecompany@gmail.com</li>
                <li>24/7 Emergency Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Service Area</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Washington, DC</li>
                <li>Maryland</li>
                <li>Northern Virginia</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#c9a961]/20 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 Vertical Solutions Elevator Company. All rights reserved. | Licensed & Insured | 24/7 Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
