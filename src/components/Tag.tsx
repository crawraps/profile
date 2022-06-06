import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Tag } from '../apis/types'
import { useQuery, useAppSelector } from '../hooks'

interface Props {
  tagName: string
  type: 'tag' | 'link'
}

export default function TagElement({ tagName, type }: Props): JSX.Element {
  const query = useQuery()
  const location = useLocation()
  const [target, setTarget] = React.useState<string>('')
  const availableTags = useAppSelector(state => state.data.tags)

  // Get tag by name
  const [tag, setTag] = React.useState<Tag | null>(null)
  React.useEffect(() => setTag(availableTags.find((tag: Tag) => tag.name === tagName) ?? null), [availableTags])

  // Calculate new query params
  let tags = query.get('tags')?.split(' ') ?? []
  const initialTags = query.get('tags')?.split(' ') ?? []

  if (initialTags.includes(tagName)) {
    tags.splice(tags.indexOf(tagName), 1)
  } else {
    tags.push(tagName)
  }

  // Calculate target
  const getTarget = React.useCallback(() => {
    let target = ''
    if (query.has('tags')) {
      target = '/' + location.search.replace(initialTags.join('+'), tags.join('+'))
    } else if (location.search) {
      target = '/' + location.search + '&tags=' + tags.join('+')
    } else {
      target = '/?tags=' + tags.join('+')
    }

    if (tags.length === 0) {
      target = '/' + location.search.replace('tags=' + initialTags.join('+'), '')
    }

    return target
  }, [location])
  React.useEffect(() => setTarget(getTarget()), [getTarget])

  const elementProps = {
    to: target,
    color: tag?.color,
    initialtags: initialTags,
    name: tagName,
  }

  return type === 'tag' ? (
    <TagType {...elementProps}>{tagName}</TagType>
  ) : (
    <LinkType {...elementProps}>{tagName}</LinkType>
  )
}

const TagType = styled(Link)<StyledElementProps>`
  color: ${props => props.theme.main};
  background-color: ${props => props?.color ?? props.theme.background};
  display: inline;
  padding: 2px 10px;
  margin: 6px 2px;
  vertical-align: center;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;
  border-radius: 100px;
  transition: color 0.2s ease-in;
  opacity: ${({ initialtags, name }) => (initialtags.includes(name) || initialtags.length === 0 ? 1 : 0.5)};

  &:hover {
    color: ${props => props.theme.main};
  }
`
const LinkType = styled(Link)<StyledElementProps>`
  color: ${props => props.theme.link};
  text-decoration: none;
  transition: 0.2s ease-in;

  &:hover {
    color: ${props => props.theme.primary};
  }
`
interface StyledElementProps {
  color?: string
  initialtags: string[]
  name: string
}
