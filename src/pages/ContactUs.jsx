import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Technical Support",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, subject, message } = formData;

    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:mdshahidarzoo39@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-500/5";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Heading */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-600">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Contact & Support
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Let's make things
            <span className="block text-red-600">easier for you.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            Have a question about our PDF tools? Need technical help or want to
            share an idea? Send us a message.
          </p>
        </header>

        {/* Main layout */}
        <div className="mt-12 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_70px_-35px_rgba(15,23,42,0.18)] lg:mt-16 lg:grid-cols-5">
          {/* Left panel */}
          <aside className="relative overflow-hidden bg-slate-950 p-7 text-white sm:p-10 lg:col-span-2 lg:p-12">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                Get in touch
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight">
                We're here to help.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Your feedback helps us make our PDF tools more useful, reliable,
                and easier to use.
              </p>

              <div className="mt-10 space-y-7">
                {/* Email */}
                <a
                  href="mailto:mdshahidarzoo39@gmail.com"
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-red-400 transition group-hover:border-red-500/40 group-hover:bg-red-500/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      Email us
                    </span>
                    <span className="mt-1 block break-all text-sm text-slate-400 transition group-hover:text-white">
                      mdshahidarzoo39@gmail.com
                    </span>
                  </span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+919631638622"
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-red-400 transition group-hover:border-red-500/40 group-hover:bg-red-500/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.2 4.2 2 2 0 0 1 4.2 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2Z" />
                    </svg>
                  </span>

                  <span>
                    <span className="block text-sm font-semibold">Call us</span>
                    <span className="mt-1 block text-sm text-slate-400 transition group-hover:text-white">
                      +91 9631638622
                    </span>
                  </span>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-red-400">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>

                  <span>
                    <span className="block text-sm font-semibold">
                      Location
                    </span>
                    <span className="mt-1 block text-sm text-slate-400">
                      Delhi, India
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-12 border-t border-white/10 pt-6">
                <p className="text-sm font-medium text-slate-300">
                  What can we help with?
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "Technical Support",
                    "Bug Reports",
                    "Feature Requests",
                    "Feedback",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right panel: contact form */}
          <section className="p-7 sm:p-10 lg:col-span-3 lg:p-12">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Send us a message
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Fill out the form below. Your default email application will
                open with your message ready to send.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Your name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      autoComplete="name"
                      maxLength={100}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Email address
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      maxLength={254}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-semibold text-slate-700"
                  >
                    What can we help with?
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Technical Support</option>
                    <option>Report a Bug</option>
                    <option>Feature Request</option>
                    <option>General Feedback</option>
                    <option>Business Collaboration</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Your message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    maxLength={5000}
                    required
                    className={`${inputClass} resize-y`}
                  />

                  <p className="mt-2 text-right text-xs text-slate-400">
                    {formData.message.length}/5000 characters
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-600/15 transition hover:-translate-y-0.5 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20 sm:w-auto"
                >
                  Send Message
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </button>

                <p className="text-xs leading-5 text-slate-400">
                  This form opens your email application. It does not send
                  messages directly from the website.
                </p>
              </form>
            </div>
          </section>
        </div>

        {/* Footer note */}
        <footer className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            Have a great idea?{" "}
            <a
              href="mailto:mdshahidarzoo39@gmail.com?subject=PDF%20Tool%20Feature%20Suggestion"
              className="font-semibold text-red-600 underline-offset-4 hover:underline"
            >
              We'd love to hear it.
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
};

export default ContactUs;
