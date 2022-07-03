import React from 'react'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import styled from 'styled-components'
import { useAppSelector } from '../hooks'
import { ProjectImage } from '../apis/types'

interface Props {
  src: ProjectImage
  duration?: number
  height?: number
  width?: number
}

export default function SmoothImage({ src, duration, height, width, ...props }: Props): JSX.Element {
  // Get current theme
  const theme: 'light' | 'dark' = useAppSelector(state => state.settings.theme)

  // If one image passed, just return it
  if (typeof src !== 'object') {
    return <Image src={src} height={height} width={width} {...props} loading='lazy' />
  }

  // Create animation transition
  const transition: Transition = {
    ease: 'easeIn',
    duration: duration,
  }

  // Create animation variants
  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    showed: {
      opacity: 1,
    },
  }

  return (
    <AnimatePresence>
      <MotionImage
        src={src[theme]}
        key={theme}
        animate='showed'
        exit='hidden'
        initial='hidden'
        variants={variants}
        transition={transition}
        {...props}
      />
    </AnimatePresence>
  )
}

const Image = styled.img<Props>`
  width: ${props => props?.width + 'px' ?? '100%'};
  height: ${props => props?.height + 'px' ?? '100%'};
  object-fit: cover;
  object-position: center center;
`
const MotionImage = styled(motion.img)<Props>`
  width: ${props => props?.width + 'px' ?? '100%'};
  height: ${props => props?.height + 'px' ?? '100%'};
  object-fit: cover;
  object-position: center center;
`
