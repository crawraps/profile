import React from 'react'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import styled from 'styled-components'
import { useAppSelector } from '../hooks'
import { ProjectImage } from '../apis/types'

interface Props {
  src: ProjectImage
  duration?: number
  height?: string
  width?: string
}

export default function SmoothImage({
  src,
  duration = 0.2,
  height = '100%',
  width = '100%',
  ...props
}: Props): JSX.Element {
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
    <AnimateContainer height={height}>
      <AnimatePresence>
        <MotionImage
          src={src[theme]}
          key={theme}
          animate='showed'
          exit='hidden'
          initial='hidden'
          height={height}
          width={width}
          variants={variants}
          transition={transition}
          {...props}
        />
      </AnimatePresence>
    </AnimateContainer>
  )
}

const Image = styled.img<Props>`
  width: ${props => props?.width ?? '100%'};
  height: ${props => props?.height ?? '100%'};
  object-fit: cover;
  object-position: center center;
`
const MotionImage = styled(motion.img)<Props>`
  position: absolute;
  width: ${props => props?.width ?? '100%'};
  height: ${props => props?.height ?? '100%'};
  object-fit: cover;
  object-position: center center;
`
const AnimateContainer = styled.div<ContainerProps>`
  height: ${props => props?.height ?? '100%'};
  width: ${props => props?.width ?? '100%'};
  position: relative;
`

interface ContainerProps {
  height?: string
  width?: string
}
