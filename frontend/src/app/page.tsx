
'use client';

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
  <div className="bg-white dark:bg-[#18181b] rounded-xl shadow-md p-6 w-72 flex flex-col items-center border border-gray-100 dark:border-gray-800 transform transition-transform hover:scale-105 hover:shadow-xl">
      <div className="mb-3">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#6366F1" opacity="0.1"/><path d="M8 12h8M12 8v8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <h3 className="font-semibold text-lg mb-2 text-foreground">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function UseCaseCard({ title, desc }: { title: string; desc: string }) {
  return (
  <div className="bg-white dark:bg-[#18181b] rounded-xl shadow-md p-6 flex flex-col items-center border border-gray-100 dark:border-gray-800 transform transition-transform hover:scale-105 hover:shadow-xl">
      <h4 className="font-semibold text-lg mb-2 text-foreground">{title}</h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, role, text }: { name: string; role: string; text: string }) {
  return (
    <div className="bg-white dark:bg-[#18181b] rounded-xl shadow-md p-6 flex flex-col items-center border border-gray-100 dark:border-gray-800">
      <div className="mb-3">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#6366F1" opacity="0.1"/><path d="M8 12h8M12 8v8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/></svg>
      </div>
      <p className="italic text-gray-700 dark:text-gray-300 mb-2">"{text}"</p>
      <div className="text-sm text-gray-500">- {name}, {role}</div>
    </div>
  );
}

