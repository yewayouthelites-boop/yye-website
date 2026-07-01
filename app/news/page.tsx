import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'News' }

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  publishedAt?: string
  excerpt?: string
}

async function getPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, mainImage, publishedAt, excerpt
    }`
  )
}

export default async function NewsPage() {
  const posts = await getPosts()

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-10">News</h1>

      {posts.length === 0 && (
        <p className="text-gray-500">No posts published yet. Check back soon!</p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/news/${post.slug.current}`}
            className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            {post.mainImage && (
              <div className="relative h-48 w-full">
                <Image
                  src={urlFor(post.mainImage).width(600).height(400).url()}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="font-bold text-lg leading-snug mb-2 group-hover:underline">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-gray-500 text-sm line-clamp-3 flex-1">{post.excerpt}</p>
              )}
              {post.publishedAt && (
                <time className="text-xs text-gray-400 mt-3">
                  {new Date(post.publishedAt).toLocaleDateString('en-NG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
