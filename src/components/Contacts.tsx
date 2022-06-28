import React from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface Props {
  isOpen: boolean
}

export default function COntacts({ isOpen }: Props): JSX.Element {
  // Get static text
  const { t } = useTranslation()

  // Animations
  const controls = useAnimation()

  React.useEffect(() => {
    controls.start(() => ({
      right: isOpen ? 20 : -320,
      opacity: isOpen ? 1 : 0,
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
        <Title>{t('contacts-title')}</Title>
      </TitleContainer>
      <Content>
        <Link target='_blank' href='https://github.com/crawraps'>
          <Icon></Icon>github.com/crawraps
        </Link>
        <Link target='_blank' href='https://t.me/crawraps'>
          <Icon></Icon>t.me/crawraps
        </Link>
        <Link target='_blank' href='mailto: crawraps@gmail.com'>
          <Icon>@</Icon>crawraps@gmail.com
        </Link>
      </Content>
    </Container>
  )
}

const Container = styled(motion.div)`
  position: fixed;
  z-index: 5;
  bottom: 20px;
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
const Link = styled.a`
  font-size: 14px;
  color: ${props => props.theme.text};
  text-decoration: none;
  margin: 0 2px;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    color: ${props => props.theme.primary};
  }
`
const Icon = styled.span`
  font-size: 32px;
  margin: 0 8px;
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
const Content = styled.div`
  width: 100%;
  margin: 6px 0px 0px 0px;
  padding: 0px 6px;
  display: flex;
  flex-direction: column;
`
