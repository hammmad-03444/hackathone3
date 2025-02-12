// Checkout Component
"use client";

// toastify
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

// Form links
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/lib/client";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { BreadcrumbCollapsed } from "@/components/Breadcrupm";

// Form schema with validations
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  phoneNumber: z
    .string()
    .regex(/^\d{10,}$/, "Phone number must be at least 10 digits"), // Correct Regex
});
type FormdType = z.infer<typeof formSchema>;

function Checkout() {
  // toastify
  const notifySuccess = () =>
    toast.success("Order placed successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const notifyError = (error: string) =>
    toast.error(error, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  // Cart items interface
  interface CartItem {
    name: string;
    price: number;
    discount: number;
    qty: number;
    image: string;
  }

  const cartArray: CartItem[] = useSelector((state: { cart: CartItem[] }) => state.cart);

  const total = cartArray.reduce((total: number, arr: CartItem) => {
    const discountedPrice = arr.discount > 0 ? arr.price - (arr.price * arr.discount) / 100 : arr.price;
    return total + discountedPrice * arr.qty;
  }, 0);

  // form setup
  const form = useForm<FormdType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      shippingAddress: "",
      phoneNumber: "",
    },
  });

  // Submit handler
  async function onSubmit(values: FormdType) {
    try {
      // Create Shipping Form in Sanity
      const shippingForm = await client.create({
        _type: "shippingForm",
        fullName: values.fullName,
        email: values.email,
        shippingAddress: values.shippingAddress,
        phoneNumber: values.phoneNumber,
      });

      // Create Order with Shipping Form and Products
      const order = await client.create({
        _type: "orders",
        shippingForm: { _ref: shippingForm._id },
        products: cartArray.map((product: any) => ({
          name: product.name,
          price: product.price,
          qty: product.qty,
        })),
      });

      // Show success toast
      notifySuccess();

      // Clear form fields after submission
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error); // Debugging log
      notifyError("Failed to place the order. Please try again.");
    }
  }

  return (
    <main className="mt-24 lg:mt-36">
      <BreadcrumbCollapsed/>
    <div className=" flex flex-col md:flex-row space-y-5 sm:space-y-0 p-5 justify-center items-start lg:space-x-6">
      {cartArray.length >= 1 && (
        <div className="w-full lg:w-[600px] space-y-4 border rounded-[20px] pt-2">
          <h1 className="text-2xl font-bold px-5">Order Summary</h1>
          {cartArray.map((data: any, index: any) => {
            return (
              <div className="flex justify-between items-start px-5" key={index}>
                <div className="flex items-start space-x-2">
                  <Image src={data.image} alt={data.name} className="w-[80px]" width={100} height={100} />
                  <h1 className="sm:font-bold text-sm md:text-xl mt-3">{data.name}</h1>
                </div>
                {/* Price */}
                <p className="font-bold mt-3">${data.price}</p>
              </div>
            );
          })}
          <div className="flex w-full justify-between p-5">
            <h1 className="font-bold">Total</h1>
            <h1 className="font-bold">${total}</h1>
          </div>
        </div>
      )}

      {/* Shipping Form */}
      <div className="rounded-[20px] border p-5 w-full lg:w-[50%]">
        <h1 className="text-2xl font-bold mb-4">Shipping Details</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Address Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Shipping Address Field */}
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your shipping address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Place Order
            </Button>
            {/* toastify */}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </form>
        </Form>
      </div>
    </div>
    </main>
  );
}

export default Checkout;





// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { client } from "@/sanity/lib/client";
// import { Bounce, toast, ToastContainer } from "react-toastify";
// import { BreadcrumbCollapsed } from "@/components/Breadcrupm";

// const formSchema = z.object({
//   fullName: z.string().min(1, "Full name is required").max(100, "Name is too long"),
//   email: z.string().email("Invalid email address"),
//   shippingAddress: z.string().min(1, "Shipping address is required"),
//   phoneNumber: z.string().regex(/\d{10,}/, "Phone number must be at least 10 digits"),
//   cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
//   expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry format (MM/YY)"),
//   cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
// });

// type FormdType = z.infer<typeof formSchema>;

// function Checkout() {
//   const cartArray = useSelector((state: { cart: any[] }) => state.cart);
//   const [step, setStep] = useState(1);

//   const total = cartArray.reduce((total, item) => {
//     const discountedPrice = item.discount ? item.price - (item.price * item.discount) / 100 : item.price;
//     return total + discountedPrice * item.qty;
//   }, 0);

