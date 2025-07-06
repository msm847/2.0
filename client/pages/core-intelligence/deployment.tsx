import CISubPage from "@/components/vigilum/CISubPage";
import IntegrationDiagram from "@/components/vigilum/diagrams/IntegrationDiagram";

const DeploymentPage = () => {
  return (
    <CISubPage
      slug="deployment"
      heading="Integration Ready"
      lead="Vigilum integrates seamlessly with existing institutional frameworks. Our deployment process is designed for minimal disruption while maximizing structural insight generation from day one."
      customDiagram={<IntegrationDiagram />}
      bodyHtml={`
        <h2>Deployment Architecture</h2>
        <p>Vigilum operates as a <strong>structural analysis layer</strong> that integrates with existing legal and compliance systems without requiring infrastructure replacement.</p>

        <h3>Integration Methods</h3>
        <ul>
          <li><strong>API Integration:</strong> Direct connection to existing legal management systems</li>
          <li><strong>Document Analysis:</strong> Batch processing of institutional documents and frameworks</li>
          <li><strong>Real-Time Monitoring:</strong> Continuous structural assessment of new policies and procedures</li>
          <li><strong>Custom Deployment:</strong> Tailored integration for specialized institutional requirements</li>
        </ul>

        <h2>Implementation Timeline</h2>
        <p><strong>Week 1-2:</strong> System integration and baseline structural assessment</p>
        <p><strong>Week 3-4:</strong> Staff training and process integration</p>
        <p><strong>Month 2:</strong> Full operational deployment with continuous monitoring</p>
        <p><strong>Month 3+:</strong> Advanced analytics and predictive modeling activation</p>

        <h3>Technical Requirements</h3>
        <ul>
          <li><strong>Minimal Infrastructure:</strong> Cloud-based deployment with standard API access</li>
          <li><strong>Security Compliance:</strong> Enterprise-grade security with institutional data protection</li>
          <li><strong>Scalable Architecture:</strong> Supports organizations from single departments to complex institutions</li>
          <li><strong>Interoperability:</strong> Compatible with major legal and compliance platforms</li>
        </ul>

        <h2>Support and Training</h2>
        <p>Comprehensive onboarding includes <em>structural thinking training</em> for key personnel, ensuring organizational capacity to leverage structural foresight effectively.</p>

        <p>Ongoing support includes regular system optimization, threat intelligence updates, and evolutionary enhancement of analytical capabilities.</p>

        <h3>Ready to Transform Your Institution?</h3>
        <p>Contact our team to begin your structural foresight implementation. We'll design a deployment plan specifically for your institutional requirements and risk profile.</p>
      `}
      ctaLabel="Start Your Implementation"
      ctaHref="/contact"
    />
  );
};

export default DeploymentPage;
