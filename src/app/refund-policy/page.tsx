import SubBanner from "@/components/global/SubBanner";
import MainTemplate from "@/templates/MainTemplate";

const page = () => {
  const data = [
    {
      heading: "1. No Refunds",
      details: `
           ○ All sales are final, and we do not offer a refund for any orders placed, regardless
of the reason.
        `,
    },
    {
      heading: "2. Cancellations",
      details: `
           ○ We cannot cancel orders once they have been confirmed and processed, as the
preparation of your order begins immediately after confirmation.
        `,
    },
    {
      heading: "3. Order Issues",
      details: `
          ○ If there is an issue with the food (e.g., incorrect items or quality issues), please
contact us immediately. We may offer to resolve the issue by sending a
replacement item or providing a credit for a future order, but we do not offer cash
refunds.
        `,
    },    
  ];
  return (
    <MainTemplate>
      <SubBanner heading="Refund Policy" />
      <div className="self-padding">
        <h1 className="text-xl text-defined-darkbrown font-semibold mb-4">
          At Varnikaa Cafe, we aim to provide high-quality food and excellent
          service. However, as we do not offer refunds once an order is placed,
          please ensure that all information is correct before completing your
          purchase.
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
