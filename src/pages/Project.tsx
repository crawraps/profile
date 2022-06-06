import React from 'react'
import { usePageInfo } from '../hooks'

export default function Project(): JSX.Element {
  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    setPageInfo({ name: 'Project' })
  })

  return <></>
}
