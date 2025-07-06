import CISubPage from "@/components/vigilum/CISubPage";
import SevenEnginesDiagram from "@/components/vigilum/diagrams/SevenEnginesDiagram";

const SystemPage = () => {
  return (
    <CISubPage
      slug="system"
      heading="Seven AI Engines"
      lead="Vigilum operates through seven specialized AI engines, each designed to analyze different aspects of institutional structure and behavior. Together, they form a comprehensive structural foresight system."
      customDiagram={<SevenEnginesDiagram />}
      bodyHtml={`
        <h2>Engine Architecture</h2>
        <p>Each engine specializes in distinct analytical domains while maintaining <strong>semantic interoperability</strong> for comprehensive institutional assessment.</p>

        <h3>Core Engines</h3>
        <ul>
          <li><strong>SPE - Semantic Permutation Engine:</strong> Operator sequence analysis and override pathway detection</li>
          <li><strong>CLAVIS - Clause Analysis Vector Integration System:</strong> Legal text semantic decomposition</li>
          <li><strong>OBSCURA - Opacity Behavioral Structure Correlation Analysis:</strong> Hidden pattern recognition</li>
          <li><strong>NULLUM - Null Vector Logic Lacuna Mapping:</strong> Gap and vulnerability identification</li>
          <li><strong>NEXUS POTENTIA - Network Execution Pathway Analysis:</strong> Systemic connection mapping</li>
          <li><strong>VIGILO-CORE - Vigilance Integration Logic Operations:</strong> Central coordination and synthesis</li>
          <li><strong>VERIS - Vector Extraction Risk Intelligence System:</strong> Predictive risk quantification</li>
        </ul>

        <h2>Integrated Intelligence</h2>
        <p>The engines operate through <em>distributed semantic analysis</em> with centralized pattern synthesis. Each engine contributes specialized intelligence to the overall structural assessment.</p>

        <h3>Cross-Engine Communication</h3>
        <p>Engines share findings through a <strong>semantic vector space</strong> that enables pattern correlation across analytical domains. This creates emergent intelligence greater than individual engine capabilities.</p>

        <p>The result is unprecedented institutional risk assessment precision with <em>predictive structural foresight</em> capabilities.</p>
      `}
      ctaLabel="See Impact Timeline"
      ctaHref="/core-intelligence/impact"
    />
  );
};

export default SystemPage;
