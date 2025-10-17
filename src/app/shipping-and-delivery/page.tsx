import SubBanner from "@/components/global/SubBanner";
import MainTemplate from "@/templates/MainTemplate";

const page = () => {
  const data = [
    {
      heading: "1. Delivery Areas",
      details: `
           ○ We currently offer delivery within the Siliguri region. Please ensure your address is entered correctly during checkout to confirm availability.
        `,
    },
    {
      heading: "2. Delivery Charges",
      details: `
           ○ Delivery charges may apply based on the order value and location. The exact delivery fee will be calculated and displayed at checkout. <br />
○ Orders above a specified value may qualify for free delivery, with the threshold communicated at checkout.
        `,
    },
    {
      heading: "3. Delivery Times",
      details: `
          ○ Our standard delivery time is *within 1 hour* of order confirmation. Delivery time sometimes may vary based on factors such as order size, time of day, traffic, weather and location.<br />
○ While we strive for on-time delivery, please note that delivery times cannot be guaranteed due to external factors like traffic, weather, or unforeseen circumstances.
        `,
    },
    {
      heading: "4. Order Status",
      details: `
           ○ Once your order is confirmed, you will receive a confirmation email /Whatsapp/ Call with the actual expected delivery time based on your pincode. <br />
○ Delivery Boy Details will be shared once order confirm & order out for delivery.
        `,
    },
    {
      heading: "5.   Failed Deliveries",
      details: `
           ○ In the event that we are unable to deliver your order due to incorrect address information or failure to receive the delivery, no refund will be provided.
        `,
    },
  ];
  return (
    <MainTemplate>
      <SubBanner heading="Shipping Policy" />
      <div className="self-padding">
        <h1 className="text-xl text-defined-darkbrown font-semibold mb-4">
          At Varnikaa Cafe, we are dedicated to providing efficient and timely
          delivery services to enhance your experience. Please review the
          following information:
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
