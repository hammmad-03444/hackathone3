// schemas/orders.js (Updated with reference to shippingForm)

import { Rule } from "sanity";


export default ({
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "shippingForm",
      title: "Shipping Form",
      type: "reference",  // Reference type
      to: [{ type:"contactForm" }], // Reference to the contactForm schema
      validation: (Rule:Rule) => Rule.required().error("Shipping form is required")
    },
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name:"TrackingId",
              title:"TrackingId",
              type:"string",
              readOnly:true
            }
            ,
            {
              name: "name",
              title: "Product Name",
              type: "string",
              validation: (Rule:Rule) => Rule.required().error("Product name is required")
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule:Rule) => Rule.required().error("Price is required")
            },
            {
              name: "qty",
              title: "Quantity",
              type: "number",
              validation: (Rule:Rule) => Rule.required().integer().positive().error("Quantity is required")
            },
           
          ],
        },
      ],
      validation: (Rule:Rule) => Rule.required().error("At least one product is required")
    },
  ],
});
