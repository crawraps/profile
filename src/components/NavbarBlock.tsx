import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ToggleButton from './ToggleButton'

interface Props {
  title: string
  children: JSX.Element[] | JSX.Element
  as: 'links' | 'toggles'
}

export default function NavbarBlock({ children, title, as }: Props): JSX.Element {
  // Make children array if there is only one element
  children = Array.isArray(children) ? children : [children]

  children = children.map(child => {
    switch (as) {
      case 'links':
        return (
          <StyledLink {...child.props} key={`link-${child.props.children}`}>
            {child.props.children}
          </StyledLink>
        )
      case 'toggles':
        return (
          <StyledToggle key={`toggle-${child.props.children}`} onClick={child.props.onClick}>
            {child.props.children}
            <ToggleButton {...child.props} onClick={null} />
          </StyledToggle>
        )
    }
  })

  return (
    <Block>
      <Title>{title}</Title>
      {children}
    </Block>
  )
}

const Title = styled.h2`
  color: ${props => props.theme.text};
  font-size: 18px;
  padding: 8px 0px;
  display: block;
  font-family: Montserrat;
  letter-spacing: 1px;
  border-bottom: 1px solid ${props => props.theme.secondary};
  transition: all 0.2s ease-in;
`
const StyledLink = styled(Link)`
  display: flex;
  padding: 10px;
  margin: 2px -10px;
  text-decoration: none;
  color: ${props => props.theme.text};
  transition: color 0.2s ease-in;

  &:hover {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
  }
`
const StyledToggle = styled.label`
  display: flex;
  padding: 10px;
  margin: 2px -10px;
  text-decoration: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  align-items: center;
  transition: color 0.2s ease-in;
`
const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0px;
`
