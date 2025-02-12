export default {
    // Define the document type and its name
    name: 'product',
    type: 'document',
    title: 'Product', // The title displayed in the CMS for this document
    fields: [
      {
        // Field for the product's name
        name: 'name',
        type: 'string', // Basic text field
        title: 'Product Name', // Label for the field in the CMS
        validation: (Rule) =>
          Rule.required() // Makes this field mandatory
            .max(100) // Restricts the maximum length to 100 characters
            .error('Product name is required and cannot exceed 100 characters.'),
      },
      {
        // Slug field for generating a URL-friendly identifier
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        description: 'URL-friendly identifier for the product.', // Helper text in the CMS
        options: {
          source: 'name', // Automatically generates the slug based on the product name
          maxLength: 200, // Limits the slug length
        },
        validation: (Rule) =>
          Rule.required().error('Slug is required for product identification.'),
      },
      {
        // Field for a detailed description of the product
        name: 'description',
        type: 'text', // Multi-line text field
        title: 'Description',
        description: 'Detailed description of the product.',
        validation: (Rule) =>
          Rule.required() // Makes this field mandatory
            .min(20) // Requires at least 20 characters
            .max(500) // Limits to a maximum of 500 characters
            .error('Description must be between 20 and 500 characters.'),
      },
      {
        // Field for the product's price
        name: 'price',
        type: 'number', // Numeric field
        title: 'Product Price',
        validation: (Rule) =>
          Rule.required() // Makes this field mandatory
            .min(0) // Ensures the price is non-negative
            .error('Product price must be a positive value.'),
      },
      {
        // Field for the discount percentage
        name: 'discountPercentage',
        type: 'number',
        title: 'Discount Percentage',
        description: 'Percentage discount on the product.',
        validation: (Rule) =>
          Rule.min(0) // Ensures the discount is not negative
            .max(100) // Ensures the discount does not exceed 100%
            .error('Discount percentage must be between 0 and 100.'),
      },
      {
        // Field for the price before the discount
        name: 'priceWithoutDiscount',
        type: 'number',
        title: 'Original Price',
        description: 'Original price of the product before discount.',
        readOnly: true, // Makes this field read-only
        // Automatically calculates the field based on price and discount
        inputComponent: (doc) =>
          doc.price / (1 - doc.discountPercentage / 100),
      },
      {
        // Field for the product's rating
        name: 'rating',
        type: 'number',
        title: 'Product Rating',
        validation: (Rule) =>
          Rule.min(0) // Ensures the rating is not negative
            .max(5) // Limits the rating to a maximum of 5
            .precision(1) // Allows one decimal place
            .error('Rating must be between 0 and 5.'),
      },
      //Field for the number of ratings the product has received

      {
        name:'ratingCount',
        type:'number',
        title:'Rating Count',
        description:'Total number of ratings recived by the product',
        validation:(Rule)=>Rule.min(0).error('Rating count must be a positive value.')
      },
      //Array field for tags associated with the product 
      {
        name:'tags',
        type:'array',
        title:'Tags',
        description:'Tags associated with the product',
        of:[{type:'string'}], // Each element in the array is a string
        options:{
          layout:'tags' // Displays the tags as tags in the CMS
        }
      },
      //Array field for abailable sizes for the product
      {
        name:'sizes',
        type:'array',
        title:'Available Sizes',
        of:[{type:'string'}], // Each element in the array is a string
        options:{
          list:[ // List of predefined sizes
            {title:'Small',value:'S'},
            {title:'Medium',value:'M'},
            {title:'Large',value:'L'},
            {title:'Extra Large',value:'XL'},
          ]
        },
        discription:'Available sizes of the product'

      },
      //Field for the product's image
      {
        name:'image',
        type:'image',
        title:'Product Image',
        description:'Image of the product',
        validation:(Rule)=>Rule.required().error('Product image is required'),
        options:{
          hotspot:true // Allows the user to select a hotspot for the image
        }
      },
      //Array Feild for the product's color
      {
        name:'colors',
        type:'array',
        title:'Available Colors',
        description:'Colors available for the product',
        of:[{type:'string'}], // Each element in the array is a string
        options:{
          list:[ // List of predefined colors
            {title:'Red',value:'#ff0000'},
            {title:'Blue',value:'#0000ff'},
            {title:'Green',value:'#00ff00'},
            {title:'Yellow',value:'#ffff00'},
            {title:'Black',value:'#000000'},
            {title:'White',value:'#ffffff'},
          ]
        }
      },
     
      //Field for the product's category
      {
        name:'category',
        type:'reference',
        title:'Product Category',
        description:'Category of the product',
        to:[{type:'category'}] // Reference to the 'category' document type
      },
     
    ],

  };
  