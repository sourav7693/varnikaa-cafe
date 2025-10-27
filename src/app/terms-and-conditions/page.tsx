import SubBanner from "@/components/global/SubBanner";
import MainTemplate from "@/templates/MainTemplate";

const page = () => {
  const data = [
    {
      heading: "1. Delivery Policy",
      details: `
           ○ Delivery is subject to availability and distance.<br />
○ Delivery charges are applicable as per location and distance.<br />
○ Customers must provide accurate address and contact details to avoid delays.
        `,
    },
    {
      heading: "2. Payment & Cash on Delivery",
      details: `
           ○ We accept Cash on Delivery (COD) for eligible orders.  <br />
○ Digital/online payment options may be offered as per availability.
        `,
    },
    {
      heading: "3. Pre-Booking & Advance Payment",
      details: `
           ○Certain items or categories (such as bulk orders, customized dishes, and special sweets) require advance booking. <br />
○ Advance payment is mandatory for bulk bookings and high-value orders.<br />
        `,
    },
    {
      heading: "4. Order Cancellation",
      details: `
           ○ Once an order is confirmed, it cannot be canceled or modified.<br />
○ Advance payments are non-refundable in case of cancellation.
        `,
    },
    {
      heading: "5.  Food Packaging & Responsibility",
      details: `
           ○ Customers must check the food packaging at the time of delivery. <br />
○ After delivery, the cafe is not responsible for damage, spillage, or spoilage.
        `,
    },
    {
      heading: "6. Bulk & Special Orders",
      details: `
           ○ Some items require prior notice (e.g., halwas, thalis, large combos).<br />
○ Orders for events, parties, or catering must be confirmed with advance payment.
        `,
    },
    {
      heading: "7. Liability",
      details: `
           ○ The cafe will not be responsible for delays due to unforeseen events (traffic, weather, or operational issues). <br />
○ Food is prepared fresh and hygienically, but once delivered, storage and consumption are the customer’s responsibility.
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