function PricingCard({ plan, price, features }: { plan: string; price: string; features: string[] }) {
  return (
  <div className="bg-white dark:bg-[#18181b] rounded-xl shadow-md p-8 flex flex-col items-center border border-gray-100 dark:border-gray-800 w-full md:w-80 transform transition-transform hover:scale-105 hover:shadow-xl">
      <h3 className="font-bold text-xl mb-2 text-foreground">{plan}</h3>
      <div className="text-3xl font-extrabold mb-4 text-blue-600">{price}</div>
      <ul className="mb-6 text-gray-600 dark:text-gray-400 text-sm list-disc list-inside">
        {features.map(f => <li key={f}>{f}</li>)}
      </ul>
  <a href="/auth/signup" className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition animate-glow">{plan === 'Free' ? 'Get Started' : plan === 'Pro' ? 'Start Pro' : 'Contact Sales'}</a>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <div className="font-semibold text-foreground mb-1">Q: {q}</div>
      <div className="text-gray-600 dark:text-gray-400 mb-2">A: {a}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-100 dark:from-[#0a0a0a] dark:to-[#171717]">
      <header className="w-full py-6 px-8 flex justify-between items-center border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 bg-gradient-to-br from-blue-50/80 to-purple-100/80 dark:from-[#0a0a0a]/80 dark:to-[#171717]/80 backdrop-blur shadow-md transition-shadow">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#6366F1"/><text x="16" y="22" textAnchor="middle" fontSize="16" fill="#fff" fontFamily="Arial" fontWeight="bold">M</text></svg>
          <span className="font-bold text-xl tracking-tight text-foreground">Marvedge Tours</span>
        </div>
        <nav className="flex gap-6">
          <a href="#features" className="hover:underline text-foreground">Features</a>
          <a href="#demo" className="hover:underline text-foreground">Demo</a>
          <a href="#auth" className="hover:underline text-foreground">Sign In</a>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center text-center px-4 py-16 relative">
        {/* Hero SVG Wave */}
        <svg className="absolute top-0 left-0 w-full h-32 -z-10" viewBox="0 0 1440 320"><path fill="#6366F1" fillOpacity="0.08" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
  <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text animate-fadein">Create & Share Interactive Product Tours</h1>
        <p className="text-lg sm:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8">Showcase your product with collaborative, step-by-step demos. Upload screenshots, record your screen, and annotate your workflow—all in one place.</p>
  <a href="/auth/signup" className="inline-block px-8 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition mb-8 animate-glow">Get Started</a>

        {/* Features Section */}
  <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-center items-center mt-8 mb-24 fadein-section" id="features">
          <FeatureCard title="Easy Tour Creation" desc="Upload images or record your screen, then add steps and highlights visually." />
          <FeatureCard title="Collaborative Editing" desc="Edit, annotate, and preview your tours with a smooth, interactive UI." />
          <FeatureCard title="Share & Analyze" desc="Publish tours as public or private links and view analytics (mocked)." />
          <FeatureCard title="Role-Based Access" desc="Control who can view or edit your tours with user roles and permissions." />
          <FeatureCard title="Secure Authentication" desc="Sign up, log in, and manage your sessions securely with JWT and database-backed sessions." />
          <FeatureCard title="Screen Recording" desc="Capture your workflow directly in the browser with our built-in screen recorder." />
          <FeatureCard title="Mobile Friendly" desc="Create and view tours on any device with a responsive, modern UI." />
        </div>

        {/* Use Cases Section */}
        <section className="w-full max-w-5xl mx-auto mb-32">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <UseCaseCard title="Product Onboarding" desc="Guide new users through your app with interactive, step-by-step tours." />
            <UseCaseCard title="Employee Training" desc="Create training modules for your team to learn new features and workflows." />
            <UseCaseCard title="Customer Support" desc="Help users solve common issues with visual, self-serve walkthroughs." />
            <UseCaseCard title="Feature Announcements" desc="Showcase new features to your users with engaging, in-app demos." />
            <UseCaseCard title="Sales Demos" desc="Create reusable product demos for sales teams to share with prospects." />
            <UseCaseCard title="QA & Testing" desc="Document test cases and bug reproduction steps visually for your dev team." />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full max-w-5xl mx-auto mb-32">
          <h2 className="text-3xl font-bold mb-8 text-foreground">What Our Users Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <TestimonialCard name="Priya S." role="Product Manager" text="Marvedge Tours made onboarding new users a breeze. The visual editor is fantastic!" />
            <TestimonialCard name="Alex R." role="Customer Success" text="We reduced support tickets by 30% after adding interactive tours to our app." />
            <TestimonialCard name="Jordan K." role="QA Lead" text="Recording and sharing test flows is so much easier now. Highly recommended!" />
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full max-w-4xl mx-auto mb-32">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Pricing</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            <PricingCard plan="Free" price="$0" features={["Unlimited public tours", "Basic analytics", "Community support"]} />
            <PricingCard plan="Pro" price="$19/mo" features={["Unlimited private tours", "Advanced analytics", "Priority support", "Custom branding"]} />
            <PricingCard plan="Enterprise" price="Contact Us" features={["SSO & advanced security", "Dedicated support", "Custom integrations"]} />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-4xl mx-auto mb-32">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-6 text-left">
            <FAQ q="Is there a free plan?" a="Yes! You can use Marvedge Tours for free with unlimited public tours." />
            <FAQ q="Can I use Marvedge Tours for internal training?" a="Absolutely. You can create private tours for your team and control access with user roles." />
            <FAQ q="Do you support analytics?" a="Yes, you can view basic analytics on all your tours. Advanced analytics are available on Pro plans." />
            <FAQ q="How secure is my data?" a="We use industry-standard authentication and store your data securely in the cloud." />
            <FAQ q="Can I cancel anytime?" a="Yes, you can upgrade, downgrade, or cancel your plan at any time." />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full max-w-2xl mx-auto mb-32 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to get started?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Sign up now and create your first interactive product tour in minutes.</p>
          <a href="/auth/signup" className="px-8 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition">Sign Up Free</a>
        </section>
      </main>
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition hidden md:block animate-fadein"
        aria-label="Back to top"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <footer className="w-full py-4 text-center text-gray-500 text-sm border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Marvedge. All rights reserved.
      </footer>
    </div>
  );
}