//   const form = useForm<FormdType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       fullName: "",
//       email: "",
//       shippingAddress: "",
//       phoneNumber: "",
//       cardNumber: "",
//       expiryDate: "",
//       cvv: "",
//     },
//   });

//   async function onSubmit(values: FormdType) {
//     try {
//       const shippingForm = await client.create({
//         _type: "shippingForm",
//         fullName: values.fullName,
//         email: values.email,
//         shippingAddress: values.shippingAddress,
//         phoneNumber: values.phoneNumber,
//       });

//       await client.create({
//         _type: "orders",
//         shippingForm: { _ref: shippingForm._id },
//         products: cartArray.map(({ name, price, qty }) => ({ name, price, qty })),
//       });

//       toast.success("Order placed successfully!");
//       form.reset();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Failed to place the order. Please try again.");
//     }
//   }

//   return (
//     <main className="mt-24 lg:mt-36">
//       <BreadcrumbCollapsed />
//       <div className="flex flex-col p-5 items-center">
//         {step === 1 && (
//           <div className="w-full lg:w-[50%] border p-5 rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Billing & Shipping</h1>
//             <Input placeholder="Full Name" {...form.register("fullName")} />
//             <Input placeholder="Email" {...form.register("email")} />
//             <Input placeholder="Shipping Address" {...form.register("shippingAddress")} />
//             <Input placeholder="Phone Number" {...form.register("phoneNumber")} />
//             <Button className="w-full mt-4" onClick={() => setStep(2)}>Next</Button>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="w-full lg:w-[50%] border p-5 rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
//             <Input placeholder="Card Number" {...form.register("cardNumber")} />
//             <Input placeholder="Expiry Date (MM/YY)" {...form.register("expiryDate")} />
//             <Input placeholder="CVV" {...form.register("cvv")} />
//             <div className="flex justify-between mt-4">
//               <Button onClick={() => setStep(1)}>Back</Button>
//               <Button onClick={() => setStep(3)}>Next</Button>
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="w-full lg:w-[50%] border p-5 rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
//             {cartArray.map((data, index) => (
//               <div key={index} className="flex justify-between">
//                 <Image src={data.image} alt={data.name} width={50} height={50} />
//                 <p>{data.name}</p>
//                 <p>${data.price}</p>
//               </div>
//             ))}
//             <h2 className="text-xl font-bold">Total: ${total}</h2>
//             <div className="flex justify-between mt-4">
//               <Button onClick={() => setStep(2)}>Back</Button>
//               <Button onClick={form.handleSubmit(onSubmit)}>Place Order</Button>
//             </div>
//           </div>
//         )}

//         <ToastContainer autoClose={5000} hideProgressBar transition={Bounce} />
//       </div>
//     </main>
//   );
// }

// export default Checkout;










// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { client } from "@/sanity/lib/client";
// import { Bounce, toast, ToastContainer } from "react-toastify";
// import { BreadcrumbCollapsed } from "@/components/Breadcrupm";

// // Extended form schema
// const formSchema = z.object({
//   // Step 1: Shipping
//   fullName: z.string().min(1, "Full name is required"),
//   email: z.string().email("Invalid email address"),
//   shippingAddress: z.string().min(1, "Shipping address required"),
//   phoneNumber: z.string().regex(/^\d{10,}$/, "Phone number must be at least 10 digits"),

//   // Step 2: Billing
//   billingAddress: z.string().min(1, "Billing address required"),
  
//   // Step 3: Payment
//   cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
//   expDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY format"),
//   cvc: z.string().regex(/^\d{3}$/, "Invalid CVC")
// });

// type FormType = z.infer<typeof formSchema>;

// function Checkout() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const cartArray = useSelector((state: { cart: Array<{ 
//     name: string; 
//     price: number; 
//     discount: number; 
//     qty: number; 
//     image: string 
//   }> }) => state.cart);

//   const form = useForm<FormType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       fullName: "",
//       email: "",
//       shippingAddress: "",
//       phoneNumber: "",
//       billingAddress: "",
//       cardNumber: "",
//       expDate: "",
//       cvc: ""
//     }
//   });

//   const total = cartArray.reduce((total, item) => {
//     const price = item.discount > 0 ? 
//       item.price * (1 - item.discount / 100) : item.price;
//     return total + price * item.qty;
//   }, 0);

