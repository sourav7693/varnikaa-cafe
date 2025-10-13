import SubBanner from "@/components/global/SubBanner";
import MainTemplate from "@/templates/MainTemplate";

const page = () => {
  const data = [
    {
      heading: "1. Information We Collect",
      details: `
           ○ We collect personal information such as your name, contact details, delivery
address, and payment details when you place an order. <br />
○ We may also collect non-personal information like your IP address, device type,
and browsing behavior through cookies.
        `,
    },
    {
      heading: "2. How We Use Your Information",
      details: `
           ○ The personal information you provide will be used to process and fulfill your
orders, communicate with you about your order, and provide customer support. <br />
○ We may also use your information to improve our website, products, and
services.
        `,
    },
    {
      heading: "3. Payment Processing",
      details: `
          ○ Payments are processed securely through Razorpay. We do not store your
payment information on our servers. Razorpay’s privacy policy governs the
handling of your payment information.
        `,
    },
    {
      heading: "4. Data Sharing",
      details: `
          ○ We do not share your personal information with third parties unless required to
fulfill your order or as required by law.
        `,
    },
    {
      heading: "5. Data Security",
      details: `
          ○ We take reasonable measures to protect your personal data, including using
encryption and secure payment systems.
        `,
    },
    {
      heading: "6. Cookies",
      details: `
          ○ Our website uses cookies to enhance your browsing experience. You can adjust
your browser settings to reject cookies, but this may affect your ability to use
certain features of our website.
        `,
    },
    {
      heading: "7. Your Rights",
      details: `
          ○ You have the right to request access to your personal data, correct inaccuracies,
or delete your data, subject to certain legal conditions
        `,
    },
    {
      heading: "8. Changes to this Privacy Policy",
      details: `
          ○ We may update this Privacy Policy from time to time. Any changes will be posted
on this page with an updated date.
        `,
    },
  ];
  return (
    <MainTemplate>
      <SubBanner heading="Privacy Policy" />
      <div className="self-padding">
        <h1 className="text-xl text-defined-darkbrown font-semibold mb-4">
          At Varnikaa Cafe, we are committed to protecting your privacy and
          ensuring a safe online experience. This Privacy Policy outlines how we
          collect, use, and protect your personal information.
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
