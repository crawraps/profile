import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export default function ThreeDotsWave(props: any) {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const loadingCircleVariants = {
    start: {
      height: '0%',
    },
    end: {
      height: '100%',
    },
  }

  const loadingCircleTransition = {
    duration: 0.4,
    type: 'spring',
    yoyo: Infinity,
  }

  return (
    <Container {...props} variants={loadingContainerVariants} initial='start' animate='end'>
      {new Array(props.dots).fill(0).map((_, i) => (
        <Dot key={i} variants={loadingCircleVariants} transition={loadingCircleTransition} />
      ))}
    </Container>
  )
}

const Container = styled(motion.div)`
  width: 4rem;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Dot = styled(motion.span)`
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${props => props.theme.primary};
  border-radius: 0.25rem;
`
