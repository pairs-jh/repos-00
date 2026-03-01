# React + GitHub Pages Workflow

## What you have
```
repos-00/
├── index.html        ← old static site (ignore)
├── ukhona/           ← old static site files (ignore)
├── api.sh            ← creates new repos from scratch
├── deploy.sh         ← NOT USED (baked into my-app)
└── my-app/           ← YOUR REACT APP LIVES HERE
    ├── src/
    │   ├── App.jsx           ← main controller, nav, pages
    │   └── NvdaDashboard.jsx ← NVDA P/E dashboard page
    ├── deploy.sh             ← YOUR DEPLOY SCRIPT
    └── vite.config.js        ← base path set to /repos-00/
```

Your site is live at:
```
https://pairs-jh.github.io/repos-00/
```

---

## Daily ops — editing content

1. Open VS Code
2. Edit `my-app/src/App.jsx` (text, cards, nav)
3. Preview locally:
```bash
cd my-app
npm run dev
# open http://localhost:5173
```
4. When happy, deploy:
```bash
bash deploy.sh
# username: pairs-jh
# repo: repos-00
# token: your token
```
Live in ~30 seconds.

---

## Adding a new page

1. Claude gives you a new `.jsx` file → save it into `my-app/src/`
2. Open `App.jsx` and add two lines:

At the top:
```js
import MyNewPage from "./MyNewPage";
```

In the nav array:
```js
nav: ["Home", "NVDA", "MyNewPage", ...],
```

In the switch block at the bottom:
```js
case "MyNewPage": return <MyNewPage />;
```

3. `bash deploy.sh`

---

## Starting a BRAND NEW repo from scratch

```bash
# 1. create the repo on github
bash api.sh
# follow prompts

# 2. create the react app inside it
cd new-repo-name
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm install recharts gh-pages --save-dev

# 3. set the base path in vite.config.js
# add:  base: '/new-repo-name/',

# 4. copy deploy.sh from repos-00/my-app/ into this my-app/

# 5. drop in your App.jsx and any .jsx pages into src/

# 6. deploy
bash deploy.sh
```

---

## Cheat sheet

| What | Command |
|------|---------|
| Start local preview | `cd my-app && npm run dev` |
| Deploy to live site | `cd my-app && bash deploy.sh` |
| Add a new page | drop `.jsx` in `src/`, wire into `App.jsx`, deploy |
| Get new content from Claude | paste into new `.jsx` file in `src/` |

---

## The mental model

```
Claude makes .jsx files
       ↓
you drop them in my-app/src/
       ↓
wire into App.jsx (3 lines)
       ↓
bash deploy.sh
       ↓
live on the internet
```

That's it. Forever.

# Original (below)

Here's a complete React app that works on GitHub Pages. Copy-paste these commands exactly:And here's the actual React app — a clean, ready-to-deploy starter that mirrors your existing `ukhona` site structure (header, cards, footer):**Two files. Here's the full workflow:**

---

**Once ever — run `setup.sh`:**
```bash
# edit line 18 first — change pairs-jh and my-app to your username/reponame
bash setup.sh
```

**Then replace the generated `src/App.jsx` with the one above.** Delete what's in there, paste this in.

**Every time you want to publish:**
```bash
npm run deploy
```

That's the entire workflow forever. `code → deploy`. No Render, no server, nothing.

---

**To learn React by doing:** everything you need to customize is at the top of `App.jsx` in the `SITE` and `CARDS` objects. Change the text, add cards, add pages — you'll naturally figure out the structure just by poking at it. When something breaks, paste the error here and I'll fix it.

---

Same directory. Your repo already exists (`repos-00`), just run everything inside it:

```bash
cd repos-00
bash setup.sh
```

It'll create a `my-app/` subfolder inside your existing repo. So your structure becomes:

```
repos-00/
├── index.html          ← your existing stuff, untouched
├── ukhona/
├── tree.sh
└── my-app/             ← React lives here
    ├── src/
    │   └── App.jsx     ← paste the App.jsx here
    └── package.json
```

Two completely separate things in the same repo. GitHub Pages can serve both — your old `index.html` stays at `pairs-jh.github.io/repos-00` and the React app goes to `pairs-jh.github.io/my-app`.

---

It's working. Open your browser and go to:

```
http://localhost:5173
```

