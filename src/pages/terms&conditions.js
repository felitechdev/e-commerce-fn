import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/pageProps/Breadcrumbs";
import PageLayout from "../components/designLayouts/PageLayout";
const TermsAndConditions = () => {
  const location = useLocation();

  return (
    <PageLayout showFooter={false}>
      <div className="mx-auto max-w-container px-4 text-center">
        <div className="m-2 bg-primary !text-2xl text-white">
          {" "}
          <Breadcrumbs
            title="Terms & Conditions"
            prevLocation={location.pathname}
          />
        </div>
        <div className="m-auto mb-8 max-w-[800px] text-left text-base text-lightText">
          {/* <h1 className="mb-6 text-center text-2xl font-bold text-primeColor">
            Terms & Conditions
          </h1> */}
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold">1. Introduction</h2>
              <p>
                These Terms and Conditions govern the use of the Feli Express
                e-commerce platform. By accessing or using our platform, you
                agree to comply with and be bound by these terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">2. Account Registration</h2>
              <ul className="list-disc pl-5">
                <li>
                  <strong>User Account:</strong> Users are required to create an
                  account to access certain features of the platform. You must
                  provide accurate information during registration and keep your
                  account details secure.
                </li>
                <li>
                  <strong>Eligibility:</strong> Users must be at least 18 years
                  old to register and use the platform.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                3. Purchase and Payments
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Product Listings:</strong> Feli Express offers a wide
                  range of products from various sellers. Prices, availability,
                  and descriptions are subject to change without notice.
                </li>
                <li>
                  <strong>Order Process:</strong> Users can place orders through
                  the platform. Once an order is placed, you will receive a
                  confirmation email with the details.
                </li>
                <li>
                  <strong>Payment Methods:</strong> We accept multiple payment
                  methods, including credit/debit cards, bank transfers, and
                  mobile payments. Payment is required at the time of purchase.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                4. Shipping and Delivery
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Shipping Options:</strong> Feli Express provides
                  various shipping options, which will be displayed at checkout.
                  Delivery times may vary depending on the selected method and
                  location.
                </li>
                <li>
                  <strong>Delivery Responsibility:</strong> While we strive to
                  deliver orders promptly, Feli Express is not liable for delays
                  caused by factors beyond our control, such as shipping carrier
                  issues or customs delays.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">5. Returns and Refunds</h2>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Return Policy:</strong> Products may be returned
                  within a specified period, as detailed in our return policy.
                  Items must be in their original condition, with all packaging
                  and tags intact.
                </li>
                <li>
                  <strong>Refund Process:</strong> Refunds will be issued after
                  the returned product is received and inspected. Refunds are
                  processed through the original payment method and may take
                  several business days.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">6. User Conduct</h2>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Prohibited Activities:</strong> Users are prohibited
                  from using the platform for unlawful activities, including but
                  not limited to fraud, harassment, or infringement of
                  intellectual property rights.
                </li>
                <li>
                  <strong>Content Submission:</strong> Users may submit reviews,
                  comments, and other content. You agree not to post any content
                  that is defamatory, obscene, or violates the rights of others.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                7. Seller Responsibilities
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Product Listings:</strong> Sellers must provide
                  accurate and complete information about their products,
                  including price, description, and availability.
                </li>
                <li>
                  <strong>Order Fulfillment:</strong> Sellers are responsible
                  for fulfilling orders promptly and ensuring that products meet
                  the quality standards expected by customers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">8. Privacy Policy</h2>
              <ul className="list-disc pl-5">
                <li>
                  <strong>Data Collection:</strong> Feli Express collects and
                  processes personal information as described in our Privacy
                  Policy. Your information is used to facilitate transactions,
                  improve our services, and comply with legal obligations.
                </li>
                <li>
                  <strong>Data Protection:</strong> We are committed to
                  protecting your privacy and ensuring the security of your
                  data.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermsAndConditions;
