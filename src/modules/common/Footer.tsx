import { h } from 'preact';

export function Footer() {
  return (
    <footer className="p-3">
      <ul>
        <li>
          footer tsaibot.dev {(new Date()).getFullYear()}
        </li>
      </ul>
    </footer>
  )
}