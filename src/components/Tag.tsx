import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Tag } from '../firebase/database'
import { useQuery } from './layouts/Layout'

interface Props {
  tag: Tag
}

export default function TagElement({ tag }: Props): JSX.Element {
  const query = useQuery()
  let target = '/?tags='

  // Calculate new query params
  let tags = query.get('tags')?.split(' ') ?? []
  const initialTags = query.get('tags')?.split(' ') ?? []

  if (initialTags.includes(tag.name)) {
    tags.splice(tags.indexOf(tag.name), 1)
  } else {
    tags.push(tag.name)
  }

  target += tags.join('+')
  target = target === '/?tags=' ? '/' : target

  return (
    <StyledLink to={target} color={tag.color} initialtags={initialTags} name={tag.name}>
      {tag.name}
    </StyledLink>
  )
}

const StyledLink = styled(Link)<StyledLinkProps>`
  color: ${props => props.theme.main};
  background-color: ${props => props.color};
  display: inline;
  padding: 2px 10px;
  margin: 6px 2px;
  vertical-align: center;
  font-size: 12px;
  line-height: 14px;
  text-decoration: none;
  border-radius: 100px;
  transition: 0.2s ease-in;
  opacity: ${({ initialtags, name }) => (initialtags.includes(name) || initialtags.length === 0 ? 1 : 0.7)};

  &:hover {
    color: ${props => props.theme.main};
  }
`
interface StyledLinkProps {
  color: string
  initialtags: string[]
  name: string
}
