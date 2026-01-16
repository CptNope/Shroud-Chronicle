import React, { useState } from 'react';
import { FileText, Shield, Scale, AlertTriangle, ExternalLink, Github, Mail, ChevronDown, ChevronUp } from 'lucide-react';

type LegalSection = 'TOS' | 'PRIVACY' | 'COPYRIGHT' | 'ACCESSIBILITY';

interface LegalProps {
  initialSection?: LegalSection;
  onClose?: () => void;
}

export const Legal: React.FC<LegalProps> = ({ initialSection = 'TOS', onClose }) => {
  const [activeSection, setActiveSection] = useState<LegalSection>(initialSection);

  const sections = [
    { id: 'TOS' as LegalSection, label: 'Terms of Service', icon: FileText },
    { id: 'PRIVACY' as LegalSection, label: 'Privacy Policy', icon: Shield },
    { id: 'COPYRIGHT' as LegalSection, label: 'Fair Use & Copyright', icon: Scale },
    { id: 'ACCESSIBILITY' as LegalSection, label: 'Accessibility', icon: AlertTriangle },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Section Navigation */}
      <nav className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Legal document sections">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={activeSection === id}
            aria-controls={`panel-${id}`}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-neutral-950 ${
              activeSection === id
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900'
            }`}
          >
            <Icon size={16} aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </nav>

      {/* Content Panels */}
      <div className="bg-neutral-900/50 rounded-xl border border-neutral-800 p-6 md:p-8">
        {activeSection === 'TOS' && (
          <article id="panel-TOS" role="tabpanel" aria-labelledby="Terms of Service">
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="text-amber-500" aria-hidden="true" />
              Terms of Service
            </h1>
            <p className="text-neutral-400 text-sm mb-6">Last updated: January 15, 2026</p>

            <div className="space-y-6 text-neutral-300 text-sm leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using ShroudChronicle ("the Application"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Application.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">2. Description of Service</h2>
                <p>
                  ShroudChronicle is an educational Progressive Web Application (PWA) that provides information about the Shroud of Turin from multiple scholarly perspectives. The Application presents historical, scientific, and theological data for educational and research purposes only.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">3. Educational Purpose</h2>
                <p>
                  All content is provided for educational and informational purposes only. The Application does not advocate for any particular religious, scientific, or political position. The "Dual-Lens" feature is designed to present multiple scholarly viewpoints objectively.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">4. No Warranty</h2>
                <p>
                  The Application is provided "as is" without warranty of any kind. We make no guarantees about the accuracy, completeness, or reliability of any content. Users should verify information through primary sources before relying on it for academic or professional purposes.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">5. Limitation of Liability</h2>
                <p>
                  In no event shall the developers or contributors be liable for any damages arising from the use or inability to use the Application, including but not limited to direct, indirect, incidental, or consequential damages.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">6. Intellectual Property</h2>
                <p>
                  The Application's source code is licensed under the MIT License. Third-party content (images, papers, data) remains the property of their respective owners and is used under fair use provisions or with appropriate licensing. See our Copyright Policy for details.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">7. Modifications</h2>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the Application after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">8. Contact</h2>
                <p>
                  For questions about these Terms, please open an issue on our GitHub repository.
                </p>
              </section>
            </div>
          </article>
        )}

        {activeSection === 'PRIVACY' && (
          <article id="panel-PRIVACY" role="tabpanel" aria-labelledby="Privacy Policy">
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="text-green-500" aria-hidden="true" />
              Privacy Policy
            </h1>
            <p className="text-neutral-400 text-sm mb-6">Last updated: January 15, 2026</p>

            <div className="space-y-6 text-neutral-300 text-sm leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-white mb-3">Summary</h2>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-300">
                  <p className="font-medium">🔒 We collect NO personal data. Period.</p>
                  <p className="mt-2 text-sm opacity-80">
                    ShroudChronicle is a static PWA that runs entirely in your browser. We have no servers, no databases, no analytics, and no tracking.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">1. Data Collection</h2>
                <p><strong>We do not collect:</strong></p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>Personal information (name, email, address)</li>
                  <li>Usage analytics or behavioral data</li>
                  <li>Cookies for tracking purposes</li>
                  <li>IP addresses or location data</li>
                  <li>Device fingerprints</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">2. Local Storage</h2>
                <p>
                  The Application uses browser local storage and Service Workers solely for offline functionality. This data:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>Stays on your device only</li>
                  <li>Is never transmitted to any server</li>
                  <li>Can be cleared at any time through your browser settings</li>
                  <li>Includes cached application files and user preferences (like lens mode)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">3. External Links</h2>
                <p>
                  The Application contains links to external websites (Wikipedia, shroud.com, academic journals). These sites have their own privacy policies over which we have no control.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">4. Third-Party Services</h2>
                <p>
                  The Application is hosted on GitHub Pages. GitHub may collect standard server logs. Please refer to{' '}
                  <a 
                    href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-500 hover:text-amber-400 underline inline-flex items-center gap-1"
                  >
                    GitHub's Privacy Statement <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">5. Children's Privacy</h2>
                <p>
                  The Application is intended for general audiences and does not knowingly collect any information from anyone, including children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">6. Changes to This Policy</h2>
                <p>
                  Any changes to this Privacy Policy will be reflected here with an updated date. Our commitment to collecting no personal data will not change.
                </p>
              </section>
            </div>
          </article>
        )}

        {activeSection === 'COPYRIGHT' && (
          <article id="panel-COPYRIGHT" role="tabpanel" aria-labelledby="Fair Use and Copyright">
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Scale className="text-blue-500" aria-hidden="true" />
              Fair Use & Copyright Policy
            </h1>
            <p className="text-neutral-400 text-sm mb-6">Last updated: January 15, 2026</p>

            <div className="space-y-6 text-neutral-300 text-sm leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-white mb-3">1. Fair Use Statement</h2>
                <p>
                  ShroudChronicle uses third-party content under the Fair Use doctrine (17 U.S.C. § 107) for purposes of:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li><strong>Education</strong> – Teaching about historical and scientific research</li>
                  <li><strong>Scholarship</strong> – Presenting academic findings and peer-reviewed research</li>
                  <li><strong>Commentary</strong> – Providing analysis of competing scholarly interpretations</li>
                  <li><strong>Research</strong> – Aggregating data from multiple primary sources</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">2. Content Sources</h2>
                <div className="space-y-3">
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <h3 className="font-medium text-white">Public Domain</h3>
                    <p className="text-neutral-400 mt-1">
                      Historical photographs (e.g., Secondo Pia 1898) are in the public domain due to age and expired copyright.
                    </p>
                  </div>
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <h3 className="font-medium text-white">Academic Papers</h3>
                    <p className="text-neutral-400 mt-1">
                      Links to PDFs hosted on shroud.com are provided with the permission of the archive maintainers. Original papers remain copyright of their respective publishers.
                    </p>
                  </div>
                  <div className="bg-neutral-800/50 rounded-lg p-4">
                    <h3 className="font-medium text-white">Wikipedia Content</h3>
                    <p className="text-neutral-400 mt-1">
                      Data from Wikipedia is used under CC BY-SA 3.0 license with appropriate attribution.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">3. Attribution</h2>
                <p>
                  All third-party content includes attribution to the original source. Images include author, date, license type, and source URL in our HISTORICAL_IMAGES data structure.
                </p>
              </section>

              <section className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                  <AlertTriangle size={20} aria-hidden="true" />
                  4. DMCA Takedown Requests
                </h2>
                <p className="mb-4">
                  If you believe your copyrighted work has been used in a way that constitutes copyright infringement, please submit a takedown request through GitHub:
                </p>
                <div className="space-y-3">
                  <a
                    href="https://github.com/CptNope/Shroud-Chronicle/issues/new?title=Copyright%20Takedown%20Request&body=Please%20describe%20the%20copyrighted%20work%20and%20its%20location%20in%20this%20repository."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-3 rounded-lg transition-colors w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <Github size={18} aria-hidden="true" />
                    Open a GitHub Issue
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
                <div className="mt-4 text-sm text-neutral-400">
                  <p className="font-medium text-white mb-2">Your request should include:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Description of the copyrighted work</li>
                    <li>Location of the infringing material (URL or file path)</li>
                    <li>Your contact information</li>
                    <li>Statement of good faith belief</li>
                    <li>Statement of accuracy under penalty of perjury</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">5. Response Time</h2>
                <p>
                  We take copyright concerns seriously and will respond to valid takedown requests within 48 hours. Infringing content will be removed or replaced promptly upon verification.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">6. Counter-Notification</h2>
                <p>
                  If you believe content was removed in error, you may file a counter-notification through the same GitHub Issues process.
                </p>
              </section>
            </div>
          </article>
        )}

        {activeSection === 'ACCESSIBILITY' && (
          <article id="panel-ACCESSIBILITY" role="tabpanel" aria-labelledby="Accessibility Statement">
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="text-purple-500" aria-hidden="true" />
              Accessibility Statement
            </h1>
            <p className="text-neutral-400 text-sm mb-6">Last updated: January 15, 2026</p>

            <div className="space-y-6 text-neutral-300 text-sm leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-white mb-3">Our Commitment</h2>
                <p>
                  ShroudChronicle is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">Conformance Status</h2>
                <p>
                  We aim to conform to <strong>WCAG 2.1 Level AA</strong> standards. Current accessibility features include:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-neutral-400">
                  <li><strong>Keyboard Navigation</strong> – All interactive elements are keyboard accessible</li>
                  <li><strong>Focus Indicators</strong> – Visible focus states for keyboard users</li>
                  <li><strong>Color Contrast</strong> – Text meets 4.5:1 contrast ratio requirements</li>
                  <li><strong>Semantic HTML</strong> – Proper heading hierarchy and ARIA landmarks</li>
                  <li><strong>Alt Text</strong> – Descriptive text for images and icons</li>
                  <li><strong>Responsive Design</strong> – Works on all screen sizes and orientations</li>
                  <li><strong>Reduced Motion</strong> – Respects prefers-reduced-motion setting</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">Known Limitations</h2>
                <p>
                  Despite our best efforts, some areas may have accessibility limitations:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>Some third-party PDF documents may not be fully accessible</li>
                  <li>Complex data visualizations (charts) may require additional context</li>
                  <li>The 3D artifact viewer has limited screen reader support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">Feedback</h2>
                <p>
                  We welcome your feedback on the accessibility of ShroudChronicle. Please let us know if you encounter any barriers:
                </p>
                <a
                  href="https://github.com/CptNope/Shroud-Chronicle/issues/new?title=Accessibility%20Issue&labels=accessibility&body=Please%20describe%20the%20accessibility%20issue%20you%20encountered."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <Github size={16} aria-hidden="true" />
                  Report an Accessibility Issue
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-white mb-3">Assistive Technologies</h2>
                <p>
                  This application is designed to be compatible with:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
                  <li>Screen magnification software</li>
                  <li>Speech recognition software</li>
                  <li>Keyboard-only navigation</li>
                </ul>
              </section>
            </div>
          </article>
        )}
      </div>

      {/* Back to Home */}
      {onClose && (
        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg px-4 py-2"
          >
            ← Back to Application
          </button>
        </div>
      )}
    </div>
  );
};

export default Legal;
