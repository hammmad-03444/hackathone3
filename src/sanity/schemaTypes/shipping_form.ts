// schemas/shippingForm.js
import { defineType } from "sanity";

export default defineType({
  name: "shippingForm",
  title: "Shipping Form",
  type: "document",
  fields: [
    {
      name: "fullName",
      title: "Full Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "shippingAddress",
      title: "Shipping Address",
      type: "text",
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
    // Add new fields
    {
      name: "billingAddress",
      title: "Billing Address",
      type: "text",
      validation: Rule => Rule.required()
    },
    {
      name: "cardLast4",
      title: "Card Last 4 Digits",
      type: "string",
      validation: Rule => Rule.required().length(4)
    }
    
  ],
});