You should see the default Vite + React spinning logo page. That means everything is set up correctly.

Now do this:

1. Open `my-app/src/App.jsx` in VS Code
2. **Delete everything** in that file
3. Paste the `App.jsx` I gave you
4. Save — the browser will update instantly (no refresh needed)

That's hot reload — React's killer feature. Every save = instant preview.

---

Yes. Exactly that. That's literally what React is for.

```
my-app/src/
├── App.jsx              ← the "controller" — decides what to show
├── NvdaDashboard.jsx    ← paste the NVDA code here
├── Workout.jsx          ← future page
├── Stemx.jsx            ← future page
└── Ukhona.jsx           ← your current home page
```

Then `App.jsx` just becomes a traffic controller:

```jsx
import NvdaDashboard from './NvdaDashboard'
import Ukhona from './Ukhona'
import Workout from './Workout'

export default function App() {
  const [page, setPage] = useState("Home");

  return (
    <>
      <nav>
        <button onClick={() => setPage("Home")}>Home</button>
        <button onClick={() => setPage("NVDA")}>NVDA</button>
        <button onClick={() => setPage("Workout")}>Workout</button>
      </nav>

      {page === "Home" && <Ukhona />}
      {page === "NVDA" && <NvdaDashboard />}
      {page === "Workout" && <Workout />}
    </>
  );
}
```

**To do this right now:**

1. Create a new file `my-app/src/NvdaDashboard.jsx`
2. Paste the NVDA dashboard code into it
3. Find the last line which says `export default function App()` — **change `App` to `NvdaDashboard`**
4. Then wire it into your `App.jsx` like above

That one rename on the last line is the only thing that matters — every `.jsx` file exports one thing, and the name has to match what `App.jsx` imports.

Every Claude artifact I make you from now on = one new `.jsx` file = one new page. That's the whole system.

---

Yeah you're right. That older `App.jsx` already had the full nav, cards, hero, footer — the whole Ukhona site. Let's keep that and just add NVDA into it.

Use that bigger file as your `App.jsx`, but replace just the bottom section:This is the full thing. Here's what changed from the version you had:

- Kept all the original Ukhona stuff (hero, cards, nav, footer)
- Added `NVDA` to the nav
- Added the NVDA card on the homepage — **clicking it navigates to the dashboard**
- Wired `NvdaDashboard` in at the top with `import`

So your `src/` folder needs exactly two files:
```
src/App.jsx           ← this file
src/NvdaDashboard.jsx ← the one from the document you pasted earlier
```

That's it. Everything else stays the same.

---

Now deploy it live.

```bash
cd my-app
npm run deploy
```

That's it. It'll churn for a minute then say "Published".

Then go to GitHub → your `my-app` repo → **Settings → Pages** → under "Branch" select `gh-pages` → Save.

Wait 2 minutes, then your site is live at:
```
https://pairs-jh.github.io/my-app
```

---

Two separate things:

- **`localhost:5173`** = running on your computer only. Nobody else can see it.
- **`npm run deploy`** = puts it on the internet for real.

The deploy script is missing because `package.json` never got patched. Fix it now:

```bash
cd my-app
npm install gh-pages --save-dev
```

Then open `my-app/package.json` in VS Code and make it look like this — just add the 3 highlighted lines:

```json
{
  "name": "my-app",
  "homepage": "https://pairs-jh.github.io/my-app",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Don't touch anything else in that file. Then:

```bash
npm run deploy
```

Then GitHub → `my-app` repo → Settings → Pages → Branch → select `gh-pages` → Save.

Live in 2 minutes.

---

**Published** — it worked.

But I see the issue — your remote points to `repos-00`, not a separate `my-app` repo. So it published to `repos-00`. That's fine, it still works.

Go here right now:

**github.com/pairs-jh/repos-00 → Settings → Pages → Branch → select `gh-pages` → Save**

Then in 2 minutes your site is at:
```
https://pairs-jh.github.io/repos-00/my-app
```

Also — **delete that token from your terminal history.** You just pasted a live GitHub token publicly. Do this right now:

```bash
git remote set-url origin https://github.com/pairs-jh/repos-00.git
```

That removes the token from the URL. Then go to **github.com → Settings → Developer Settings → Personal Access Tokens → delete that token** and generate a new one.