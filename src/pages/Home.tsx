import React from 'react'
import { usePageInfo } from '../components/layouts/Layout'

export default function Home(): JSX.Element {
  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    setPageInfo({ name: 'Projects' })
  })

  return <></>
}
