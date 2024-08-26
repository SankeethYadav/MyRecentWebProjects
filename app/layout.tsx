import 'tw-elements/dist/css/tw-elements.min.css'
import "../styles/globals.css"
import "../styles/fonts.css";
import "../styles/header.css";
import Head from 'next/head'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/providers/AuthProvider'
import ToastProvider from '@/providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FoodSupply.AI',
  description: 'FoodSupply.AI App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>FoodSupply.ai</title>
        <meta name="description" content="FoodSupply.ai" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <AuthProvider>
          <ToastProvider />
          <div className={inter.className}>{children}</div>
        </AuthProvider>
        <div className="relative prose">
          <Container>
            <div className="font-manrope-medium my-10 text-sm text-center text-gray-600 dark:text-gray-400">
              Copyright © {new Date().getFullYear()} FoodSupply.ai
            </div>
          </Container>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.umd.min.js"></script>
      </body>
    </html>
  )
}

const Container = (props: any) => {
  return (
    <div
      className={`container p-8 mx-auto xl:px-0 ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
    </div>
  )
}
