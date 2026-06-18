import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
// @ts-ignore: allow importing global css without type declarations
import './globals.css'

// Host Grotesk is the brand typeface per the YYE Brand Guide (Light · Medium · ExtraBold)
// Loaded directly from Google Fonts (next/font/google doesn't index this font yet in 14.x)

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  title: {
    template: '%s | Yewa Youth Elites',
    default: 'Yewa Youth Elites | Raising the Next Generation of Yewa Leaders',
  },
  description:
    'A referral based community of young professionals from Yewa committed to inspire, empower and create opportunities for youths in Yewa to thrive.',
  keywords: ['Yewa', 'youth', 'empowerment', 'education', 'mentorship', 'Nigeria', 'culture','ogunstate','club','elite'],
  openGraph: {
    title: 'Yewa Youth Elites',
    description: 'Raising the next generation of Yewa leaders.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Host Grotesk brand typeface: 300 Light · 400 Regular · 500 Medium · 700 Bold · 800 ExtraBold */}
        <link
          href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
