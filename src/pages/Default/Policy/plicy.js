import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../../components/designLayouts/PageLayout";

const PolicyPage = () => {
  return (
    <PageLayout showFooter={true}>
      <div className="mx-auto max-w-container px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">
          Welcome to Our Privacy Commitment
        </h1>

        <p>Last updated: March 31, 2024.</p>

        <p className="my-5">
          Welcome to FeliExpress! Your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your personal
          information when you visit or make a purchase on our platform. By
          using felExpress, you agree to the practices described in this policy.
        </p>
        <div className="space-y-6">
          <section>
            <h2 className="mg:text-3xl mb-4 text-2xl font-semibold">
              Information we collect
            </h2>
            <p className="my-4">
              At felExpress, we collect the following information to ensure a
              seamless shopping experience:
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                <strong>Personal information you provide:</strong>
              </li>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Email Address:</strong> For account creation, order
                  updates, and customer support.
                </li>
                <li>
                  <strong> Name:</strong> To personalize your experience and
                  process orders.
                </li>
                <li>
                  {" "}
                  <strong> Address: </strong> To facilitate delivery of your
                  purchases.
                </li>
              </ul>

              <li>
                <strong>Automatically collected information:</strong>
              </li>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Location:</strong> To optimize our services and
                  provide relevant content.
                </li>
                <li>
                  <strong>Browser Type and Device Type:</strong> To ensure
                  compatibility and enhance your browsing experience.
                </li>
              </ul>

              <li>
                <strong>Cookies for authentication:</strong>

                <ul className="list-disc space-y-2 pl-6">
                  <li>We use cookies solely for authentication purposes.</li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mg:text-3xl mb-4 text-2xl font-semibold">
              How we use the information we collect
            </h2>
            <p className="my-4">
              {" "}
              At felExpress, we use the information we collect for the following
              purposes:
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                <strong>To provide and improve our services:</strong>

                <ul className="list-disc space-y-2 pl-6">
                  <li>Process your orders and manage your account.</li>
                  <li>Deliver your purchases to your specified address.</li>
                  <li>
                    Enhance your shopping experience by understanding your
                    preferences.
                  </li>
                </ul>
              </li>
              <li>
                <strong>To communicate with you:</strong>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Send order confirmations and updates.</li>
                  <li>Respond to your inquiries or support requests.</li>
                </ul>
              </li>
              <li>
                <strong>To ensure security and authentication:</strong>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mg:text-3xl mb-4 text-2xl font-semibold">
              Data security
            </h2>
            <p className="my-4">
              At felExpress, we priotize the protection of your personal
              information and take several measures to secure it:
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                <strong>Encryption:</strong>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    We use industry-standard encryption (SSL/TLS) to safeguard
                    sensitive data, such as payment information, during
                    transmission.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Secure authentication:</strong>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    We employ secure authentication mechanisms to protect your
                    account and ensure that only authorized users can access
                    their information.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Access control:</strong>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Access to personal is restricted to authorized personnel
                    only, and we continuously review our security practices.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Regular security audits:</strong>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    We conduct regular security audits to ensure our systems
                    remain secure and up to date.
                  </li>
                </ul>
              </li>

              <p className="my-4">
                {" "}
                While we implement these security measures, please be aware that
                no method of online transmission or storage is completely
                secure.
              </p>
            </ol>
          </section>

          <section>
            <h2 className="mg:text-3xl mb-4 text-2xl font-semibold">
              User Rights
            </h2>

            <p className="my-4">
              {" "}
              You have certain rights regarding your personal information under
              applicable data protection laws. These include:{" "}
            </p>
            <ol className="list-decimal space-y-2 pl-6">
              <li>
                <strong>Accessing your information:</strong>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    You can request access to the personal information we hold
                    about you.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Updating or correcting your information:</strong>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    If any of your personal details are inaccurate or
                    incomplete, you can update them at any time.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Deleting your information:</strong>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    You have the right to request the deletion of your personal
                    information, subject to certain legal obligations we may
                    have to retain it.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Data portability:</strong>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    You have the right to request a copy of your personal
                    information in a structured, commonly used format.
                  </li>
                </ul>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mg:text-3xl mb-4 text-2xl font-semibold">
              Contact Information
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please visit our
              <Link className="px-1 text-primary underline" to="/contact">
                Contact
              </Link>
              Us page for more information.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default PolicyPage;
