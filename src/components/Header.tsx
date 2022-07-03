import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import React from 'react'
import { ProjectImage } from '../apis/types'
import { useAppSelector } from '../hooks'
import PatternBackground from './PatternBackround'

export interface HeaderProps {
  page: 'project' | 'home' | 'about'
  firstColor: string
  secondColor: string
  src: ProjectImage
  alt: string
}

const Header = React.memo(function Header({
  page,
  firstColor,
  secondColor,
  src,
  alt,
  ...props
}: HeaderProps): JSX.Element {
  // Get theme
  const theme: 'light' | 'dark' = useAppSelector(state => state.settings.theme)

  // Create animation variant
  const variants: Variants = {
    hidden: {
      opacity: 0,
      top: '-100%',
    },
    visible: {
      opacity: 1,
      top: '0%',
      transition: { ease: 'linear', duration: 0.2 },
    },
  }

  const transition: Transition = {
    ease: 'linear',
    duration: 0.2,
  }

  return (
    <AnimatePresence>
      {page === 'project' ? (
        <motion.img
          src={typeof src === 'object' ? src[theme] : src}
          alt={alt}
          animate='visible'
          exit='hidden'
          initial='hidden'
          variants={variants}
          transition={transition}
          key={page}
          {...props}
        />
      ) : (
        <PatternBackground
          firstColor={firstColor}
          secondColor={secondColor}
          animate='visible'
          exit='hidden'
          initial='hidden'
          variants={variants}
          transition={transition}
          {...props}
        />
      )}
    </AnimatePresence>
  )
})

export default Header
