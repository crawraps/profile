import React from 'react'
import { motion, Variants } from 'framer-motion'
import styled from 'styled-components'

interface Props {
  isOpen: boolean
  children: JSX.Element[] | JSX.Element
}

export default function Navbar({ isOpen, children }: Props): JSX.Element {
  const navbarVariant: Variants = {
    hidden: {
      x: '-100%',
    },
    visible: {
      x: 0,
    },
  }

  return (
    <Container
      animate={isOpen ? 'visible' : 'hidden'}
      variants={navbarVariant}
      initial='hidden'
      transition={{ ease: 'easeOut', duration: 0.2 }}
    >
      {children}
    </Container>
  )
}

const Container = styled(motion.div)`
  width: 320px;
  height: 100vh;
  top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  background-color: ${props => props.theme.background};
  padding: 10px;
  transition: background-color 0.2s ease-in;
  box-shadow: ${props => props.theme.elevation[0].shadow};
  background-color: ${props => props.theme.elevation[0].color};
  z-index: 2;

  @media screen and (max-width: 768px) {
    width: 100vh;
  }
`
