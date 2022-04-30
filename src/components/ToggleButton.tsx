import React from 'react'
import { motion, Variants } from 'framer-motion'
import styled, { useTheme } from 'styled-components'

export default function ToggleButton(props: any): JSX.Element {
  const theme = useTheme()

  const containerVariants: Variants = {
    disable: {
      backgroundColor: theme.main,
    },
    enable: {
      backgroundColor: theme.primary,
    },
  }

  const dotVariants: Variants = {
    disable: {
      x: 0,
    },
    enable: {
      x: 15,
    },
  }

  return (
    <Container
      animate={props.name}
      variants={containerVariants}
      initial={props.name}
      transition={{ ease: 'linear', duration: 0.2 }}
      {...props}
    >
      <Dot animate={props.name} variants={dotVariants} initial={props.name} />
    </Container>
  )
}

const Container = styled(motion.div)`
  display: flex;
  width: 30px;
  height: 15px;
  border-radius: 100px;
  margin: 0 15px;
  align-items: center;
  padding: 2px;
  position: relative;
`
const Dot = styled(motion.div)`
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${props => props.theme.background};
  transition: background-color 0.2s ease-in;
`
