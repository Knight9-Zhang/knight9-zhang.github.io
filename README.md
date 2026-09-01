# 🌌 Academic Personal Homepage Template

An aesthetic, high-performance, and responsive academic personal homepage inspired by Evangelion (EVA) cyberpunk aesthetics. Built with pure modern **HTML5**, **CSS3 (OKLCH)**, and vanilla **JavaScript**, designed for researchers, bioinformaticians, and developers.

Supports seamless **Bilingual Toggle (English / 中文)**, **Light / Dark Theme Switching**, and automated **GitHub Pages Deployment**.

---

## ✨ Features

- 🎨 **Distinctive EVA Aesthetics**: Blood-red accent palette with scanline textures, glowing borders, and NERV-style HUD corner brackets.
- 🌓 **True Light & Dark Themes**: Fully custom OKLCH color token architecture preserving red highlights across both deep void-black and clean crisp-white backgrounds.
- 🌐 **Instant Bilingual Toggle (EN / ZH)**: Client-side seamless translation without page reloads using declarative `data-en` and `data-zh` attributes.
- 🔤 **Hybrid Typography System**:
  - Latin text: *Orbitron* (Headings), *Space Grotesk* (Body), and *Space Mono* (Code / Badges).
  - Chinese text: Custom embedded *YouSheYuFeiTe (优设于飞特健康体)* with graceful fallback to system fonts.
- 🎓 **Education & Institutional Badges**: Timeline layout with embedded vector SVG institutional logos.
- 🔬 **Research & Publications**: Clean grid layout with status chips (`Under Review`, `In Progress`, `Learning`, `M.S. Thesis`).
- 💻 **Categorized Project Showcase**: Modular cards categorized into Genomics, Transcriptomics, Programming, and AI workflows.
- 🏸 **Personal Interests & Culture**: Interactive lists linking to favorite sports profiles, cinema, anime, and music.
- 📬 **Interactive Contact Modal**: One-click email clipboard copy with visual feedback tooltips.
- 🚀 **Zero Build Step & Lightning Fast**: 100% static, zero node/npm dependencies, deployable directly via GitHub Actions.

---

## 📂 Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages CI/CD workflow
├── assets/
│   ├── cau.svg               # Institutional vector emblem (sample)
│   └── swu.svg               # Institutional vector emblem (sample)
├── fonts/
│   └── youshe-yufeite.ttf    # Embedded Chinese display font
├── avatar.jpg                # Profile portrait photo
├── index.html                # Semantic HTML5 structure with bilingual data tags
├── style.css                 # OKLCH design tokens, animations, and responsive layout
├── script.js                 # Theme toggler, i18n manager, copy handler, scroll reveal
├── LICENSE                   # Open-source license
└── README.md                 # Project documentation
```

---

## 🛠️ Quick Start & Customization Guide

### 1. Clone or Fork
```bash
git clone https://github.com/<your-username>/<your-username>.github.io.git
cd <your-username>.github.io
```

### 2. Personalize Information
Open `index.html` and update the content:
- **Profile / Hero**: Replace name, title, role badges, and bio statements. Use `data-en="..."` and `data-zh="..."` for bilingual strings.
- **Avatar**: Replace `avatar.jpg` with your own square portrait image.
- **Education**: Replace institutional vector SVGs in `assets/` and update degrees/dates.
- **Research & Publications**: Update your article titles, status labels, and DOI links.
- **Projects**: Add or modify project cards and tags.
- **Contact**: Update email addresses in `#email-modal`.

### 3. Deploy to GitHub Pages
1. Push the repository to GitHub under `<your-username>.github.io`.
2. Go to **Settings** → **Pages** → **Build and deployment**.
3. Set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and publish your site at `https://<your-username>.github.io`.

---

## 🎨 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Markup** | HTML5 (Semantic, Accessible, SEO-ready) |
| **Styles** | Modern CSS3 (OKLCH color spaces, CSS Grid, Flexbox, Custom Properties) |
| **Scripting** | Vanilla ES6+ JavaScript (Zero external libraries) |
| **Typography** | Google Fonts (*Orbitron*, *Space Grotesk*, *Space Mono*) + Local Custom TTF |
| **CI/CD** | GitHub Actions (`actions/deploy-pages@v4`) |

---

## 📄 License

This project is licensed under the terms of the [MIT License](LICENSE). Feel free to customize and use it for your personal academic portfolio!
