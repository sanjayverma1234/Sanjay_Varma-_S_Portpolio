Resume usage

Place your resume PDF in the project root (the same folder as `index.html`) and name it exactly `resume.pdf`.

This repository's website provides two ways to download the resume:

- Header -> "Resume" link (downloads/opens `resume.pdf`).
- Hero -> "Download Resume" button (direct download link).

If you want the file to download with a different filename when users click the button, replace the file or update the `download` attribute in `index.html` or `app.js`.

Notes

- When opening the site via the `file://` protocol some automatic checks (like `fetch` requests) may be blocked by the browser; serve the folder with a simple static server (for example `npx serve` or `python -m http.server`) to test in a realistic environment.
- If you prefer the resume file to live in a subfolder (for example `assets/resume.pdf`), update the `href` in `index.html` and the `url` in `app.js` accordingly.
