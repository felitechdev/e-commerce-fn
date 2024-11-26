import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/pageProps/Breadcrumbs";
import PageLayout from "../components/designLayouts/PageLayout";

const RefundPolicy = () => {
  const location = useLocation();

  return (
    <PageLayout showFooter={false}>
      <div className="mx-auto max-w-container px-4 text-center">
        <div className="m-2 bg-primary !text-2xl text-white">
          {" "}
          <Breadcrumbs title="Refund Policy" prevLocation={location.pathname} />
        </div>
        <div className="m-auto max-w-[800px] text-left text-base text-lightText">
          <p className="mb-6 text-center">
            At Feli Express, customer satisfaction is our priority. If you are
            not entirely satisfied with your purchase, we’re here to help.
            Eligibility for Refunds:
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold">1. Return Window:</h2>
              <p>
                Items can be returned for a refund within{" "}
                <strong>[Insert Duration, e.g., 14 days]</strong>
                from the delivery date.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">2. Condition of Items:</h2>
              <p>
                Items must be unused, in their original packaging, and in the
                same condition that you received them.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">
                3. Non-Refundable Items:
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  Certain items, such as perishable goods, customized products,
                  and digital downloads, are non-refundable.
                </li>
                <li>
                  Sale items are eligible for refunds only at the sale price.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Refund Process</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">1. Initiating a Return:</h3>
                  <p>
                    Contact our support team at{" "}
                    <strong>[Insert Email/Phone]</strong> with your order number
                    and the reason for return.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">2. Inspection:</h3>
                  <p>
                    Once we receive your returned item, we will inspect it and
                    notify you of the status of your refund.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">3. Approval and Processing:</h3>
                  <p>
                    If approved, the refund will be processed to your original
                    payment method within
                    <strong>[Insert Duration, e.g., 7–10 business days]</strong>
                    .
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Shipping Costs</h2>
              <ul className="list-disc pl-5">
                <li>Shipping costs are non-refundable.</li>
                <li>
                  If a return is due to an error on our part (e.g., wrong or
                  defective item), we will cover the shipping costs.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Exchanges</h2>
              <p>
                Exchanges are allowed for defective or damaged items. Please
                contact us for assistance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold">Contact Us</h2>
              <p>
                If you have any questions regarding this policy, please reach
                out to us at <strong>[Insert Contact Details]</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RefundPolicy;
