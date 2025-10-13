import SubBanner from "@/components/global/SubBanner";
import MainTemplate from "@/templates/MainTemplate";

const page = () => {
  const data = [
    {
      heading: "1. Delivery Areas",
      details: `
           ○ We currently deliver within the Siliguri region. Please enter your address during
checkout to confirm delivery availability.
        `,
    },
    {
      heading: "2. Delivery Charges",
      details: `
           ○ Delivery charges may apply based on the order amount and delivery location.
The exact charge will be calculated and displayed at checkout. <br />
○ Orders above a certain value may qualify for free delivery. This threshold will be
communicated at checkout.
        `,
    },
    {
      heading: "3. Delivery Times",
      details: `
          ○ Delivery time depends on factors such as order size, time of day, and location.
Estimated delivery times will be shown at checkout. <br />
○ While we strive for on-time delivery, we cannot guarantee delivery times due to
traffic, weather, or unforeseen circumstances.
        `,
    },
    {
      heading: "4. Order Status",
      details: `
           ○ Once your order is confirmed, you will receive an order confirmation email with
the expected delivery time. <br />
○ You will also receive a tracking link or notification when your order is dispatched.
        `,
    },
    {
      heading: "5.   Failed Deliveries",
      details: `
           ○ In the event that we are unable to deliver your order due to incorrect address
information or failure to receive the delivery, you will not be eligible for a refund.
        `,
    },   
  ];
  return (
    <MainTemplate>
      <SubBanner heading="Shipping Policy" />
      <div className="self-padding">
        <h1 className="text-xl text-defined-darkbrown font-semibold mb-4">
          At Varnikaa Cafe, we strive to offer efficient delivery services for
          your convenience.
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
