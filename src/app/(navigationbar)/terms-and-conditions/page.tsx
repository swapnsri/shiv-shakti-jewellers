import Contact from "@/app/contact/page";
import React from "react";

export default function TermsAndConditions() {
  return (
    <div>
      <h1 className="text-center text-4xl text-[var(--brand-color1)] p-[50px] bg-[var(--brand-color2-900)] ">
        Terms and conditions
      </h1>
      <div className="p-10 text-center">
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] mb-[20px] ">
            Design Consultation
          </h3>
          <p>
            The custom design process begins with an initial consultation.
            During this meeting, we will discuss design ideas, materials (gold,
            diamond, silver, etc.), budget, and timelines.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Deposit and Payment
          </h3>
          <p>
            A non-refundable deposit of [X%] of the estimated total cost is
            required to initiate the design process. This deposit covers design
            time and materials. The remaining balance is due upon completion of
            the piece, before shipment or in-store pick-up. For orders over a
            certain amount (e.g., high-value diamond pieces), a payment plan may
            be discussed. However, the final product will not be delivered until
            full payment is received.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Design Approval and Production
          </h3>
          <p>
            Hallmark certification is a guarantee of purity and authenticity in
            gold jewelry. We ensure that all our gold products are hallmarked.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            What is a diamond card?
          </h3>
          <p>
            A diamond card is an authenticity certificate that guarantees the
            quality and characteristics of the diamond, such as its cut, color,
            clarity, and carat.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            How can I place an order?
          </h3>
          <p>
            You can place an order directly through our website or visit our
            store in person.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Do you offer international shipping?
          </h3>
          <p>No, we do not offer international shipping.</p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            What are the payment options available?
          </h3>
          <p>
            We accept all major credit/debit cards, UPI, net banking, and cash
            on delivery for local orders.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            How long does it take to receive my order?
          </h3>
          <p>
            Delivery times depend on your location and the type of jewelry
            ordered. Customized pieces may take longer. Typically, delivery is
            within 7–10 business days.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Can I request a custom design?
          </h3>
          <p>
            Absolutely! We specialize in custom jewelry designs. Contact us with
            your ideas, and we’ll create a unique piece for you.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Do you provide repair services?
          </h3>
          <p>
            Yes, we offer jewelry repair services for all types of jewelry,
            including resizing, polishing, and stone replacement.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Can you help with cleaning and polishing jewelry?
          </h3>
          <p>
            Yes, we offer professional cleaning and polishing services to keep
            your jewelry looking its best.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Are your diamonds certified?
          </h3>
          <p>
            Yes, all our diamonds come with a certification of authenticity,
            detailing the quality and characteristics of the diamond.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Are your diamonds certified?
          </h3>
          <p>
            Yes, all our diamonds come with a certification of authenticity,
            detailing the quality and characteristics of the diamond.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Where is your store located?
          </h3>
          <p>
            We are located at Shiv Shakti Jewellers, 182, behind bata,
            Majorganj, Khairabad, Sultanpur, Uttar Pradesh 228001. Visit us
            anytime during our business hours!
          </p>
        </div>
      </div>
      <Contact />
    </div>
  );
}
