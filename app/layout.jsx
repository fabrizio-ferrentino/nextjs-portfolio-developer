import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Alex Rivera - Portfolio',
  description: 'Portfolio of Alex Rivera.',
  keywords: ['portfolio', 'developer', 'react', 'nextjs', 'web development', 'javascript', 'front-end developer', 'back-end developer', 'full-stack developer'],
  authors: [{ name: 'Alex Rivera', email: 'hello@alexrivera.dev' }],
  creator: 'Alex Rivera',
  publisher: 'Alex Rivera',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexrivera.vercel.app/',
    title: 'Alex Rivera - Portfolio',
    description: 'Crafting beautiful, performant web experiences with modern technologies',
    siteName: 'Alex Rivera Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Rivera - Portfolio',
    description: 'Crafting beautiful, performant web experiences with modern technologies',
    creator: '@alexrivera',
  },
  icon: "/favicon.ico"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}