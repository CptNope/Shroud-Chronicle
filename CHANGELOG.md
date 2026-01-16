# Changelog

All notable changes to ShroudChronicle will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-15

### Added
- **Legal & Accessibility Pages**
  - Terms of Service
  - Privacy Policy (no data collection)
  - Fair Use & Copyright Policy with DMCA takedown instructions via GitHub
  - WCAG 2.1 Level AA Accessibility Statement
  - Footer links to all legal pages

- **VP-8 Image Analyzer Documentation**
  - Scientific instrument data with full technical description
  - Link to 1977 VP-8 brochure/manual PDF
  - Quote from inventor Pete Schumacher about the Shroud's unique 3D properties
  - Source: [Wikipedia - VP8 Image Analyzer](https://en.wikipedia.org/wiki/VP8_Image_Analyzer)

- **STURP Papers Integration**: 40 scientific papers from the 1978 Shroud of Turin Research Project
  - Papers categorized as: Peer-Reviewed, Other Publications, Follow-up Research, Unpublished, Proceedings
  - Direct PDF links to shroud.com archive
  - Service worker caches PDFs for offline viewing
  - Papers linked to relevant timeline events, lab modules, and viral claims

- **STURP Official Conclusions**: Full text of the 1981 final report
  - 11 key findings categorized as Negative (what wasn't found), Positive (what was found), and Mystery
  - Source: [shroud.com/78conclu.htm](https://www.shroud.com/78conclu.htm)

- **STURP Team Roster**: Complete list of 33 scientists with affiliations and roles
  - Historical context: founding year, first meeting, examination dates
  - Equipment value and visitor statistics
  - Source: [Wikipedia - Shroud of Turin Research Project](https://en.wikipedia.org/wiki/Shroud_of_Turin_Research_Project)

- **Historical Images with Attribution**
  - Secondo Pia 1898 photograph (public domain)
  - Proper licensing and source tracking via `HistoricalImage` interface

- **New TypeScript Interfaces**
  - `STURPPaper` - Scientific paper metadata
  - `STURPConclusion` - Individual STURP finding
  - `STURPOfficialSummary` - Full conclusions document
  - `STURPMember` - Team member details
  - `STURPHistory` - Project historical facts
  - `HistoricalImage` - Image with attribution tracking

### Changed
- Updated `evt_1898` timeline event to use real Secondo Pia photograph from Wikimedia Commons
- Added `paperRefs` field to `TimelineEvent`, `LabModule`, and `ViralClaim` interfaces
- Enhanced References page with three new sections:
  - Official STURP Conclusions (expandable findings grid)
  - STURP Team (33 scientists with history facts)
  - STURP Published Papers (40 papers by category)

## [1.0.0] - 2026-01-14

### Added
- Initial release of ShroudChronicle PWA
- Dual-Lens architecture (Skeptic/Believer toggle)
- Interactive Artifact Viewer with forensic filters
  - Natural, Negative, 3D Topography, UV Filter modes
- Timeline component with 30+ historical events
- Forensic Labs module with scientific analysis
- Viral Claim Fact-Checker with verdicts
- Data Visualization charts (Recharts integration)
- Progressive Web App features
  - Offline-first with Service Worker
  - Installable on iOS and Android
  - Auto-update detection
- References page with curated sources

---

## Links

- [Live Demo](https://cptnope.github.io/Shroud-Chronicle/)
- [GitHub Repository](https://github.com/CptNope/Shroud-Chronicle)
- [STURP Papers Archive](https://www.shroud.com/78papers.htm)
- [Official STURP Conclusions](https://www.shroud.com/78conclu.htm)
