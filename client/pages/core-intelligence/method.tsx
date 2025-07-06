import CISubPage from "@/components/vigilum/CISubPage";
import MatrixDiagram from "@/components/vigilum/diagrams/MatrixDiagram";

const MethodPage = () => {
  return (
    <CISubPage
      slug="method"
      heading="Matrix Mechanics"
      lead="Our methodology decomposes legal structures into semantic vectors, maps institutional behavior patterns, and simulates override pathway activation through non-commutative sequence analysis."
      customDiagram={<MatrixDiagram />}
      bodyHtml={`
        <h2>Semantic Decomposition</h2>
        <p>Legal text undergoes <strong>semantic vectorization</strong> to extract latent institutional behavior patterns. Each clause becomes a mathematical object with quantified risk properties.</p>

        <h3>Three-Layer Analysis</h3>
        <ul>
          <li><strong>Semantic Layer:</strong> Text-to-vector transformation revealing hidden meaning structures</li>
          <li><strong>Structural Layer:</strong> Procedural pathway mapping and override point identification</li>
          <li><strong>Behavioral Layer:</strong> Institutional response simulation under stress conditions</li>
        </ul>

        <h2>Non-Commutative Sequence Logic</h2>
        <p>Order matters in institutional processes. Our analysis examines how <em>sequence permutations</em> create exploitable pathways through otherwise secure frameworks.</p>

        <h3>Matrix Operations</h3>
        <p>Five atomic operators (O₁-O₅) represent fundamental institutional actions:</p>
        <ul>
          <li><strong>O₁ AUTHORIZE:</strong> Permission grant mechanisms</li>
          <li><strong>O₂ VERIFY:</strong> Validation and oversight processes</li>
          <li><strong>O₃ OVERRIDE:</strong> Exception and bypass procedures</li>
          <li><strong>O₄ DELEGATE:</strong> Authority transfer protocols</li>
          <li><strong>O₅ TERMINATE:</strong> Process conclusion mechanisms</li>
        </ul>

        <h2>Predictive Simulation</h2>
        <p>The system generates <strong>temporal execution traces</strong> showing how operator sequences produce different institutional outcomes. Critical vulnerabilities emerge at sequence intersection points.</p>

        <p>This mathematical approach to legal structure analysis enables <em>predictive institutional risk assessment</em> with unprecedented precision.</p>
      `}
      ctaLabel="View Our System"
      ctaHref="/core-intelligence/system"
    />
  );
};

export default MethodPage;
