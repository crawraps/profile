import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppSelector, usePageInfo } from '../hooks'
import { Project as ProjectType } from '../apis/types'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import Loader from '../components/Loader'
import TagElement from '../components/Tag'
import { useTranslation } from 'react-i18next'
import TechnologyTag from '../components/TechnologyTag'
import ClockIcon from '../assets/icons/Clock'
import GithubIcon from '../assets/icons/Github'
import TagsIcon from '../assets/icons/Tags'
import BookIcon from '../assets/icons/Book'

export default function Project(): JSX.Element {
  // Get all projects
  const projects: ProjectType[] = useAppSelector(state => state.data.projects)

  // Get current lang
  const lang = useAppSelector(state => state.settings.lang)

  // Get locale
  const { t } = useTranslation()

  // Get current project by id
  const location = useLocation()
  const project = React.useMemo(() => {
    let id: any = location.pathname.split('/')
    id = id[id.length - 1] as string
    return projects.find(pr => pr.id === id) ?? null
  }, [location, projects])

  // Set page title
  const setPageInfo = usePageInfo()
  React.useEffect(() => {
    let name = (lang === 'en' ? project?.nameEN : project?.nameRU) ?? 'Project'
    setPageInfo({ name: name.charAt(0).toUpperCase() + name.slice(1), page: 'project', project: project ?? undefined })
  }, [project])

  // Set default content
  const [Content, setContent] = React.useState<JSX.Element>(<Loader style={{ marginTop: 200 }} dots={5} />)

  // Calculate content
  React.useEffect(() => {
    if (lang === 'en' && project?.descriptions.fullEng) {
      setContent(<Markdown>{project?.descriptions.fullEng ?? ''}</Markdown>)
    } else if (lang === 'ru' && project?.descriptions.fullRu) {
      setContent(<Markdown>{project?.descriptions.fullRu ?? ''}</Markdown>)
    } else {
      setContent(
        <LoaderContainer>
          <Loader style={{ marginTop: 200 }} dots={5} />
        </LoaderContainer>
      )
    }
  }, [lang, project?.descriptions.fullEng, project?.descriptions.fullRu])

  return (
    <>
      <Title>{(lang === 'ru' ? project?.nameRU : project?.nameEN) ?? 'Project'}</Title>
      <InfoContainer>
        <LinksContainer>
          <Link>
            <GithubIcon size={20} />
            {project?.links.git.slice(19)}
          </Link>
        </LinksContainer>
        <DateTimeContainer>
          <DateTime>
            <ClockIcon size={20} />
            {`${t('project-created')}: ${
              project?.created?.toString().split(' ').splice(0, 4).join(' ') ?? 'Loading...'
            }`}
          </DateTime>
          <Delimeter>|</Delimeter>
          <DateTime>
            <ClockIcon size={20} />
            {`${t('project-updated')}: ${
              project?.updated?.toString().split(' ').splice(0, 4).join(' ') ?? 'Loading...'
            }`}
          </DateTime>
          <Delimeter>|</Delimeter>
          <DateTime>
            <ClockIcon size={20} />
            {`${t('project-pushed')}: ${project?.pushed?.toString().split(' ').splice(0, 4).join(' ') ?? 'Loading...'}`}
          </DateTime>
        </DateTimeContainer>
        <TagContainer>
          <TagsTitle>
            <TagsIcon size={20} />
            {t('project-tags')}:
          </TagsTitle>
          <TagsContainer>
            {project?.tags.map(tag => (
              <TagElement tagId={tag} type='tag' key={`project-tag-${tag}`} />
            ))}
          </TagsContainer>
        </TagContainer>
        <TagContainer>
          <TagsTitle>
            <BookIcon size={20} />
            {t('project-technologies')}:
          </TagsTitle>
          <TagsContainer>
            {project?.technologies.map(tag => (
              <TechnologyTag tagId={tag} key={`project-technology-${tag}`} />
            ))}
          </TagsContainer>
        </TagContainer>
      </InfoContainer>
      {Content}
    </>
  )
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  fill: gray;

  & > div {
    margin: 2px 0;
  }
`
const LinksContainer = styled.div`
  display: flex;
  width: 100%;
`
const Link = styled.a`
  font-size: 16px;
  color: gray;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.primary};
    cursor: pointer;
  }
`
const Delimeter = styled.span`
  margin: 0 20px;
  font-size: 16px;
  color: gray;

  @media screen and (max-width: 960px) {
    display: none;
  }
`
const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  color: gray;
  align-items: flex-start;
`
const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  a,
  span {
    margin: 2px 2px;
  }
`
const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`
const DateTime = styled.span`
  font-size: 16px;
  color: gray;
  display: flex;
  align-items: center;

  @media screen and (max-width: 960px) {
    margin: 4px 0;
  }
`
const TagsTitle = styled.span`
  font-size: 16px;
  color: gray;
  margin-right: 0.6em;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`
const Icon = styled.span`
  margin-right: 0.6em;
`
const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.text};
  font-family: Montserrat;
  margin-bottom: 15px;
`
const Markdown = styled(ReactMarkdown)`
  margin: 0 auto;
  width: 100%;
  color: ${props => props.theme.opacityText};
  line-height: 1.7em;
  letter-spacing: 0.2px;

  h1,
  h2,
  h3 {
    color: ${props => props.theme.text};
  }

  pre {
    margin: 1.25em 0;
    background-color: ${props => props.theme.opacityBackground};
    padding: 1em;
    border-radius: 6px;
  }

  blockquote {
    margin: 1.2em 0;
    padding: 0.4em;
    border-left: 2px solid ${props => props.theme.primary};

    p {
      margin: 0;
      margin-left: 0.25em;
    }
  }

  img {
    width: 100%;
    object-position: center center;
    object-fit: cover;
    margin: 0.5em 0;
  }
`
const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
