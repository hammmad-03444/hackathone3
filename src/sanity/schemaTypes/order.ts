// schemas/orders.js (Updated with reference to shippingForm)
import { defineType } from "sanity";

export default defineType({
  name: "orders",
  title: "Orders",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Items",
      type: "reference",  // Reference type
      to: [{ type:"shippingForm" }], // Reference to the shippingForm schema
    },
    {
      name:"fullName",
      title:"Full Name",
      type:"string"
    },
    
    {
      name:"email",
      title:"Email",
      type:"string"
    },
    {
      name:"shippingAddress",
      title:"Shipping Address",
      type:"string"
    },
    {
      name:"phoneNumber",
      title:"Phone Number",
      type:"string"
    },
   
    {
name:"status",
title:"Status",
type:"string",
options:{
  list:[
    {title:"Pending",value:"pending"},
    {title:"Shipped",value:"shipped"},
    {title:"Delivered",value:"delivered"},
    {title:"Cancelled",value:"cancelled"}
  ],
  layout:"radio"
},
initialValue:'pending'
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
              name: "name",
              title: "Product Name",
              type: "string",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
            },
            {
              name: "qty",
              title: "Quantity",
              type: "number",
            },
           
          ],
        },
      ],
    },
  ],
});
