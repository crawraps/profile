import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '../hooks'

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
      setTarget('/' + location.search.replace(`sort=${query?.get('sort')}`, '') + '&sort=')
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

  // Get button title
  const [title, setTitle] = React.useState<string | JSX.Element>(actions[0])
  React.useEffect(() => {
    if (window.innerWidth < 762) {
      setTitle(<i className='fa fa-sort' />)
    } else {
      setTitle(t(query?.get('sort') ?? actions[0]))
    }
  }, [query, t])

  return (
    <Button id='sort-button' title={title}>
      {links}
    </Button>
  )
}

const Button = styled(DropdownButton)`
  #sort-button {
    background-color: ${props => props.theme.background};
    box-shadow: none;
    border: none;
    padding: 0;
    transition: 0.2s ease-in;
    color: ${props => props.theme.text};
    min-width: 150px;
    text-align: end;
  }

  .dropdown-menu {
    background-color: ${props => props.theme.background};
    border-radius: 5px;
    border: none;
    background-color: ${props => props.theme.elevation[1].color};
    box-shadow: ${props => props.theme.elevation[1].shadow};
  }
`
const Item = styled(Dropdown.Item)`
  display: block;
  font-size: 14px;
  margin: 0px;
  padding: 4px 14px;
  text-decoration: none;
  color: ${props => props.theme.text};

  &:hover {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
  }
`
