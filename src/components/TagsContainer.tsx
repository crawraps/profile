import React, { useEffect } from 'react'
import { motion, useAnimation, Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useQuery } from './layouts/Layout'

interface Props {
  children: JSX.Element[] | null
  isOpen: boolean
}

export default function TagsContainer({ children, isOpen }: Props): JSX.Element {
  const query = useQuery()

  // Get static text
  const { t } = useTranslation()

  // Animations
  const controls = useAnimation()

  useEffect(() => {
    controls.start(() => ({
      right: isOpen ? 20 : -320,
      transition: {
        ease: 'easeOut',
        duration: 0.2,
      },
    }))
  }, [isOpen])

  return (
    <Container
      animate={controls}
      initial={{
        right: -320,
      }}
    >
      <TitleContainer>
        <Title>{t('tags-title')}</Title>
        <ClearButton to={'/' + (query.has('sort') ? '?sort=' + query.get('sort') : '')}>{t('tags-button')}</ClearButton>
      </TitleContainer>
      <Content>{children}</Content>
    </Container>
  )
}

const Container = styled(motion.div)`
  position: fixed;
  z-index: 5;
  bottom: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  padding: 15px 10px 8px;
  border-radius: 5px;
  background-color: ${props => props.theme.background};
  box-shadow: ${props => props.theme.elevation[0].shadow};
  background-color: ${props => props.theme.elevation[0].color};
  transition: background-color 0.2s ease-in;
  height: fit-content;

  &:hover {
    box-shadow: ${props => props.theme.elevation[1].shadow};
    background-color: ${props => props.theme.elevation[1].color};
  }
`
const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 6px 6px 6px;
  transition: 0.2s ease-in;
  border-bottom: 1px solid ${props => props.theme.secondary};
`
const Title = styled.h3`
  color: ${props => props.theme.text};
  font-size: 18px;
  letter-spacing: 1px;
  margin: 0px;
  font-family: Montserrat;
  transition: 0.2s ease-in;
`
const ClearButton = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.text};
  opacity: 0.6;
  font-size: 16px;
  font-family: Roboto;
  transition: 0.2s ease-in;

  &:hover {
    color: ${props => props.theme.text};
    text-decoration: underline;
    opacity: 0.8;
  }
`
const Content = styled.div`
  width: 100%;
  margin: 6px 0px 0px 0px;
  padding: 0px 6px;
`
