// import { error } from '@sveltejs/kit'
//
// import type { PageServerLoad } from './$types'
//
// import type { Collectible } from '$lib/database'
// import { getCollectibles } from '$lib/database'
//
// export const load = (async (event) => {
//   const { params } = event
//
//   const aFakeNetworkCall: Promise<Collectible> = new Promise((resolve, reject) => {
//     // eslint-disable-next-line @typescript-eslint/no-misused-promises
//     setTimeout(async () => {
//       // const data = collectibles.find((c) => params.collectibleId === c.id)
//       const data = (await getCollectibles()).find((c) => params.collectibleId === c.id)
//       if (data) {
//         resolve(data)
//       } else {
//         reject('Not Found')
//       }
//     }, 1000)
//   })
//
//   try {
//     const data = await aFakeNetworkCall
//     return {
//       collectible: data,
//     }
//   } catch (err) {
//     if (err === 'Not Found') throw error(404, 'Not Found')
//     throw error(500, 'Something went wrong. Please try again.')
//   }
// }) satisfies PageServerLoad
