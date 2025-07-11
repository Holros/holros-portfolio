'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AOSInit() {
    useEffect(() => {
        // Initialize AOS with better settings
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            // easing: 'ease-in-out',
        })

        // Force refresh on initial load and window resize
        const refreshAOS = () => {
            AOS.refresh()
        }

        // Initial refresh with delay
        setTimeout(refreshAOS, 100)

        window.addEventListener('resize', refreshAOS)
        window.addEventListener('scroll', refreshAOS)

        return () => {
            window.removeEventListener('resize', refreshAOS)
            window.removeEventListener('scroll', refreshAOS)
        }
    }, [])

    return null
}
