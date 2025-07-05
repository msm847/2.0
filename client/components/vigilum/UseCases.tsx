import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  AlertTriangle,
  TrendingUp,
  Eye,
  EyeOff,
  ArrowRight,
  Calendar,
  DollarSign,
} from "lucide-react";

const UseCases = () => {
  const [selectedCase, setSelectedCase] = useState(0);

  const cases = [
    {
      id: "L001",
      title:
        "Article 32(2)(a) – Negotiated procedure without prior publication",
      sector: "Cross-sector (example scenario in IT procurement)",
      amount: "N/A",
      duration: "Tender design stage (pre-tender planning)",
      status: "High Risk",
      riskLevel: 0.7,
      typology: "High",
      description:
        "Creates a backdoor to direct contracting. By intentionally or unintentionally engineering a failed tender, an authority can award a sole-source contract while remaining formally compliant with procurement rules.",
      originalClause:
        '"(a) where no tenders or no suitable tenders or no requests to participate or no suitable requests to participate have been submitted in response to an open procedure or a restricted procedure, provided that the initial conditions of the contract are not substantially altered…"',
      riskIndicators: [
        "Open tenders fail to attract any valid bids, often due to overly narrow or impractical requirements (potentially deliberate)",
        'After a tender is canceled for "no suitable offers," a direct award is negotiated with a preferred supplier',
        'Repeated use of "no suitable tender" justifications, suggesting the tender failures were orchestrated to bypass competition',
      ],
      overridePath: [
        "Open tender held – Contracting authority conducts an open or restricted procedure",
        'Tender fails – No bids (or no "suitable" bids) are received, resulting in a failed competition',
        "Clause invoked – Authority invokes Article 32(2)(a) after the failed tender",
        "Direct award – A negotiated contract is awarded directly to a chosen supplier without a new tender",
      ],
      outcome:
        'This clause creates a backdoor to direct contracting. By intentionally or unintentionally engineering a failed tender, an authority can award a sole-source contract while remaining formally compliant with procurement rules. It embeds a discretionary escape hatch (the authority\'s judgment of "no suitable tender") that can be abused to bypass open competition.',
      detection:
        "Vigilum flag Clause32_2a. Preventable – An AI/Oversight system can flag instances where tenders repeatedly yield no valid bids, enabling early investigation of potential manipulation. (Blatant patterns can be detected, though single instances are harder to prove as intentional.)",
      preventable: true,
    },
    {
      id: "L002",
      title: "Article 32(2)(c) – Extreme urgency due to unforeseeable events",
      sector:
        "Cross-sector (commonly exploited in emergency procurements – e.g. infrastructure or health crises)",
      amount: "N/A",
      duration: "N/A (contingent on emergency timing)",
      status: "Very High Risk",
      riskLevel: 0.9,
      typology: "Very High",
      description:
        "Legitimizes sole-source awards in crisis situations. It transforms a failure of planning or a sudden event into a lawful reason to skip competitive bidding. In practice, it can legalize strategic rushing – officials may delay decisions so that a purchase becomes urgent, then use this clause to justify a direct award.",
      originalClause:
        '"(c) in so far as is strictly necessary where, for reasons of extreme urgency brought about by events unforeseeable by the contracting authority, the time limits for the open or restricted procedures… cannot be complied with. The circumstances invoked to justify extreme urgency shall not… be attributable to the contracting authority."',
      riskIndicators: [
        'Frequent use of "urgent" or "unforeseeable" justifications to award contracts without competition',
        "Projects or procurements delayed until last-minute, then pushed through as emergencies (suggesting the urgency could have been avoided with planning)",
        "Emergency procurements that bypass open tenders, especially where subsequent review shows the crisis was arguably foreseeable or self-inflicted",
      ],
      overridePath: [
        "Unforeseen event – An unexpected crisis or need arises",
        "Extreme urgency declared – The authority declares that normal tender timelines cannot be met due to urgent need",
        'No authority fault – The authority asserts the situation was not caused by its own actions or negligence (not "attributable to the contracting authority")',
        "Direct award allowed – A negotiated procedure without prior publication is permitted, letting the contract be awarded directly without open competition",
      ],
      outcome:
        "This clause legitimizes sole-source awards in crisis situations. It transforms a failure of planning or a sudden event into a lawful reason to skip competitive bidding. In practice, it can legalize strategic rushing – officials may delay decisions so that a purchase becomes urgent, then use this clause to justify a direct award. The result is that normal procurement safeguards are bypassed under the guise of an unforeseeable emergency.",
      detection:
        "Vigilum flag Clause32_2c. Hard to Detect – Real-time enforcement is difficult since claims of urgency get the benefit of the doubt. Abuse often comes to light only in audits or after-the-fact reviews. (The clause's condition that urgency not be self-inflicted is hard to verify in the moment, creating a gap that can be exploited.)",
      preventable: false,
    },
    {
      id: "L003",
      title:
        "Article 72(1)(c) – Contract modifications due to unforeseen circumstances",
      sector:
        "Long-term projects (common in large construction, defense, or IT contracts)",
      amount: "N/A (no fixed amount; changes are percentage-based)",
      duration: "Contract implementation (post-award contract management)",
      status: "Moderate Risk",
      riskLevel: 0.5,
      typology: "Moderate",
      description:
        'Allows substantial contract expansions under the pretext of unforeseeability. By claiming changes were unpredictable and keeping each increase below 50%, a contractor and authority can legally bypass a new tender. Over time, the contract can balloon far beyond its initial scope ("scope creep") while formally obeying the rules.',
      originalClause:
        '"Contracts… may be modified without a new procedure… in any of the following cases: (c) where all of the following conditions are fulfilled: (i) the need for modification has been brought about by circumstances which a diligent contracting authority could not foresee; (ii) the modification does not alter the overall nature of the contract; (iii) any increase in price is not higher than 50% of the value of the original contract… Such consecutive modifications shall not be aimed at circumventing this Directive."',
      riskIndicators: [
        "Multiple small contract modifications that individually stay below the 50% increase threshold but cumulatively greatly expand the contract's scope or value",
        'Justifications for changes consistently citing "unforeseen circumstances" that might have been anticipated or planned for (e.g. foreseeable technical challenges presented as surprises)',
        "Contracts that grow significantly in cost or scope without new tenders, often by stringing together permitted modifications",
      ],
      overridePath: [
        "Unforeseen need arises – During the contract, a new need or circumstance emerges unexpectedly",
        "Modification proposed – The contract is amended to accommodate the change",
        "Within 50% limit – The price increase from the modification is ≤ 50% of the original contract value (staying under the legal cap for no retender)",
        "No new tender – Under Article 72(1)(c), the contract is modified in place without a new procurement procedure",
      ],
      outcome:
        'This loophole allows substantial contract expansions under the pretext of unforeseeability. By claiming changes were unpredictable and keeping each increase below 50%, a contractor and authority can legally bypass a new tender. Over time, the contract can balloon far beyond its initial scope ("scope creep") while formally obeying the rules (each modification on its own is compliant). This turns what should be an exceptional provision into a tool for avoiding competition.',
      detection:
        'Vigilum flag Clause72_1c. Hard to Detect – Individual modifications appear lawful, and abuse is only evident when looking at the pattern over time. (An AI rule can flag when numerous "unforeseen" mods together exceed a threshold, but such patterns are typically noticed late in audits. Oversight must aggregate many small changes to see the issue.)',
      preventable: false,
    },
    {
      id: "L004",
      title:
        "Article 12 – Public contracts between entities within the public sector (in-house awards)",
      sector:
        "Public sector (common in municipal services or inter-agency contracting where authorities use their own companies)",
      amount:
        "N/A (no specific amount; applies to any contract meeting criteria)",
      duration: "Contract award stage (internal allocation of contracts)",
      status: "High Risk",
      riskLevel: 0.8,
      typology: "High",
      description:
        'Formalizes the "Teckal" in-house exemption, letting authorities contract with their own arm\'s-length entities without competition. This maintains a veneer of legality (all contracts stay "in the family" of government) but can enable favoritism and avoidance of market scrutiny.',
      originalClause:
        '"A public contract awarded by a contracting authority to a legal person governed by private or public law shall fall outside the scope of this Directive where all of the following conditions are fulfilled: (a) the contracting authority exercises over the legal person a control similar to that over its own departments; (b) more than 80% of the activities of the controlled legal person are carried out in the performance of tasks entrusted to it by the controlling authority; and (c) no direct private capital participation in the controlled legal person… except non-controlling forms required by law."',
      riskIndicators: [
        "A contracting authority awards contracts to an entity it owns or controls, without any tender (relying on the in-house exemption)",
        'Creation of "captive" companies or nonprofits that exist mainly to receive public contracts directly (bypassing open competition)',
        "Private-sector involvement via the backdoor – the controlled entity later subcontracts to private firms or gains private partners, undermining the spirit of the rule while the initial award faced no competition",
      ],
      overridePath: [
        "Controlled entity – A public authority sets up or fully owns a separate legal entity (with no private capital involved)",
        "Similar control – The authority controls this entity as if it were an internal department (strong hierarchical control)",
        "Internal activity – At least 80% of the entity's activity is for tasks assigned by the controlling authority (it primarily serves its owner)",
        "Direct award – Contracts from the authority to this entity are exempt from procurement rules, allowing direct awards without open tender",
      ],
      outcome:
        'Article 12 formalizes the "Teckal" in-house exemption, letting authorities contract with their own arm\'s-length entities without competition. This maintains a veneer of legality (all contracts stay "in the family" of government) but can enable favoritism and avoidance of market scrutiny. Essentially, it\'s a legal bypass of public tendering by reorganizing government services into controlled companies. This loophole can be abused by creating entities solely to funnel contracts or by shielding subsequent private involvement behind an in-house award.',
      detection:
        "Vigilum flag InHouseAward_Art12. Hard to Detect – These awards appear compliant (legally exempt) and are often buried in organizational structure changes. Identifying abuse requires scrutinizing ownership and control relationships. Any corruption or inefficiency is difficult to challenge since the arrangement is explicitly allowed by law.",
      preventable: false,
    },
    {
      id: "L005",
      title:
        "Article 42 & 43 – Subcontracting in concessions and national flexibility",
      sector:
        "Concessions/Public-Private Partnerships (e.g. infrastructure projects like stadiums, highways)",
      amount:
        "N/A (varies; loophole lies in oversight gaps, not a specific amount)",
      duration:
        "Project implementation (subcontracting phase of concession contracts)",
      status: "High Risk",
      riskLevel: 0.7,
      typology: "High",
      description:
        'Creates a "shadow procurement" layer under an otherwise regulated contract. Even if the main concession is competitively bid, the lack of EU-level rules means a winning concessionaire can sub-award huge portions of work with no transparency.',
      originalClause:
        '"…Member States may provide for more stringent liability rules under national law. …Member States having chosen to provide for measures pursuant to [subcontracting controls] shall… specify the implementing conditions for those measures. In so doing, Member States may limit their applicability, for instance in respect of certain types of contracts, certain categories of contracting authorities… or as of certain amounts."',
      riskIndicators: [
        "Major portions of a concession contract are subcontracted by the private partner with no public tender (especially in jurisdictions that chose minimal oversight for subcontracts)",
        "The prime concessionaire consistently selects the same subcontractors (e.g. affiliates or cronies) for project work, indicating a closed network",
        "National laws with weak subcontracting rules – e.g. the country exempts many contracts or sectors from subcontract transparency, allowing a shadow procurement process",
      ],
      overridePath: [
        "Concession awarded – A government awards a concession/PPP contract to a private operator (often via competition for the main contract)",
        "National opt-out – EU directives do not mandate uniform rules for subcontracts; each Member State decides what, if any, controls or publication requirements to impose",
        "No oversight (in some cases) – If the national law does not require open tendering or transparency for subcontracts (or limits such rules by contract type/size), the prime contractor is left largely unchecked in choosing subcontractors",
        "Unregulated subcontracting – The concessionaire can hand-pick subcontractors without competition, awarding large parts of the project privately. These internal decisions effectively fall outside public procurement scrutiny",
      ],
      outcome:
        'This loophole creates a "shadow procurement" layer under an otherwise regulated contract. Even if the main concession is competitively bid, the lack of EU-level rules means a winning concessionaire can sub-award huge portions of work with no transparency. This fragmented oversight (varying by country) allows potential corruption: for example, a concessionaire can subcontract to its own subsidiaries or friends\' companies, bypassing open competition entirely. Unless national law closes the gap, concession contracts can hide a lot of unchecked spending through these private subcontracting choices.',
      detection:
        "Vigilum flag UnregulatedSubcontracting. Hard to Detect – When no publication is required, subcontract dealings are invisible to regulators and the public. Misuse often surfaces only if an investigation traces the chain of contracts. An AI rule can flag concession contracts in jurisdictions without subcontracting transparency requirements, but if the law permits secrecy, detecting favoritism or collusion in real time is extremely challenging.",
      preventable: false,
    },
    {
      id: "L006",
      title:
        "Article 30 – Contracts awarded to a joint venture or by a joint venture to its members",
      sector:
        "Utilities (e.g. energy, transport authorities collaborating via joint companies)",
      amount: "N/A (not tied to a specific amount)",
      duration:
        "Procurement planning/award stage (when utilizing joint venture arrangements)",
      status: "High Risk",
      riskLevel: 0.8,
      typology: "High",
      description:
        "Mirrors the in-house/affiliate loophole for the utilities sector, enabling internal contracts among cooperating utilities. It allows public utilities to form a joint company and then trade contracts internally with full legality, sidestepping external competition.",
      originalClause:
        '"Notwithstanding Article 28… this Directive shall not apply to contracts awarded by any of the following: (a) a joint venture, formed exclusively by a number of contracting entities for the purpose of carrying out activities within the meaning of [the Utilities Directive], to one of those contracting entities; or (b) a contracting entity to such a joint venture of which it forms part."',
      riskIndicators: [
        "Joint ventures of public utilities directly awarding contracts to their member entities (or vice versa) without any competitive tender",
        "A JV acting as a procurement vehicle for its members, handling purchases internally so that member utilities avoid public tenders",
        "Complex arrangements where accountability is blurred – e.g. a contract is routed through a JV to mask direct awards between collaborating authorities",
      ],
      overridePath: [
        "Utilities form JV – Multiple contracting entities (utilities) create a joint venture company to carry out certain activities jointly (with an agreement to remain for ≥3 years)",
        "Internal contract – The joint venture awards a contract to one of its member utilities, or a member utility awards a contract to the JV",
        "Exemption applies – Because of Article 30, these contracts between the JV and its members are exempt from the Utilities Directive's normal procurement rules",
        "No tender required – The member utility and the JV can contract with each other directly, without an open tender, as long as the JV was properly formed for the joint activity",
      ],
      outcome:
        "This clause mirrors the in-house/affiliate loophole for the utilities sector, enabling internal contracts among cooperating utilities. It allows public utilities to form a joint company and then trade contracts internally with full legality, sidestepping external competition. While intended to facilitate efficient collaboration, it can be abused – contracts can be shuffled within the JV structure to avoid public tenders, making oversight difficult. The lines of responsibility and transparency get blurred, since a JV can operate quasi-internally but might not be scrutinized like a single agency would be. In short, it's a niche but impactful escape from the usual procurement rules, potentially enabling a closed network of awards.",
      detection:
        "Vigilum flag JV_internal_award_Art30. Hard to Detect – These arrangements are legally sanctioned; an AI can flag when a utility awards a contract to a joint venture it owns (or vice versa), but such flags merely highlight allowed behavior that might warrant review. Identifying corruption requires digging into whether the JV structure is used to unfairly exclude outside competitors, which is not evident from the contract data alone.",
      preventable: false,
    },
  ];

  const currentCase = cases[selectedCase];

  return (
    <div className="py-20" style={{ backgroundColor: "#0B1E16" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-orange-900/30 px-3 py-1 rounded-full border border-orange-700 mb-4">
              <FileText className="w-3 h-3 text-orange-400" />
              <span className="text-xs text-orange-300 font-mono uppercase tracking-wider">
                Structural Retrospectives
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-100 mb-4 font-mono tracking-tight">
              CLAUSE LIBRARY
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
              Structural analysis of EU procurement directive clauses revealing
              embedded loopholes and override paths that enable systematic
              competition bypass.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Case Selection */}
            <div className="lg:col-span-1">
              <div
                className="rounded-lg p-6 border"
                style={{
                  backgroundColor: "rgba(16, 44, 34, 0.7)",
                  borderColor: "rgba(34, 68, 54, 0.8)",
                }}
              >
                <h3 className="text-lg font-bold text-white font-mono mb-6">
                  CLAUSE LIBRARY
                </h3>
                <div className="relative">
                  <div
                    className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin pr-2"
                    style={{
                      scrollbarTrackColor: "rgba(12, 35, 28, 0.75)",
                      scrollbarThumbColor: "rgba(0,255,204,0.2)",
                    }}
                  >
                    {cases.map((caseItem, index) => (
                      <button
                        key={caseItem.id}
                        onClick={() => setSelectedCase(index)}
                        className="w-full text-left p-4 rounded-lg border transition-all duration-300"
                        style={{
                          backgroundColor:
                            selectedCase === index
                              ? "#1a3c2f"
                              : "rgba(12, 35, 28, 0.85)",
                          borderColor:
                            selectedCase === index
                              ? "rgba(0,255,204,0.3)"
                              : "rgba(0,255,204,0.06)",
                          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
                        }}
                        onMouseEnter={(e) => {
                          if (selectedCase !== index) {
                            e.target.style.backgroundColor = "#1a3c2f";
                            e.target.style.borderColor = "rgba(0,255,204,0.15)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedCase !== index) {
                            e.target.style.backgroundColor =
                              "rgba(12, 35, 28, 0.85)";
                            e.target.style.borderColor = "rgba(0,255,204,0.06)";
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-mono text-orange-400">
                            {caseItem.id}
                          </div>
                          <div className="text-xs text-gray-500">
                            Risk: {caseItem.riskLevel.toFixed(1)}
                          </div>
                        </div>
                        <div className="text-sm text-white font-medium mb-1">
                          {caseItem.title}
                        </div>
                        <div className="text-xs text-gray-400">
                          {caseItem.sector}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-xs font-mono text-blue-400">
                            {caseItem.duration}
                          </div>
                          <div className="text-xs text-gray-500">
                            {caseItem.typology}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {/* Fade effect to indicate scrollable content */}
                  <div
                    className="absolute bottom-0 left-0 right-2 h-8 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(16, 44, 34, 0.7) 0%, transparent 100%)",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Case Details */}
            <div className="lg:col-span-3 space-y-6">
              {/* Case Header */}
              <div
                className="rounded-lg p-6 border"
                style={{
                  backgroundColor: "#102c22",
                  borderColor: "rgba(0,255,204,0.06)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-lg font-bold text-orange-400 font-mono">
                        {currentCase.id}
                      </div>
                      <div className="text-sm font-mono text-red-400">
                        {currentCase.typology}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {currentCase.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{currentCase.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{currentCase.amount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-400 font-mono">
                      {currentCase.riskLevel.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">RISK LEVEL</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {currentCase.description}
                </p>
              </div>

              {/* Original Clause */}
              <div
                className="rounded-lg p-6 border"
                style={{
                  backgroundColor: "#102c22",
                  borderColor: "rgba(0,255,204,0.06)",
                }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <h4 className="text-lg font-bold text-white font-mono">
                    ORIGINAL CLAUSE
                  </h4>
                </div>
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                  <div className="text-sm text-gray-300 font-mono italic leading-relaxed">
                    {currentCase.originalClause}
                  </div>
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Risk Indicators */}
                <div
                  className="rounded-lg p-6 border"
                  style={{
                    backgroundColor: "#102c22",
                    borderColor: "rgba(0,255,204,0.06)",
                  }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h4 className="text-lg font-bold text-white font-mono">
                      RISK INDICATORS
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {currentCase.riskIndicators.map((indicator, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                        <div className="text-sm text-gray-300">{indicator}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Override Path */}
                <div
                  className="rounded-lg p-6 border"
                  style={{
                    backgroundColor: "#102c22",
                    borderColor: "rgba(0,255,204,0.06)",
                  }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-red-400" />
                    <h4 className="text-lg font-bold text-white font-mono">
                      OVERRIDE PATH
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {currentCase.overridePath.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white font-mono">
                            {index + 1}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300">{step}</div>
                        {index < currentCase.overridePath.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outcome */}
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <EyeOff className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold text-red-400 font-mono mb-3">
                      STRUCTURAL OUTCOME
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      {currentCase.outcome}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Eye
                        className={`w-4 h-4 ${currentCase.preventable ? "text-green-400" : "text-yellow-400"} mt-1 flex-shrink-0`}
                      />
                      <span
                        className={`text-sm ${currentCase.preventable ? "text-green-400" : "text-yellow-400"} font-mono`}
                      >
                        {currentCase.detection}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;
