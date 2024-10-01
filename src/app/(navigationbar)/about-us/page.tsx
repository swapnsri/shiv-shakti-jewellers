import Contact from "@/app/contact/page";
import React from "react";

export default function About() {
  return (
    <>
      <h1 className="text-center text-4xl text-[var(--brand-color1)] p-[50px] bg-[var(--brand-color2-900)] ">
        About Us
      </h1>
      <div className="p-10 text-center">
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] mb-[20px] ">
            Welcome to Shiv Shakti Jewellers (SSJ)
          </h3>
          <p>
            At SSJ, we are passionate about bringing you the finest gold jewelry
            with unparalleled quality and authenticity. As a trusted name in the
            industry, our mission is to offer exquisite gold pieces that not
            only enhance your style but also come with the assurance of genuine
            certification and hallmarking.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Our Story
          </h3>
          <p>
            Founded in [Year], SSJ began with a simple vision: to provide our
            customers with premium gold jewelry that meets the highest standards
            of quality and certification. With years of experience and a deep
            understanding of the gold market, we have established ourselves as a
            reputable source for those seeking beautiful, certified, and
            BIS-accredited gold jewelry.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Commitment to Quality
          </h3>
          <p>
            Our dedication to quality is at the heart of everything we do. Each
            piece of jewelry we offer is crafted with precision and care,
            ensuring that it meets our rigorous standards. We take pride in
            offering gold that is certified by the Bureau of Indian Standards
            (BIS) and hallmarked for its purity. This commitment guarantees that
            you receive gold jewelry that is both genuine and of superior
            quality.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Our Certifications
          </h3>
          <p>
            We understand that when it comes to gold, certification matters.
            That&apos;s why all our products come with the assurance of BIS
            hallmarking, which is a testament to the purity and authenticity of
            our gold. Our certifications are a promise to you that every piece
            of jewelry you purchase from us is verified and trusted.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Why Choose Us?
          </h3>
          <ul>
            <li className="leading-6">
              <strong>Authenticity 🔍:</strong> Every piece of gold jewelry is
              BIS hallmarked, ensuring you receive genuine gold.
            </li>
            <li className="leading-6">
              <strong>Craftsmanship 🛠️:</strong> Our skilled artisans create
              jewelry that combines elegance with enduring quality.
            </li>
            <li className="leading-6">
              <strong>Customer Focus 💬:</strong> We are committed to providing
              exceptional service and a personalized experience.
            </li>
            <li className="leading-6">
              <strong>Transparency 📜:</strong> We offer clear information about
              the certification and quality of our products.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Our Promise
          </h3>
          <p>
            At Shiv Shakti Jewellers, we believe in building long-term
            relationships with our customers based on trust and satisfaction.
            Our promise is to provide you with gold jewelry that exceeds your
            expectations and stands the test of time. Whether you&apos;re
            celebrating a special occasion or simply indulging in a piece of
            luxury, we are here to make every moment memorable.
          </p>
        </div>
        <div>
          <h3 className="text-2xl text-[var(--brand-color2)] my-[20px] ">
            Visit Us
          </h3>
          <p>
            We invite you to explore our collection and experience the elegance
            and craftsmanship of our gold jewelry. For any inquiries or
            personalized assistance, feel free to contact us or visit our store.
            Thank you for choosing Shiv Shakti Jewellers - where quality meets
            excellence.
          </p>
        </div>
        <Contact />
      </div>
    </>
  );
}
