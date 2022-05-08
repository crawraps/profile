import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Tag } from '../firebase/database'
import { useAppSelector } from '../store'
import { useQuery } from './layouts/Layout'

interface Props {
  tagName: string
}

export default function TagElement({ tagName }: Props): JSX.Element {
  const query = useQuery()
  let target = '/?tags='

  // Get tag by name
  const availableTags = useAppSelector(state => state.projectsReducer.tags)
  const [tag, setTag] = React.useState<Tag | null>(null)
  React.useEffect(() => {
    availableTags.then(availableTags => setTag(availableTags.find(tag => tag.name === tagName) ?? null))
  })

  // Calculate new query params
  let tags = query.get('tags')?.split(' ') ?? []
  const initialTags = query.get('tags')?.split(' ') ?? []

  if (initialTags.includes(tagName)) {
    tags.splice(tags.indexOf(tagName), 1)
  } else {
    tags.push(tagName)
  }

  target += tags.join('+')
  target = target === '/?tags=' ? '/' : target

  return (
    <StyledLink to={target} color={tag?.color ?? 'black'} initialtags={initialTags} name={tagName}>
      {tagName}
    </StyledLink>
  )
}

const StyledLink = styled(Link)<StyledLinkProps>`
  color: ${props => props.theme.main};
  background-color: ${props => props.color};
  z-index: 1;
  display: inline;
  padding: 2px 10px;
  margin: 6px 2px;
  vertical-align: center;
  font-size: 12px;
  line-height: 14px;
  text-decoration: none;
  border-radius: 100px;
  transition: 0.2s ease-in;
  opacity: ${({ initialtags, name }) => (initialtags.includes(name) || initialtags.length === 0 ? 1 : 0.5)};

  &:hover {
    color: ${props => props.theme.main};
  }
`
interface StyledLinkProps {
  color: string
  initialtags: string[]
  name: string
}
