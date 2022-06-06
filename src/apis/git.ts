import { ProjectDescriptions } from './types'
const GIT_API_URL = 'https://api.github.com'
const USER = 'crawraps'

export async function fetchRepo(gitUrl: string) {
  return fetch(GIT_API_URL + '/repos' + gitUrl.split('.com')[1])
    .then(res => res.json())
    .then(res => ({
      created: res.created_at,
      updated: res.updated_at,
      pushed: res.pushed_at,
      contents: res.contents_url,
    }))
    .catch(err => console.error(`Error while fetching repo: ${err}`))
}

export async function fetchDescription(gitUrl: string, name: keyof ProjectDescriptions) {
  return fetch(`${GIT_API_URL}/repos${gitUrl.split('.com')[1]}/contents/description/${name}.md`)
    .then(res => res.json())
    .then(res => atob(res.content))
    .catch(err => console.error(`Error while fetching description file: ${err}`))
}
