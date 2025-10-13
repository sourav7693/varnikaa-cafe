"use client"
import { useState } from 'react'
import toast from 'react-hot-toast';

const EnquiryForm = () => {
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
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          id="name"
          placeholder="Name"
          className="placeholder:text-defined-purple text-defined-purple outline-none bg-white rounded-xl block w-full p-2.5 "
        />
        <input
          type="number"
          name="phone"
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          id="phone"
          placeholder="Phone"
          className="placeholder:text-defined-purple text-defined-purple outline-none bg-white rounded-xl block w-full p-2.5 "
        />
        <select
          name="class"
          onChange={(e) => setForm({ ...form, class: e.target.value })}
          className="w-full px-4 py-2 placeholder:text-defined-purple border bg-white border-gray-300 rounded-md outline-none"
        >
          <option value="">Choose Class</option>
          <option value="Traditonal Karate">Traditonal Karate</option>
          <option value="Sports Karate">Sports Karate</option>
          <option value="Self Defence for Women">Self Defence for Women</option>
        </select>
        <input
          type="text"
          name="location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          id="location"
          placeholder="Location"
          className="placeholder:text-defined-purple text-defined-purple outline-none bg-white rounded-xl block w-full p-2.5 "
        />
        <input
          name="message"
          onChange={(e) => setForm({ ...form, class: e.target.value })}
          id="message"
          placeholder="Your Message"
          className="block p-2.5 w-full placeholder:text-defined-purple text-defined-purple outline-none bg-white rounded-xl "
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white pink-purple rounded-md bg-defined-purple outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default EnquiryForm