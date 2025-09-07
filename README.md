# My Portfolio

[Live Demo](https://yourusername.github.io/my-portfolio/)

## Development

1. Clone the repo and open the project folder.
2. Start a local server (e.g. `npx serve .`) or simply open `index.html` in your browser.

### Adding projects

Projects are loaded from `data/projects.json`. Each project has the following structure:

```
[
  {
    "title": "My Project",
    "description": "Short summary",
    "stack": ["Vue", "Node"],
    "demo": "https://demo.example",
    "source": "https://github.com/example"
  }
]
```

Populate the array with your own projects. If the array is empty, a placeholder message will be shown on the site.

### Optional contact form

The contact section uses a simple `mailto:` link. If you prefer Formspree, update the HTML:

```html
<form action="https://formspree.io/f/your-form-id" method="POST">
  <input type="email" name="email" required />
  <button type="submit">Send</button>
</form>
```

## Deployment

This site is configured for GitHub Pages. Push changes to the default branch and visit the live demo URL above.
