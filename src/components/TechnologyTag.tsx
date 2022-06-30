import React from 'react'
import styled from 'styled-components'
import { Tag } from '../apis/types'
import { useAppSelector } from '../hooks'

interface Props {
  tagId: string
}

export default function TechnologyTag({ tagId, ...props }: Props): JSX.Element {
  const availableTags = useAppSelector(state => state.data.tags)

  // Get tag by id
  const [tag, setTag] = React.useState<Tag | null>(null)
  React.useEffect(() => setTag(availableTags.find((tag: Tag) => tag.id === tagId) ?? null), [availableTags])

  return (
    <TagElement color={tag?.color} {...props}>
      {tag?.name}
    </TagElement>
  )
}

const TagElement = styled.span<StyledElementProps>`
  color: ${props => props.theme.main};
  background-color: ${props => props?.color ?? props.theme.background};
  display: inline;
  padding: 2px 10px;
  margin: 0px 2px;
  vertical-align: center;
  font-size: 14px;
  display: inline-block;
  line-height: 16px;
  border-radius: 100px;
  transition: color 0.2s ease-in;
`
interface StyledElementProps {
  color?: string
}
