'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Shield, Lock, Cookie, Image, MessageSquare, UserCircle } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    title: "Who We Are",
    icon: <Shield className="w-6 h-6" />,
    content: "Our website address is: https://www.nesscoindia.com."
  },
  {
    title: "Comments",
    icon: <MessageSquare className="w-6 h-6" />,
    content: "When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor's IP address and browser user agent string to help spam detection."
  },
  {
    title: "Media",
    icon: <Image className="w-6 h-6" />,
    content: "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website."
  },
  {
    title: "Cookies",
    icon: <Cookie className="w-6 h-6" />,
    content: `If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.

    If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
    
    When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
    
    If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.`
  },
  {
    title: "Data Retention",
    icon: <Lock className="w-6 h-6" />,
    content: "If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue. For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information."
  },
  {
    title: "Your Rights",
    icon: <UserCircle className="w-6 h-6" />,
    content: "If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes."
  }
]

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-indigo-900">NESSCO</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link 
                href="/contact"
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-900 hover:bg-indigo-800"
              >
                Get A Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-xl text-center text-indigo-100">
            Your privacy is important to us. Learn how we protect and manage your data.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setActiveSection(activeSection === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-indigo-900">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    activeSection === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: activeSection === index ? 'auto' : 0,
                  opacity: activeSection === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 whitespace-pre-wrap text-gray-600">
                  {section.content}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="mb-4">If you have any questions about our Privacy Policy, please contact us:</p>
            <div className="space-x-4">
              <Link href="/contact" className="text-indigo-900 hover:text-indigo-800">
                Contact Us
              </Link>
              <span>•</span>
              <Link href="/" className="text-indigo-900 hover:text-indigo-800">
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

