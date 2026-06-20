# Contributing — Constructor Fabric public website

This guide explains how anyone can update and publish content on the Constructor Fabric public website.

The site is a small static website that lives at the root of this repository. Every HTML page, every image, every line of CSS lives here. Updating the website means updating this repository.

## How to contribute

### 1. Fork the repository

Click **Fork** on the GitHub UI to create your own copy of the repository under your GitHub account.

### 2. Clone your fork to your local machine

```bash
git clone git@github.com:<your-account>/website.git
cd website
```

### 3. Edit the website content

Open the repository in VS Code (or your editor of choice) and edit the files you want to change:

- HTML files live at the repository root (`index.html`, `elements.html`, `foundation.html`, `learn.html`, `participate.html`, `privacy-policy.html`).
- Shared layout pieces (header, footer, brand mark) live in [`partials.jsx`](partials.jsx).
- Styles live in [`styles.css`](styles.css).
- Images live in [`assets/img/`](assets/img/).

### 4. Preview your changes locally

The easiest way is the **Live Preview** extension for VS Code: install it, open `index.html`, and start the server — your edits reload automatically in the preview.

Any other static-file server works just as well, for example from the repository root:

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000> in your browser.

### 5. Open a pull request

Push your changes to your fork and open a pull request against the `main` branch of this repository. Describe what you changed and why.

Website maintainers will review your pull request. Once it is approved, they will merge it into `main`.

### 6. Automatic publishing

Any code merged into `main` is automatically published to **constructorfabric.org** and any other domains officially affiliated with the Constructor Fabric Foundation. There is no separate deploy step for contributors — once your PR is merged, your change goes live.

> **Note on staging.** A staging environment is not currently configured. If one is needed in the future, it will be set up by pushing to a separate branch (for example `staging`) rather than `main`. Contributors should continue to target `main`.

## Conventions

**Brand palette**:

- Navy `#00204D` (primary dark)
- Primary blue `#2668C5` (links, accents)
- Lime `#9BC225` (highlight, gradient cap)
- White / cream `#FAEFE3` (backgrounds)

**Banned marketing words** (per the existing site's style guide): *revolutionary, game-changing, leverage, ecosystem, holistic, robust, synergy, paradigm, deep dive, unpack, seamless, cutting-edge, next-generation*. Rough rule: be direct, technical, and confident.

**No emojis** in user-facing copy.

## How to report a bug or request a change

If you do not want to open a pull request yourself, you can report an issue instead:

- **GitHub Issues** (preferred): open an issue at <https://github.com/constructorfabric/website/issues>. Anyone with a GitHub account can file one.
- **Discord**: if you do not have permission to open an issue, join our [Discord server](https://discord.gg/QWHtHGgEdq) and post in the **#website** channel.
- **Email**: send a message to contact@constructorfabric.org.