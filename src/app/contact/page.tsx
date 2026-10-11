import { Metadata } from "next";
import { ContactPage, CONTACT_FAQS_LIST } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact Nagpur Enfield Riders | NER",
  description:
    "Get in touch with Nagpur Enfield Riders (NER). Enquire about upcoming Sunday rollouts, touring formations, and joining the brotherhood from India's Zero Mile.",
  openGraph: {
    title: "Contact Nagpur Enfield Riders | NER",
    description:
      "Connect with the independent Royal Enfield touring fraternity based in Nagpur, Maharashtra.",
    url: "/contact",
    type: "website",
  },
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONTACT_FAQS_LIST.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactPage />
    </>
  );
}
