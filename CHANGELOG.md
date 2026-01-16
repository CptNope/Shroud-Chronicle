# Changelog

All notable changes to ShroudChronicle will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.5.0] - 2026-01-16

### Added
- **Share Tab** - New sharing page with:
  - Pre-generated QR code for quick phone-to-phone sharing
  - Copy URL button with clipboard integration
  - Native Web Share API support on mobile devices
  - Quick links to Live App, GitHub Repository, Documentation, and Issues
  - Pre-written share message with copy functionality
  - Lens-aware theming (amber/cyan)

- **Install Prompt Component** (`InstallPrompt.tsx`)
  - Captures `beforeinstallprompt` event for immediate install button display
  - Shows styled banner 2 seconds after page load (bypasses engagement heuristics)
  - Remembers user dismissal for 7 days via localStorage
  - Auto-hides when app is already installed
  - Native "Share via Device" button on supported platforms

- **README Architecture Diagrams** (Mermaid)
  - Application Component Structure diagram
  - Dual-Lens Data Flow flowchart
  - PWA Lifecycle sequence diagram (Install & Update flows)
  - Service Worker Caching Strategy flowchart
  - Data Model ER Diagram (Entity Relationships)

### Changed
- **PWA Manifest Improvements**
  - Fixed icon paths for GitHub Pages deployment
  - Added explicit `start_url: "./index.html"` and `scope: "./"` for Android compatibility
  - Moved manifest to `public/` folder to avoid Vite hashing
  - Added maskable icons (192x192, 512x512) for Android adaptive icons
  - Added screenshots for richer install prompts
  - Added shortcuts for Timeline, Labs, and Claims quick access

- **QR Code** - Changed from dynamic API generation to static pre-generated asset for reliability

### Fixed
- PWA installability on Windows Chrome (manifest path issue)
- PWA installability on Android (start_url and scope compatibility)
- Service Worker update notification now properly triggers on new versions

---

## [2.0.0] - 2026-01-16

### Added
- **Home Page Enhanced Introduction**
  - Universal introduction section with Wikipedia-sourced content about the Shroud of Turin
  - Physical description: 4.4 × 1.1 metre linen cloth with faint straw-yellow image
  - Historical context: Turin since 1578, 1532 fire damage, documented history from 1354
  - 1988 radiocarbon dating mention with contested status note
  - Perspective-specific content follows the universal intro

- **PWA Cross-Platform Installability**
  - Full manifest.json with all required fields for Android, Windows, macOS, Linux
  - Service Worker with proper fetch handler for PWA criteria
  - Update notification component (`UpdateNotification.tsx`) for version prompts
  - Periodic update checks (every 60 seconds + on visibility change)

- **`public/` Folder Structure**
  - PWA assets properly organized for Vite static file handling
  - Icons folder with all required sizes (48x48 to 512x512)
  - Maskable icons for Android adaptive icon support
  - Placeholder screenshots for install prompts

### Changed
- Service Worker version management system with clear update instructions
- Cache versioning tied to app version for proper cache invalidation

---

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
