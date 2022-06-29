import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Project } from '../apis/types'
import { useAppSelector } from '../hooks'
import SortButton from './SortButton'
import TagElement from './Tag'

//List declaration
interface ListProps {
  title: string
  children: JSX.Element | JSX.Element[]
}

export function List({ title, children }: ListProps): JSX.Element {
  return (
    <Container>
      <ListTitleBlock>
        <ListTitle>{title}</ListTitle>
        <SortButton actions={['favoriteFirst', 'favoriteLast', 'nameFirst', 'nameLast', 'updateFirst', 'updateLast']} />
      </ListTitleBlock>
      {children}
    </Container>
  )
}

// List item declaration
interface ItemProps {
  project: Project
}

export function Item({ project }: ItemProps): JSX.Element {
  // Set current language
  const lang: 'ru' | 'en' = useAppSelector(state => state.settings.lang)

  return (
    <ItemLink to={`project/${project.id}`}>
      <ItemImage src={project.mainImage} height={350} loading='lazy' />
      <ItemInfo>
        <ItemLabelContainer>
          <ItemLabel>{lang === 'en' ? project.nameEN : project.nameRU}</ItemLabel>
          <DateTime>
            <Icon></Icon>
            {project?.pushed?.toString().split(' ').splice(0, 4).join(' ') ?? 'Loading...'}
          </DateTime>
        </ItemLabelContainer>
        <ItemTags>
          {project.tags.map(tagId => (
            <TagElement type='tag' tagId={tagId} key={`project-list-tag-${tagId}`} />
          ))}
        </ItemTags>
        <ItemDescription>
          {lang === 'en' ? project.descriptions.shortEng : project.descriptions.shortRu}
        </ItemDescription>
      </ItemInfo>
    </ItemLink>
  )
}

// Styled components
const Icon = styled.span`
  margin-right: 0.4em;
`
const ItemLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const DateTime = styled.span`
  display: block;
  color: gray;
  font-size: 16px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const ListTitleBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`
const ListTitle = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.text};
  font-family: Montserrat;
  margin-bottom: 0px;
`

const ItemLink = styled(Link)`
  width: 100%;
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
  transition: all 0.1s ease-in;
  width: fit-content;
  margin-right: 2em;

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
  transition: all 0.1s ease-in;
  margin-bottom: 10px;
  position: relative;
  max-height: 100px;
  overflow: hidden;
`
const ItemTags = styled.div`
  width: 100%;
  margin-bottom: 10px;
`
