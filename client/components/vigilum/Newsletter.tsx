import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Radio, CheckCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubscribed(true);
    setIsLoading(false);
    setEmail("");
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Welcome to SENTIUM
            </h3>
            <p className="text-slate-300">
              You're now subscribed to receive monthly insights on emerging risk
              patterns, loophole discoveries, and governance innovation trends.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Radio className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold text-white">
                SENTIUM Civic Digest
              </h3>
              <p className="text-slate-400 text-sm">Vigilum's Signal Channel</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Want access to clause loophole digests and emerging risk pattern
            insights?
          </h2>

          <p className="text-slate-300 mb-8">
            Join our monthly newsletter to receive curated updates on newly
            detected loopholes, case studies, and governance innovation trends.
            No spam, unsubscribe anytime.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-slate-500 text-sm mt-4">
            By subscribing, you agree to receive updates about structural
            governance intelligence. Monthly insights, no spam.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
