import React from 'react'
import { motion, Transition, SVGMotionProps, Variants } from 'framer-motion'
import styled, { useTheme } from 'styled-components'

interface Props extends SVGMotionProps<SVGSVGElement> {
  isOpen?: boolean
  color?: string
  strokeWidth?: string | number
  transition?: Transition
  lineProps?: any
  initial?: 'opened' | 'closed'
  onClick: () => void
}

export default function MenuButton({
  isOpen = false,
  width = 24,
  height = 24,
  strokeWidth = 1,
  color,
  transition,
  lineProps = null,
  initial = 'closed',
  onClick,
  ...props
}: Props) {
  const theme = useTheme()
  const variant = isOpen ? 'opened' : 'closed'

  color = !color ? theme.primary : color

  const top: Variants = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  }
  const center: Variants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
      transition: {
        ease: 'easeOut',
        duration: 0.15,
      },
    },
  }
  const bottom: Variants = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  }

  lineProps = {
    stroke: color,
    strokeWidth: strokeWidth as number,
    vectorEffect: 'non-scaling-stroke',
    initial: initial,
    animate: variant,
    transition,
    ...lineProps,
  }
  const unitHeight = 4
  const unitWidth = (unitHeight * (width as number)) / (height as number)

  return (
    <Button onClick={onClick}>
      <motion.svg
        viewBox={`0 0 ${unitWidth} ${unitHeight}`}
        overflow='visible'
        preserveAspectRatio='none'
        width={width}
        height={height}
      >
        <motion.line x1='0' x2={unitWidth} y1='0' y2='0' variants={top} {...lineProps} />
        <motion.line x1='0' x2={unitWidth} y1='2' y2='2' variants={center} {...lineProps} />
        <motion.line x1='0' x2={unitWidth} y1='4' y2='4' variants={bottom} {...lineProps} />
      </motion.svg>
    </Button>
  )
}

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
  padding-bottom: 6px;
  z-index: 5;
  position: fixed;
  left: 10px;
  top: 10px;

  &:focus-visible {
    border: 1px solid black;
    border-radius: 2px;
  }
`
