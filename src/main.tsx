import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById('root')!

const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// A production build ships prerendered markup inside #root (see
// scripts/prerender/), so React must hydrate it rather than throw it away and
// re-render — discarding it would blank the page for a moment and defeat the
// point of serving real HTML. `vite dev` serves an empty #root, which falls
// through to a normal client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
