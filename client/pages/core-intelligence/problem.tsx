import CISubPage from "@/components/vigilum/CISubPage";
import BlindspotDiagram from "@/components/vigilum/diagrams/BlindspotDiagram";

const ProblemPage = () => {
  return (
    <CISubPage
      slug="problem"
      heading="Trillion+ Blindspot"
      lead="Traditional compliance systems detect violations after they occur. But institutional corruption operates within legal boundaries, exploiting structural design flaws that remain invisible to conventional oversight."
      customDiagram={<BlindspotDiagram />}
      bodyHtml={`
        <h2>The Invisible Crisis</h2>
        <p>Every year, trillions of dollars flow through institutional systems designed with <strong>exploitable structural flaws</strong>. These aren't accidental oversights—they're predictable vulnerabilities embedded in legal architecture.</p>

        <h3>Why Traditional Oversight Fails</h3>
        <ul>
          <li><strong>Reactive Detection:</strong> Current systems identify problems after damage occurs</li>
          <li><strong>Individual Focus:</strong> Investigations target people, not structural design</li>
          <li><strong>Compliance Theater:</strong> Legal adherence masks systematic exploitation</li>
          <li><strong>Siloed Analysis:</strong> Fragment assessment misses interconnected risks</li>
        </ul>

        <h2>The Structural Reality</h2>
        <p>Institutional failure emerges from <em>design choices</em>, not moral failings. Legal frameworks contain latent override mechanisms that enable systematic circumvention while maintaining technical compliance.</p>

        <p>These structural blindspots create institutional vulnerability patterns that operate beneath the threshold of traditional risk assessment—until it's too late.</p>
      `}
      ctaLabel="Explore Our Solution"
      ctaHref="/core-intelligence/solution"
    />
  );
};

export default ProblemPage;
