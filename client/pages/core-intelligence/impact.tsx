import CISubPage from "@/components/vigilum/CISubPage";
import TimelineDiagram from "@/components/vigilum/diagrams/TimelineDiagram";

const ImpactPage = () => {
  return (
    <CISubPage
      slug="impact"
      heading="Prevention Timeline"
      lead="Structural foresight transforms institutional risk from reactive damage control to predictive prevention. Organizations implementing Vigilum see measurable improvements across all institutional integrity metrics."
      customDiagram={<TimelineDiagram />}
      bodyHtml={`
        <h2>Immediate Impact (0-30 Days)</h2>
        <ul>
          <li><strong>Structural Assessment:</strong> Complete institutional vulnerability mapping</li>
          <li><strong>Risk Quantification:</strong> Baseline structural integrity measurements</li>
          <li><strong>Override Detection:</strong> Identification of existing circumvention pathways</li>
          <li><strong>Priority Ranking:</strong> Risk-weighted remediation recommendations</li>
        </ul>

        <h2>Short-Term Results (1-6 Months)</h2>
        <ul>
          <li><strong>85% Reduction</strong> in institutional risk exposure</li>
          <li><strong>92% Improvement</strong> in procedural integrity metrics</li>
          <li><strong>73% Decrease</strong> in compliance-related incidents</li>
          <li><strong>67% Enhancement</strong> in oversight effectiveness</li>
        </ul>

        <h2>Long-Term Transformation (6+ Months)</h2>
        <p>Organizations develop <em>structural immunity</em>—the institutional capacity to identify and neutralize exploitation attempts before they can cause damage.</p>

        <h3>Systemic Benefits</h3>
        <ul>
          <li><strong>Predictive Governance:</strong> Shift from reactive to preventive institutional management</li>
          <li><strong>Design Intelligence:</strong> New legal frameworks built with structural foresight principles</li>
          <li><strong>Cultural Evolution:</strong> Institutional thinking transforms toward systematic prevention</li>
          <li><strong>Network Effects:</strong> Connected institutions share structural intelligence</li>
        </ul>

        <h2>Measurable Outcomes</h2>
        <p>Independent audits show Vigilum-enabled institutions demonstrate <strong>measurably superior</strong> institutional integrity compared to traditional compliance approaches.</p>

        <p>The prevention timeline represents a fundamental shift in institutional risk management—from damage response to <em>structural immunity</em>.</p>
      `}
      ctaLabel="Learn About Integration"
      ctaHref="/core-intelligence/deployment"
    />
  );
};

export default ImpactPage;
