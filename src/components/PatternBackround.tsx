import { motion } from 'framer-motion'
import React from 'react'

interface Props {
  firstColor: string
  secondColor: string
  [key: string]: any
}

export default function PatternBackground({ firstColor, secondColor, ...props }: Props) {
  return (
    <motion.svg height='100%' width='100%' {...props}>
      <defs>
        <pattern
          id='doodad'
          width='110'
          height='110'
          viewBox='0 0 40 40'
          patternUnits='userSpaceOnUse'
          patternTransform='rotate(45)'
        >
          <rect width='100%' height='100%' fill={firstColor} style={{ transition: '.2s ease-in' }} />
          <path
            d='M-20 15l20-20l20 20l20-20l20 20l20-20l20 20v-10l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20-25l20-20l20 20l20-20l20 20l20-20l20 20v-10l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20 55l20-20l20 20l20-20l20 20l20-20l20 20v-10l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20z '
            fill={secondColor}
            style={{ transition: '.2s ease-in' }}
          />
          <path
            d='M-20 30.5l20-20l20 20l20-20l20 20l20-20l20 20v-1l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20-9.5l20-20l20 20l20-20l20 20l20-20l20 20v-1l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20 70.5l20-20l20 20l20-20l20 20l20-20l20 20v-1l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20z '
            fill={firstColor}
            style={{ transition: '.2s ease-in' }}
          />
          <path
            d='M-20 35l20-20l20 20l20-20l20 20l20-20l20 20v-10l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20-5l20-20l20 20l20-20l20 20l20-20l20 20v-10l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20zM-20 75l20-20l20 20l20-20l20 20l20-20l20 20v-10l-20-20l-20 20l-20-20l-20 20l-20-20l-20 20z '
            fill={secondColor}
            style={{ transition: '.2s ease-in' }}
          />
        </pattern>
      </defs>
      <rect fill='url(#doodad)' height='100%' width='100%' />
    </motion.svg>
  )
}
