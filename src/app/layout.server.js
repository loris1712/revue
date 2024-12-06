export const metadata = {
  title: 'Revue',
  description: 'Generate your reviews',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/revue_small_logo.png" type="image/x-icon" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#030711]">
        {children}
      </body>
    </html>
  );
}
