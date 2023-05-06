import { db } from '@packages/dbclient-pg'
import { oneLine } from 'proper-tags'

export interface Collectible {
  id: string
  site: string
  title: string
  description: string
  school: string
  edition: number[]
  asset: string
}

export const getCollectibles = (): Promise<Collectible[]> => {
  return db.map(
    oneLine`
      select td.drop_id,
             tnc.status,
             tp.platform_name,
             td.title,
             regexp_replace(td.description, '\\s*(<[^>]+>|&nbsp;|<script.+?<\\/script>|<style.+?<\\/style>)\\s*', '',
                            'gi')                    as description,
             tu.profile_name,
             tnc.preference_id,
             td.total_no_of_copies - td.no_of_copies as total_editions,
             td.asset_file_name
      from tbl_drop td
               join tbl_platform tp on td.platform_id = tp.platform_id
               join tbl_nft_collection tnc on td.drop_id = tnc.drop_id
               join tbl_user tu on tnc.user_id = tu.user_id
      where td.status not in ('DELETE', 'COMINGSOON')
        and tnc.status in ('OWNED', 'ONSALE')
        and td.platform_id = '28d7473a-4e43-49b7-bb65-68c277fd1964'
        and td.drop_id not in ('1b3bc1fb-ea9d-40bb-9e2f-8f7ca7b1e7c6-bzofyngktu',
                               'ef756d8b-e89d-4a62-b669-c484a6179e2b-goalsdzooe',
                               'f56be574-6960-4ac8-9643-a9da6ac7fbef-g5qqq5m1lk',
                               'bbab8049-dfb5-4a39-b578-370bedc9b00b-ystdyb3q4c',
                               'd70fa3ba-e83a-48a0-aa14-4cf17297add3-yqo0sdyhdv',
                               '3eb5e1bd-67d6-46b7-a33b-c1500bb0a92e-6ympmeyd2y')
      order by td.drop_id, tnc.preference_id;
  `,
    '',
    (row): Collectible => {
      return {
        id: row.drop_id,
        site: 'Boomer Sooner',
        title: row.title,
        description: row.description,
        school: 'The University of Oklahoma',
        edition: [row.preference_id, row.total_editions],
        asset: `https://assets.mercurynft.io/nft/asset/${row.asset_file_name}`,
      }
    },
  )
}
export const collectibles: Collectible[] = [
  {
    id: '77b5d237-472f-4cb4-9424-7464fa09eac2',
    site: 'Boomer Sooner',
    title: 'Oklahoma Softball 2022 National Championship Ring - Gold',
    description:
      'After a dominating and record-breaking season, the Sooners defended their title and brought home their sixth National Championship. This Championship Ring is a tribute to the team, their success, and all the magical moments they had along their journey. Own a unique piece of OU history with the 2022 Oklahoma Women’s Softball National Championship Ring - Gold.',
    school: 'The University of Oklahoma',
    edition: [1, 12],
    asset: 'https://d22mcraiqvj44p.cloudfront.net/assets/77b5d237-472f-4cb4-9424-7464fa09eac2.mp4',
  },
  {
    id: 'add20f21-9667-4a19-b4cb-f05b6240bc94-6funsk8csj',
    site: 'Boomer Sooner',
    title: 'Oklahoma Softball 2022 National Championship Ring - Rose Gold',
    description:
      'After a dominating and record-breaking season, the Sooners defended their title and brought home their sixth National Championship. This Championship Ring is a tribute to the team, their success, and all the magical moments they had along their journey. Own a unique piece of OU history with the 2022 Oklahoma Women’s Softball National Championship Ring - Rose Gold.',
    school: 'The University of Oklahoma',
    edition: [1, 12],
    asset:
      'https://assets.mercurynft.io/nft/asset/add20f21-9667-4a19-b4cb-f05b6240bc94-6funsk8csj.mp4',
  },
  {
    id: '2be1a34b-7568-4d57-a3aa-f6e9bbd0addd-qks1zo4md2',
    site: 'Boomer Sooner',
    title: 'Oklahoma Softball 2022 National Championship Ring - Platinum',
    description:
      'After a dominating and record-breaking season, the Sooners defended their title and brought home their sixth National Championship. This Championship Ring is a tribute to the team, their success, and all the magical moments they had along their journey. Own a unique piece of OU history with the 2022 Oklahoma Women’s Softball National Championship Ring - Platinum.',
    school: 'The University of Oklahoma',
    edition: [1, 12],
    asset:
      'https://assets.mercurynft.io/nft/asset/2be1a34b-7568-4d57-a3aa-f6e9bbd0addd-qks1zo4md2.mp4',
  },
]
