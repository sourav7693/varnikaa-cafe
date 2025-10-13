import SubBanner from "@/components/global/SubBanner";
import MainTemplate from "@/templates/MainTemplate";

const page = () => {
  const data = [
    {
      heading: "1. General Terms",
      details: `
           ○ Varnikaa Cafe is an online takeaway and delivery service available only within
Siliguri. <br />
○ We reserve the right to modify or update these terms at any time. Any changes
will be effective immediately upon posting on the website.<br />
○ Customers must be at least 18 years old to place an order or have the consent of
a parent or guardian.
        `,
    },
    {
      heading: "2. Orders and Payment",
      details: `
           ○ All orders placed through our website are subject to availability and confirmation.  <br />
○ The payment for all orders must be completed using Razorpay, our integrated
payment gateway. We accept credit cards, debit cards, and UPI payments.  <br />
○ By placing an order, you authorize us to charge the applicable order amount to
your chosen payment method.
        `,
    },
    {
      heading: "3. Delivery",
      details: `
           ○ We offer delivery services within the Siliguri region. <br />
○ Delivery times may vary based on location, order size, and time of day. Estimated
delivery time will be displayed at checkout. <br />
○ If the delivery address is incorrect or inaccessible, we may cancel the order or
request a change in delivery instructions.

        `,
    },
    {
      heading: "4. Pricing and Charges",
      details: `
           ○ All prices listed on the website are final unless there is a system error or
mispricing, in which case we may cancel or adjust the order.<br />
○ Delivery charges may apply based on the order amount or delivery location.
        `,
    },
    {
      heading: "5.  Privacy and Data Protection",
      details: `
           ○ Your privacy is important to us. Please refer to our Privacy Policy for details
about how we collect and protect your data.
        `,
    },
    {
      heading: "6. Limitation of Liability",
      details: `
           ○ Varnikaa Cafe is not liable for any indirect, incidental, or consequential damages
arising from the use of our services. <br />
○ We make no representations or warranties regarding the quality or safety of food
items
        `,
    },
    {
      heading: "7. Governing Law",
      details: `
           ○ These Terms & Conditions are governed by the laws of India. Any disputes will
be resolved in the courts located in Siliguri.
        `,
    },
  ];
  return (
    <MainTemplate>
      <SubBanner heading="Terms and Conditions" />
      <div className="self-padding">
        <h1 className="text-xl text-defined-darkbrown font-semibold mb-4">
          Welcome to Varnikaa Cafe! By using our online takeaway and delivery
          services, you agree to comply with and be bound by the following Terms
          & Conditions. Please read them carefully.
        </h1>
        <div className="flex flex-col gap-6 mb-8">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h2 className="text-defined-darkbrown font-semibold text-lg">
                {item.heading}
              </h2>
              <p
                dangerouslySetInnerHTML={{ __html: item.details }}
                className="text-defined-brown font-semibold text-justify"
              ></p>
            </div>
          ))}
        </div>
      </div>
    </MainTemplate>
  );
};

export default page;
