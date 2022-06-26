import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import React from 'react'
import PatternBackground from './PatternBackround'

export interface HeaderProps {
  page: 'project' | 'home' | 'about'
  firstColor: string
  secondColor: string
  src: string
  alt: string
  [key: string]: string
}

const Header = React.memo(function Header({
  page,
  firstColor,
  secondColor,
  src,
  alt,
  ...props
}: HeaderProps): JSX.Element {
  page === 'project' ? (
    <img src={src} alt={alt} {...props} />
  ) : (
    <PatternBackground firstColor={firstColor} secondColor={secondColor} {...props} />
  )

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
          src={src}
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
