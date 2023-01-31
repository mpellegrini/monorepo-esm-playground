import type { PageLoad } from './$types'

type Post = {
  id: number
  title: string
  body: string
}

export const load: PageLoad = async ({ fetch }) => {
  const fetchPosts = async (): Promise<Post[]> => {
    // const response = await fetch('https://dummyjson.com/posts?limit=5')
    // const { posts } = await response.json()
    // return posts as Post[]
    return []
  }

  return {
    posts: fetchPosts(),
  }
}
