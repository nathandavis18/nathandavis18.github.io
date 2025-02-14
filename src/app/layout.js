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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-serif antialiased bg-zinc-900 min-h-screen flex flex-col">
      <header>
        <Navigation />
      </header>
        <main className="flex-1">{children}</main>
      <footer className="min-h-[50px] self-center w-full mt-3">
        <hr className="w-full mb-4 border-slate-600"/>
        <p className="text-center text-red-400">&copy;Nathan Davis - This portfolio is built with React/Next.js</p>
      </footer>
      </body>
    </html>
  );
}
