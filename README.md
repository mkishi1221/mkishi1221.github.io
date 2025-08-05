# Masayuki Kishi - Personal Website

A personal website and blog built with Jekyll, showcasing my work as a Product Manager and Full-Stack 0→1 MVP Builder. Features a clean, minimal design with dark/light mode support and responsive layout.

## 🚀 Live Site

Visit [masayukikishi.com](https://masayukikishi.com)

## ✨ Features

- **Personal Blog**: Writing about product management, MVP development, and learnings
- **Project Showcase**: Case studies and portfolio pieces
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable reading
- **Contact Form**: Built-in contact form with spam protection
- **Search Functionality**: Find content quickly with site-wide search
- **Google Analytics**: Integrated tracking for insights
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards

## 🛠️ Tech Stack

- **Jekyll**: Static site generator
- **Sass**: CSS preprocessing
- **JavaScript**: Interactive features and search
- **Netlify Functions**: Contact form backend
- **GitHub Pages**: Hosting and deployment

## 📁 Project Structure

```
masayuki_kishi_site/
├── _config.yml          # Site configuration
├── _posts/              # Blog posts (Markdown)
├── _projects/           # Project case studies
├── _pages/              # Static pages
├── _layouts/            # Page templates
├── _includes/           # Reusable components
├── _sass/              # Stylesheets
├── images/             # Site images and assets
├── js/                 # JavaScript files
├── netlify/            # Netlify functions
└── tags/               # Tag pages (auto-generated)
```

## 🚀 Getting Started

### Prerequisites

- Ruby (2.7 or higher)
- Bundler
- Node.js (for Netlify functions)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mkishi1221/mkishi1221.github.io.git
   cd mkishi1221.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   npm install
   ```

3. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```
   
   The site will be available at `http://localhost:4000` (or the next available port if 4000 is in use)

### Development

- **Add a new blog post**: Create a new `.markdown` file in `_posts/` with the format `YYYY-MM-DD-Title.markdown`
- **Add a project**: Create a new `.md` file in `_projects/`
- **Modify styles**: Edit files in `_sass/` directory
- **Update configuration**: Modify `_config.yml` for site-wide changes

### Deployment

The site is automatically deployed via GitHub Pages. Simply push to the `main` branch:

```bash
git add .
git commit -m "Update site"
git push origin main
```

## 📝 Content Management

### Blog Posts
- Location: `_posts/`
- Format: `YYYY-MM-DD-Title.markdown`
- Front matter includes: `layout`, `title`, `description`, `date`, `image`, `tags`

### Projects
- Location: `_projects/`
- Format: `.md` files
- Include case study tiles with images, descriptions, and tags

### Images
- Location: `images/`
- Organized by project/theme
- Optimized for web (WebP format preferred)

## 🤝 Contributing

This is a personal website, but if you find any issues or have suggestions, feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 About

**Masayuki Kishi** - Product Manager and Full-Stack 0→1 MVP Builder

- 🚀 Led AI and SaaS product launches from 0 to 1
- 🏭 Experience in 3D visualization for nuclear industry
- 💡 Obsessed with driving cutting-edge products from validation to real-world results
- 📧 [Contact me](https://www.linkedin.com/in/mkishi/)

---

Built with ❤️ using Jekyll and deployed on GitHub Pages.