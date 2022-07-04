import { Base64 } from 'js-base64'
import { fetchGitToken } from './database'
import { ProjectDescriptions } from './types'

let fetchRepo: (gitUrl: string) => Promise<void | { created: Date; updated: Date; pushed: Date; contents: any }>
let fetchDescription: (gitUrl: string, name: keyof ProjectDescriptions) => Promise<string | void>

export async function getGitFetchingFunctions() {
  const GIT_API_URL = 'https://api.github.com'
  const USER = 'crawraps'
  const FETCH_OPTIONS = {
    method: 'GET',
    headers: {
      'User-Agent': USER,
      Authorization: await fetchGitToken(),
    },
  }

  fetchRepo = async (gitUrl: string) => {
    return fetch(GIT_API_URL + '/repos' + gitUrl.split('.com')[1], FETCH_OPTIONS)
      .then(res => res.json())
      .then(res => ({
        created: new Date(res.created_at),
        updated: new Date(res.updated_at),
        pushed: new Date(res.pushed_at),
        contents: res.contents_url,
      }))
      .catch(err => console.error(`Error while fetching repo: ${err}`))
  }

  fetchDescription = async (gitUrl: string, name: keyof ProjectDescriptions) => {
    return fetch(`${GIT_API_URL}/repos${gitUrl.split('.com')[1]}/contents/descriptions/${name}.md`, FETCH_OPTIONS)
      .then(res => res.json())
      .then(res => Base64.decode(res.content))
      .catch(err => console.error(`Error while fetching description file: ${err}`))
  }

  return { fetchRepo, fetchDescription }
}
