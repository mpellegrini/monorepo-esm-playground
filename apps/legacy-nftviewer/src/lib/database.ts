import { oneLine } from 'proper-tags'
import { db } from '$lib/server/database'
import type { Collectible, Site } from '$lib/types'
import { supportedSchools } from '$lib/types'

interface SiteRow {
  platform_id: string
  platform_name: string
}

export const getSites = (): Promise<Site[]> => {
  return db.map<Site>(
    oneLine`
      select platform_id,
             platform_name
      from tbl_platform
      where platform_name not in('Mercury', 'Villanova', 'Clemson')
    `,
    null,
    siteRowMapper,
  )
}

const siteRowMapper = (row: SiteRow): Site => {
  const slug = row.platform_name
  return {
    id: row.platform_id,
    slug: slug.toLowerCase(),
    school: supportedSchools[slug].school,
    name: supportedSchools[slug].site,
    logo: supportedSchools[slug].logo,
  }
}

export const getCollectiblesBySiteCount = (slug: string): Promise<number> => {
  return db.one<number>(
    oneLine`
      select count(*)
      from tbl_drop td
               join tbl_platform tp on td.platform_id = tp.platform_id
      where td.status not in ('DELETE', 'COMINGSOON')
        and lower(tp.platform_name) = $(platform_name)
        and td.drop_id not in ('1b3bc1fb-ea9d-40bb-9e2f-8f7ca7b1e7c6-bzofyngktu',
                               'ef756d8b-e89d-4a62-b669-c484a6179e2b-goalsdzooe',
                               'f56be574-6960-4ac8-9643-a9da6ac7fbef-g5qqq5m1lk',
                               'bbab8049-dfb5-4a39-b578-370bedc9b00b-ystdyb3q4c',
                               'd70fa3ba-e83a-48a0-aa14-4cf17297add3-yqo0sdyhdv',
                               '3eb5e1bd-67d6-46b7-a33b-c1500bb0a92e-6ympmeyd2y');
  `,
    { platform_name: slug },
    (row) => +row.count,
  )
}

export const getCollectiblesBySite = (
  slug: string,
  offset: number,
  limit: number,
): Promise<Collectible[]> => {
  return db.map(
    oneLine`
      select td.drop_id,
             tp.platform_name,
             td.title,
             regexp_replace(td.description, '\\s*(<[^>]+>|&nbsp;|<script.+?<\\/script>|<style.+?<\\/style>)\\s*', '',
                            'gi')                    as description,

             td.asset_thumbnail as asset_file_name,
            (td.total_no_of_copies - td.no_of_copies) as total_editions
      from tbl_drop td
               join tbl_platform tp on td.platform_id = tp.platform_id
      where td.status not in ('DELETE', 'COMINGSOON')
        and lower(tp.platform_name) = $(platform_name)
        and td.drop_id not in ('1b3bc1fb-ea9d-40bb-9e2f-8f7ca7b1e7c6-bzofyngktu',
                               'ef756d8b-e89d-4a62-b669-c484a6179e2b-goalsdzooe',
                               'f56be574-6960-4ac8-9643-a9da6ac7fbef-g5qqq5m1lk',
                               'bbab8049-dfb5-4a39-b578-370bedc9b00b-ystdyb3q4c',
                               'd70fa3ba-e83a-48a0-aa14-4cf17297add3-yqo0sdyhdv',
                               '3eb5e1bd-67d6-46b7-a33b-c1500bb0a92e-6ympmeyd2y')
      order by td.created_date desc
      limit $(limit) offset $(offset);
  `,
    { platform_name: slug, limit, offset },
    (row): Collectible => {
      return {
        id: row.drop_id,
        site: supportedSchools[row.platform_name].site,
        school: supportedSchools[row.platform_name].school,
        title: row.title,
        description: row.description,
        edition_num: null,
        owner: null,
        total_editions: row.total_editions,
        asset: `https://assets.mercurynft.io/nft/asset/${row.asset_file_name}`,
        asset_thumbnail: `https://assets.mercurynft.io/nft/thumbnail/${row.asset_file_name}`,
      }
    },
  )
}

