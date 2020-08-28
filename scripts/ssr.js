import { h } from 'preact'
import render from 'preact-render-to-string'

import { App } from '../src/App.tsx'

let html = render(
  <App />
);

console.log(html);