"use client";

import { useState, FormEvent } from "react";
import { Sparkles, ArrowLeft, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

type FormData = {
  name: string;
  email: string;
  business: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  business: "",
  service: "",
  budget: "",
  timeline: "",
  description: "",
};

export default function ProjectPlanner() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In production, send this to an API/email service
    console.log("Project Planner Submission:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">
            You&apos;re All Set!
          </h1>
          <p className="mb-8 text-gray-500">
            Thank you, {form.name}! We&apos;ve received your project details and
            our team will reach out to <strong>{form.email}</strong> shortly.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold leading-tight text-gray-900">
                Project Planner
              </h1>
              <p className="text-xs text-gray-500">Tell us about your vision</p>
            </div>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Let&apos;s Build Something Great
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill out the details below and our team will get back to you with
              a tailored plan. Every project is unique — and so is our approach.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-gray-400"
                />
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label
                htmlFor="business"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Business / Ministry Name
              </label>
              <input
                id="business"
                name="business"
                type="text"
                value={form.business}
                onChange={handleChange}
                placeholder="Your organization name"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-gray-400"
              />
            </div>

            {/* Service & Budget */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="service"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Service Needed <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={form.service}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-400"
                >
                  <option value="">Select a service</option>
                  <option value="genesis-build">
                    Genesis Build — Full Website/App
                  </option>
                  <option value="kingdom-builder">
                    Kingdom Builder — Growth & SEO
                  </option>
                  <option value="ai-automation">
                    AI & Automation — Chatbots & Tools
                  </option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Estimated Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-400"
                >
                  <option value="">Select range</option>
                  <option value="under-1k">Under $1,000</option>
                  <option value="1k-5k">$1,000 – $5,000</option>
                  <option value="5k-15k">$5,000 – $15,000</option>
                  <option value="15k-plus">$15,000+</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label
                htmlFor="timeline"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Desired Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-gray-400"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP — As soon as possible</option>
                <option value="1-month">Within 1 month</option>
                <option value="1-3-months">1 – 3 months</option>
                <option value="3-plus">3+ months / Flexible</option>
              </select>
            </div>

            {/* Project Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Tell Us About Your Project{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={5}
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your vision, goals, and any specific requirements..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-gray-400"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              <Send className="h-4 w-4" />
              Submit Project Planner
            </button>

            <p className="text-center text-xs text-gray-400">
              We&apos;ll review your submission and respond within 24 hours.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
