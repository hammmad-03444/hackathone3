// schemas/shippingForm.js

import { Rule } from "sanity";


export default ({
  name: "contactForm",
  title: "Contact Form",
  type: "document",
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule:Rule) => Rule.required().error("Full name is required")
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule:Rule) => Rule.required().email().error("A valid email is required")
    },
    {
      name: "shippingAddress",
      title: "Shipping Address",
      type: "text",
      validation:(Rule:Rule)=>Rule.required().error("Shipping Address is required")
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      validation: (Rule:Rule) => Rule.required().regex(/^\d{11}$/).error("A valid 11-digit phone number is required")
    },
    
   
    
  ],
});