//   const handleNext = async () => {
//     const fields = currentStep === 1 ? ['fullName', 'email', 'shippingAddress', 'phoneNumber'] :
//                    currentStep === 2 ? ['billingAddress'] : [];
//     const isValid = await form.trigger(fields as any);
//     if (isValid) setCurrentStep(prev => Math.min(prev + 1, 3));
//   };

//   const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

//   const onSubmit = async (data: FormType) => {
//     try {
//       // Create shipping form with last 4 digits of card
//       const shippingForm = await client.create({
//         _type: "shippingForm",
//         fullName: data.fullName,
//         email: data.email,
//         shippingAddress: data.shippingAddress,
//         phoneNumber: data.phoneNumber,
//         billingAddress: data.billingAddress,
//         cardLast4: data.cardNumber.slice(-4)
//       });

//       // Create order with products
//       await client.create({
//         _type: "orders",
//         shippingForm: { _ref: shippingForm._id },
//         products: cartArray.map(product => ({
//           name: product.name,
//           price: product.price,
//           qty: product.qty
//         }))
//       });

//       toast.success("Order placed successfully!", {
//         position: "bottom-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });
      
//       form.reset();
//     } catch (error: any) {
//       console.error("Sanity error:", error);
//       const errorMessage = error.message || "Failed to place order. Please try again.";
//       toast.error(errorMessage, {
//         position: "bottom-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });
//     }
//   };

//   return (
//     <main className="mt-24 lg:mt-36">
//       <BreadcrumbCollapsed/>
//       <div className="flex flex-col md:flex-row space-y-5 sm:space-y-0 p-5 justify-center items-start lg:space-x-6">
//         {/* Order Summary (keep existing) */}

//         <div className="rounded-[20px] border p-5 w-full lg:w-[50%]">
//           <div className="flex gap-4 mb-6">
//             <Button 
//               variant={currentStep === 1 ? "default" : "outline"} 
//               className="rounded-full w-8 h-8 p-0"
//             >1</Button>
//             <Button 
//               variant={currentStep === 2 ? "default" : "outline"} 
//               className="rounded-full w-8 h-8 p-0"
//             >2</Button>
//             <Button 
//               variant={currentStep === 3 ? "default" : "outline"} 
//               className="rounded-full w-8 h-8 p-0"
//             >3</Button>
//           </div>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//               {/* Step 1: Shipping */}
//               {currentStep === 1 && (
//                 <>
//                   <FormField
//                     name="fullName"
//                     control={form.control}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Full Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="John Doe" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     name="email"
//                     control={form.control}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input placeholder="john@example.com" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     name="shippingAddress"
//                     control={form.control}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Shipping Address</FormLabel>
//                         <FormControl>
//                           <Input placeholder="123 Main Street" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     name="phoneNumber"
//                     control={form.control}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Phone Number</FormLabel>
//                         <FormControl>
//                           <Input placeholder="0987654321" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </>
//               )}

//               {/* Step 2: Billing */}
//               {currentStep === 2 && (
//                 <FormField
//                   name="billingAddress"
//                   control={form.control}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Billing Address</FormLabel>
//                       <FormControl>
//                         <Input placeholder="456 Business Avenue" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               )}

//               {/* Step 3: Payment */}
//               {currentStep === 3 && (
//                 <>
//                   <FormField
//                     name="cardNumber"
//                     control={form.control}
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Card Number</FormLabel>
//                         <FormControl>
//                           <Input placeholder="4242424242424242" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <div className="flex gap-4">
//                     <FormField
//                       name="expDate"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem className="flex-1">
//                           <FormLabel>Expiration</FormLabel>
//                           <FormControl>
//                             <Input placeholder="MM/YY" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       name="cvc"
//                       control={form.control}
//                       render={({ field }) => (
//                         <FormItem className="flex-1">
//                           <FormLabel>CVC</FormLabel>
//                           <FormControl>
//                             <Input placeholder="123" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </>
//               )}

//               <div className="flex gap-4 justify-between">
//                 {currentStep > 1 && (
//                   <Button 
//                     type="button" 
//                     variant="outline" 
//                     onClick={handleBack}
//                     className="flex-1"
//                   >
//                     Back
//                   </Button>
//                 )}
                
//                 {currentStep < 3 ? (
//                   <Button 
//                     type="button" 
//                     onClick={handleNext}
//                     className="flex-1"
//                   >
//                     Next
//                   </Button>
//                 ) : (
//                   <Button 
//                     type="submit" 
//                     className="flex-1"
//                   >
//                     Place Order
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//       <ToastContainer position="bottom-right" />
//     </main>
//   );
// }

// export default Checkout;