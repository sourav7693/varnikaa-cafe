"use client"
import { useState } from 'react'
import toast from 'react-hot-toast';

const FormCard = () => {
     const [form, setForm] = useState({
        name: "",
        mobile: "",
        location: "",
        class: "",
        message: "",
      });
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (
          !form.name ||
          !form.mobile ||          
          !form.class          
        ) {
          toast.error("Please fill all the fields");
          return;
        }
    
        if (form.mobile.length !== 10) {
          toast.error("Please enter a valid mobile number");
          return;
        }
    
        const dest = "+919832480087";
        let message = `*Name:* ${form.name}
       *Phone:* ${form.mobile}
       *Location: * ${form.location}
       *Class: * ${form.class}   
       *Message:* ${form.message}
         `;
        message = encodeURIComponent(message);
        // Check if user is on mobile
        const isMobile = /iPhone|Android|iPad|iPod/i.test(navigator.userAgent);
        const baseUrl = isMobile
          ? "https://api.whatsapp.com/send"
          : "https://web.whatsapp.com/send";
    
        const url = `${baseUrl}?phone=${dest}&text=${message}`;
    
        try {
          const newWindow = window.open(url, "_blank");
          if (newWindow) {
            newWindow.focus();
          } else {
            toast.error(
              "Failed to open the link. Please check your browser settings."
            );
          }
        } catch (error) {
          console.error("Error opening new window:", error);
        }
      };
  return (
    <section>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6">
        {/* Left Form Section (40%) */}
        <div className="w-full md:w-[40%] bg-gradient-to-b from-[#f3f6ff] to-white p-8 rounded-2xl shadow-md flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
            Get Your Free Moving{" "}
            <span className="text-defined-purple">Quote Today!</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-center">
            <input
              type="text"
              name="name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full p-3 rounded-md border border-gray-300 outline-none"
            />
            <input
              type="number"
                name="mobile"
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              placeholder="Mobile Number"
              className="w-full p-3 rounded-md border border-gray-300 outline-none"
            />
            <select name="class" onChange={(e) => setForm({ ...form, class: e.target.value })} className="w-full p-3 rounded-md border border-gray-300 outline-none">
              <option value="">Choose Class</option>
              <option value="Traditonal Karate">Traditonal Karate</option>
              <option value="Sports Karate">Sports Karate</option>
              <option value="Self Defence for Women">
                Self Defence for Women
              </option>
            </select>
            <input
              type="text"
                name="location"
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Location"
              className="w-full p-3 rounded-md border border-gray-300 outline-none"
            />
            <textarea
              placeholder="Message"
                name="message"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full p-3 rounded-md border border-gray-300 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[#28156F] text-white py-3 rounded-md hover:bg-[#1f0f5a] transition-all"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="w-full md:w-[60%] rounded-2xl overflow-hidden shadow-md flex">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.617996808444!2d88.42971107543298!3d26.72464817675975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4416766abb097%3A0xb5110a2096f10a73!2sKAIZEN%20KARATE-DO%20ASSOCIATION%20INDIA!5e0!3m2!1sen!2sin!4v1759733671418!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
            className="w-full h-full border-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default FormCard