export const getCollectibleById = (drop_id: string): Promise<Collectible[]> => {
  return db.map(
    oneLine`
      select tnc.preference_id                         as edition_num,
             (td.total_no_of_copies - td.no_of_copies) as total_editions,
             tu.profile_name,
             td.drop_id,
             td.title,
             regexp_replace(td.description, '</?span[^>]*>', '') as description,
             td.asset_file_name,
             td.asset_file_name,
             td.asset_thumbnail,
             tp.platform_name
      from tbl_nft_collection tnc
               join tbl_drop td on tnc.drop_id = td.drop_id
               join tbl_user tu on tnc.user_id = tu.user_id
               join tbl_platform tp on td.platform_id = tp.platform_id

      where tnc.status in ('ONSALE', 'OWNED')
        and td.drop_id = $(drop_id)
      order by tnc.preference_id
  `,
    { drop_id },
    (row): Collectible => {
      return {
        id: row.drop_id,
        site: supportedSchools[row.platform_name].site,
        school: supportedSchools[row.platform_name].school,
        title: row.title,
        description: row.description,
        edition_num: row.edition_num,
        owner: row.profile_name,
        total_editions: row.total_editions,
        asset: `https://assets.mercurynft.io/nft/asset/${row.asset_file_name}`,
        asset_thumbnail: `https://assets.mercurynft.io/nft/thumbnail/${row.asset_thumbnail}`,
      }
    },
  )
}

export const getCollectibleByIdCount = (drop_id: string): Promise<number> => {
  return db.one<number>(
    oneLine`
      select count(*)
      from tbl_nft_collection tnc
      where tnc.status in ('ONSALE', 'OWNED')
        and tnc.drop_id = $(drop_id)
  `,
    { drop_id },
    (row) => +row.count,
  )
}

export const getCollectiblesByProfile = (profile_name: String, offset: number, limit: number) => {
  return db.map(
    oneLine`
      select tnc.preference_id                                   as edition_num,
             (td.total_no_of_copies - td.no_of_copies)           as total_editions,
             tu.profile_name,
             td.drop_id,
             td.title,
             regexp_replace(td.description, '</?span[^>]*>', '') as description,
             td.asset_file_name,
             td.asset_file_name,
             td.asset_thumbnail,
             tp.platform_name
      from tbl_nft_collection tnc
               join tbl_drop td on tnc.drop_id = td.drop_id
               join tbl_user tu on tnc.user_id = tu.user_id
               join tbl_platform tp on td.platform_id = tp.platform_id
      where tnc.status in ('ONSALE', 'OWNED')
        and lower(tu.profile_name) = $(profile_name)
        and td.drop_id not in ('1b3bc1fb-ea9d-40bb-9e2f-8f7ca7b1e7c6-bzofyngktu',
                               'ef756d8b-e89d-4a62-b669-c484a6179e2b-goalsdzooe',
                               'f56be574-6960-4ac8-9643-a9da6ac7fbef-g5qqq5m1lk',
                               'bbab8049-dfb5-4a39-b578-370bedc9b00b-ystdyb3q4c',
                               'd70fa3ba-e83a-48a0-aa14-4cf17297add3-yqo0sdyhdv',
                               '3eb5e1bd-67d6-46b7-a33b-c1500bb0a92e-6ympmeyd2y')
      order by tnc.nft_collection_id desc
      limit $(limit) offset $(offset);
    `,
    { profile_name, limit, offset },
    (row): Collectible => {
      return {
        id: row.drop_id,
        site: supportedSchools[row.platform_name].site,
        school: supportedSchools[row.platform_name].school,
        title: row.title,
        description: row.description,
        edition_num: row.edition_num,
        owner: row.profile_name,
        total_editions: row.total_editions,
        asset: `https://assets.mercurynft.io/nft/asset/${row.asset_file_name}`,
        asset_thumbnail: `https://assets.mercurynft.io/nft/thumbnail/${row.asset_thumbnail}`,
      }
    },
  )
}

export const getCollectiblesByProfileCount = (profile_name: string): Promise<number> => {
  return db.one<number>(
    oneLine`
      select count(*)
      from tbl_nft_collection tnc
               join tbl_user tu on tnc.user_id = tu.user_id
      where tnc.status in ('ONSALE', 'OWNED')
        and lower(tu.profile_name) = $(profile_name)
        and tnc.drop_id not in ('1b3bc1fb-ea9d-40bb-9e2f-8f7ca7b1e7c6-bzofyngktu',
                                'ef756d8b-e89d-4a62-b669-c484a6179e2b-goalsdzooe',
                                'f56be574-6960-4ac8-9643-a9da6ac7fbef-g5qqq5m1lk',
                                'bbab8049-dfb5-4a39-b578-370bedc9b00b-ystdyb3q4c',
                                'd70fa3ba-e83a-48a0-aa14-4cf17297add3-yqo0sdyhdv',
                                '3eb5e1bd-67d6-46b7-a33b-c1500bb0a92e-6ympmeyd2y')
  `,
    { profile_name },
    (row) => +row.count,
  )
}
