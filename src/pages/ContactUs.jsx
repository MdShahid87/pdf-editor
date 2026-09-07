const ContactUs = () => {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
        <p className="mt-3 text-slate-600">
          Contact me directly for support, feedback, and collaboration on PDF
          tools.
        </p>

        <div className="mt-6 space-y-3 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Name:</span> Md Shahid
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            mdshahidarzoo39@gmail.com
          </p>
          <p>
            <span className="font-semibold">Phone:</span> +91 9631638622
          </p>
          <p>
            <span className="font-semibold">Location:</span> Delhi, India
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Quick Contact Features
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li>Ask for help with Convert To PDF and Convert From PDF tools.</li>
          <li>Report issues in merge, split, or compress PDF workflow.</li>
          <li>Request custom features for your document process.</li>
          <li>Get a fast response for technical troubleshooting.</li>
        </ul>
      </section>
    </div>
  );
};
export default ContactUs;
