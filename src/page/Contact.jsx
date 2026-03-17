import React, { useState } from "react";
import { Phone, Mail, MapPin,Clock,Shield } from "lucide-react";



export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost/backend/send-mail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMsg(result.message);
        setFormData({ name: "", phone: "", email: "", location: "", message: "" });
      } else {
        setErrorMsg(result.message || "Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Failed to submit form. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-[#587dff] rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Get In Touch
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Contact <span className="text-[#587dff]">Us</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Fill out the form and our team will contact you as soon as possible
          </p>
        </div>

        {/* Grid: Contact Info + Form */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-20">
          {/* Left: Info */}
          <div className="space-y-4 sm:space-y-6">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl h-45 sm:h-55">
              <img
                src="https://i.pinimg.com/1200x/b5/34/e9/b534e9bb4c9372c33471cd7c9a6698be.jpg"
                alt="Customer support team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                <h3 className="font-display text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                  We're Here to Help
                </h3>
                <p className="text-blue-100 text-sm sm:text-base">Available 24/7 for your support</p>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: <Phone size={20} />, title: "Phone", detail: "+91 9211975057", link: "tel:+919211975057" },
                { icon: <Mail size={20} />, title: "Email", detail: "Info@omicron.com", link: "mailto:Info@omicron.com" },
                { icon: <MapPin size={20} />, title: "Location", detail: "Ghaziabad", link: null },
                { icon: <Clock size={20} />, title: "Hours", detail: "24/7 Available", link: null }
              ].map((contact, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-blue-50 to-white p-3 sm:p-5 rounded-lg sm:rounded-xl border border-blue-100 hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="text-center">
                    <h4 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm">{contact.title}</h4>
                    {contact.link ? (
                      <a href={contact.link} className="text-gray-600 hover:text-[#587dff] transition-colors text-xs break-all">
                        {contact.detail}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-xs">{contact.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trusted Badge */}
            <div className="bg-gradient-to-br from-[#587dff] to-[#4169e6] p-4 sm:p-6 rounded-xl text-white shadow-xl">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                <Shield size={24} />
                <h4 className="font-bold text-base sm:text-lg">Trusted Service</h4>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm">
                Over 500 families have trusted us during their difficult times. Your privacy and dignity are our top priorities.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 md:p-10 lg:p-10 rounded-xl sm:rounded-2xl shadow-xl border border-blue-100">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#587dff] focus:ring-2 focus:ring-[#587dff] focus:ring-opacity-20 outline-none transition-all bg-white text-sm sm:text-base"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#587dff] focus:ring-2 focus:ring-[#587dff] focus:ring-opacity-20 outline-none transition-all bg-white text-sm sm:text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#587dff] focus:ring-2 focus:ring-[#587dff] focus:ring-opacity-20 outline-none transition-all bg-white text-sm sm:text-base"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#587dff] focus:ring-2 focus:ring-[#587dff] focus:ring-opacity-20 outline-none transition-all bg-white text-sm sm:text-base"
                      placeholder="Enter your location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 focus:border-[#587dff] focus:ring-2 focus:ring-[#587dff] focus:ring-opacity-20 outline-none transition-all resize-none bg-white text-sm sm:text-base"
                    placeholder="Any specific requirements or questions..."
                  ></textarea>
                </div>

                {successMsg && <p className="text-green-600 text-sm text-center">{successMsg}</p>}
                {errorMsg && <p className="text-red-600 text-sm text-center">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#587dff] to-[#4169e6] hover:from-[#4169e6] hover:to-[#587dff] text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-lg font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Request →"}
                </button>

                <p className="text-xs sm:text-sm text-gray-600 text-center">
                  We typically respond within 15 minutes during business hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
