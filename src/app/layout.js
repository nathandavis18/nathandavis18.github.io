import "./globals.css";
import Navigation from './navigation.js';

export const metadata = {
  title: "Nathan Davis - Software Engineer",
  description: "Nathan Davis is an upcoming Software Engineer with a proficiency in many languages and frameworks. Click to learn more!",
  author: "Nathan Davis"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-serif antialiased bg-zinc-900">
      <header>
        <Navigation />
      </header>
        {children}
      </body>
    </html>
  );
}
