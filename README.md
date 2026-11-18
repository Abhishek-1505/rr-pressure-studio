# RR Pressure Studio

Explore batting and bowling rankings, player profiles, pressure distributions and standout innings across the IPL and international matches in the 2022–26 snapshot. The site includes its data, styles, scripts and images. It runs on a static web host with no build step.

## Publish on GitHub Pages

1. Create a repository named `rr-pressure-studio` under the GitHub username or organization you want in the address.
2. Extract the ZIP. Commit the extracted files to the `main` branch with `index.html` at the repository root. Keep the `assets/` directory and the `.nojekyll` file.
3. In **Settings → Pages**, select **Deploy from a branch**. Choose **main** and **/(root)**, then **Save**.
4. Once deployment finishes, use **Visit site** on that settings page to copy the public link. Its default format is `https://YOUR-USERNAME.github.io/rr-pressure-studio/`.

## Preview the editable files locally

From the extracted folder, run `python3 -m http.server 8000` and open `http://localhost:8000/`. The browser loads the snapshot and images from this folder. The separate standalone HTML edition can be opened directly.

## Files

| File | Purpose |
| --- | --- |
| `index.html` and `style.css` | Page layout and appearance |
| `app.js` | Views, filters, player and innings details, and CSV export |
| `model.js` | Selection of rankings, samples and pressure bands |
| `data.json` | Published snapshot used by all views |
| `assets/` | Player portraits, team marks, role illustrations and image credits |
| `scripts/illustration_prompts.json` | Source prompts for the three role illustrations |

The dashboard's **How ratings work** and **Data & images** panels contain the methodology, dataset dates and image credits. The snapshot covers 18 July 2022 through 1 November 2026.

[GitHub Pages publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
