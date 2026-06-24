'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { appCopy } from '@/lib/articles'
import { useAppLanguage } from '@/lib/use-app-language'

export default function StartProjectSection() {
  const appLanguage = useAppLanguage()
  const copy = appCopy[appLanguage].startProject

  return (
    <section className="flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#000000_0%,#021a12_100%)] px-6 py-24 text-white">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="max-w-3xl text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="bg-gradient-to-r from-white to-green-300 bg-clip-text text-5xl font-medium leading-tight text-transparent sm:text-7xl"
        >
          {copy.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/80"
        >
          {copy.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, type: 'spring', stiffness: 120 }}
          className="mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex rounded-md border border-green-400 px-8 py-4 font-medium text-green-300 transition-all hover:scale-105 hover:bg-green-400 hover:text-black"
          >
            {copy.cta}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
