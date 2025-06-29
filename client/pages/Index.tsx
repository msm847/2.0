import { DemoResponse } from "@shared/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Search, Brain } from "lucide-react";

export default function Index() {
  const [messageFromServer, setMessageFromServer] = useState("");

  useEffect(() => {
    fetchHello();
  }, []);

  const fetchHello = async () => {
    try {
      const response = await fetch("/api/demo");
      const data = (await response.json()) as DemoResponse;
      setMessageFromServer(data.message);
    } catch (error) {
      console.error("Error fetching hello:", error);
    }
  };

  return (
    <div className="min-h-screen bg-vigilum text-vigilum-body font-plex-sans">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-vigilum-blue" />
            <span className="text-xl font-medium">Vigilum.AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/vigilum">
              <Button
                variant="outline"
                className="border-slate-600 text-black hover:bg-slate-800 font-medium"
              >
                Full Platform
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-32">
        <div className="max-w-3xl mx-auto space-y-12">
          <h1 className="text-6xl font-medium tracking-tight leading-tight">
            When meaning collapses,
            <br />
            power hides in format.
          </h1>

          <div className="space-y-6">
            <div>
              <p
                className="text-sm text-vigilum-label uppercase tracking-wide font-medium mb-3"
                style={{ letterSpacing: "-0.02em" }}
              >
                STRUCTURAL GOVERNANCE INTELLIGENCE
              </p>
              <p className="text-lg text-vigilum-subheadline font-medium leading-relaxed">
                — where structure, not intent, defines institutional risk
              </p>
            </div>

            <p
              className="text-2xl text-vigilum-body font-medium leading-relaxed max-w-2xl"
              style={{ lineHeight: "1.5" }}
            >
              Vigilum simulates how legal systems encode exposure through clause
              sequence, override logic, and typological collapse.
            </p>
          </div>

          <div className="flex gap-4">
            <Link to="/vigilum">
              <Button
                size="lg"
                className="bg-vigilum-blue hover:bg-blue-600 text-white font-medium px-8 py-3"
              >
                Explore Platform
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-black hover:bg-slate-800 font-medium px-8 py-3"
            >
              View the Codex
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                AI-Powered Analysis
              </h3>
              <p className="text-slate-400">
                Six specialized modules analyze legal structures using quantum
                logic and semantic weighting to detect risk patterns.
              </p>
            </div>

            <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Proactive Detection
              </h3>
              <p className="text-slate-400">
                Identify structural vulnerabilities before any funds are spent,
                tenders awarded, or laws signed.
              </p>
            </div>

            <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Real-World Validated
              </h3>
              <p className="text-slate-400">
                Grounded in analysis of major cases including the Vilnius
                Stadium project and EU procurement patterns.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-8 border-t border-slate-700/50">
            <div className="text-center">
              <div className="text-3xl font-medium text-vigilum-blue font-plex-mono">
                6
              </div>
              <div className="text-sm text-vigilum-label">AI Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-medium text-vigilum-blue font-plex-mono">
                200+
              </div>
              <div className="text-sm text-vigilum-label">Loopholes Mapped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-medium text-vigilum-blue font-plex-mono">
                4
              </div>
              <div className="text-sm text-vigilum-label">Risk Typologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-medium text-vigilum-blue font-plex-mono">
                €2B+
              </div>
              <div className="text-sm text-vigilum-label">Risk Detected</div>
            </div>
          </div>

          {/* Server Message */}
          {messageFromServer && (
            <div className="mt-12 p-4 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-slate-300 text-sm">
                Server Status: {messageFromServer}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
