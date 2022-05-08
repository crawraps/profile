import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from './layouts/Layout'

interface Actions {
  favoriteFirst: string
  favoriteLast: string
  nameFirst: string
  nameLast: string
  updateFirst: string
  updateLast: string
}

interface Props {
  actions: Array<keyof Actions>
}

export default function SortButton({ actions }: Props): JSX.Element {
  const { t } = useTranslation()
  const query = useQuery()
  const location = useLocation()
  const availableActions: Actions = {
    favoriteFirst: 'favoriteFirst',
    favoriteLast: 'favoriteLast',
    nameFirst: 'nameFirst',
    nameLast: 'nameLast',
    updateFirst: 'updateFirst',
    updateLast: 'updateLast',
  }

  // Calucate search target
  const [target, setTarget] = React.useState<string>('')
  React.useEffect(() => {
    if (query.has('sort')) {
      setTarget(`/` + location.search.replace(query?.get('sort') ?? '', ''))
    } else if (location.search) {
      setTarget('/' + location.search + '&sort=')
    } else {
      setTarget('/?sort=')
    }
  }, [location])

  const links = actions.map(action => (
    <Item as={Link} to={target + availableActions[action]} key={action}>
      {t(action)}
    </Item>
  ))

  return (
    <Button id='sort-button' title={t(query?.get('sort') ?? actions[0])}>
      {links}
    </Button>
  )
}

const Button = styled(DropdownButton)`
  #sort-button {
    background-color: ${props => props.theme.background};
    box-shadow: none;
    border: none;
    padding: 0 0 8px 0;
    transition: 0.2s ease-in;
    color: ${props => props.theme.text};
  }

  .dropdown-menu {
    background-color: ${props => props.theme.background};
    border-radius: 8px;
  }
`
const Item = styled(Dropdown.Item)`
  display: block;
  font-size: 14px;
  margin: 0px;
  padding: 4px 14px;
  text-decoration: none;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.background};

  &:hover {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
  }
`
