'use client'

import { useEffect, useRef } from 'react'

type AdSlotProps = {
  /** AdSense ad unit id (data-ad-slot). */
  slot: string
  /** Extra classes for the wrapper, e.g. vertical spacing. */
  className?: string
  /** Label shown above the ad. Keeps advertising distinguishable from editorial. */
  label?: string
}

const AD_CLIENT = 'ca-pub-4070347184423387'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export default function AdSlot({ slot, className = '', label = 'Advertisement' }: AdSlotProps) {
  // The loader script lives in the document head, so each unit only has to
  // register itself once. The ref guards against double registration from
  // re-renders and React strict mode, which AdSense rejects as a duplicate.
  const registered = useRef(false)

  useEffect(() => {
    if (registered.current) return

    registered.current = true

    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // A blocked or failed loader must never break the page.
    }
  }, [])

  return (
    <aside className={`not-prose ${className}`} aria-label={label}>
      <p className="mb-2 text-[0.65rem] uppercase tracking-[0.2em] text-white/30">
        {label}
      </p>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}
