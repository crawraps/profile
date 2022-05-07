import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Project } from '../firebase/database'
import { useAppSelector } from '../store'

//List declaration
interface ListProps {
  title: string
  children: JSX.Element | JSX.Element[]
}

export function List({ title, children }: ListProps): JSX.Element {
  return (
    <Container>
      <ListTitle>{title}</ListTitle>
      {children}
    </Container>
  )
}

const Container = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  width: 100%;
`
const ListTitle = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.text};
  font-family: Montserrat;
  margin-bottom: 20px;
`

// List item declaration
interface ItemProps {
  project: Project
}

export function Item({ project }: ItemProps): JSX.Element {
  // Set current language
  const lang: 'ru' | 'en' = useAppSelector(state => state.settingsReducer.lang)

  return (
    <ItemLink to={`project/${project.id}`}>
      <ItemImage src={project.mainImage} height={350} loading='lazy' />
      <ItemInfo>
        <ItemLabel>{lang === 'en' ? project.nameEN : project.nameRU}</ItemLabel>
        <ItemDescription>{lang === 'en' ? project.descriptionEN : project.descriptionRU}</ItemDescription>
      </ItemInfo>
    </ItemLink>
  )
}

const ItemLink = styled(Link)`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  border-radius: 5px;
  background-color: ${props => props.theme.background};
  text-decoration: none;
  overflow: hidden;
  box-shadow: ${props => props.theme.elevation[0].shadow};
  background-color: ${props => props.theme.elevation[0].color};
  transition: all 0.1s ease-in;
  color: ${props => props.theme.text};

  &:hover {
    box-shadow: ${props => props.theme.elevation[1].shadow};
    background-color: ${props => props.theme.elevation[1].color};
  }
`
const ItemImage = styled.img`
  width: 100%;
  height: ${props => props.height}px;
  object-fit: cover;
  object-position: center center;
`
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const ItemLabel = styled.h2`
  font-size: 28px;
  font-family: Roboto;
  font-weight: 500;
  letter-spacing: 1px;
  color: ${props => props.theme.text};
  width: 100%;
  margin: 6px 0px 10px 0px;

  &::first-letter {
    text-transform: uppercase;
  }
`
const ItemDescription = styled.p`
  font-size: 16px;
  font-family: Roboto;
  font-weight: 400;
  color: ${props => props.theme.opacityText};
  width: 100%;
`
