import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Post {
  title: string
  slug: { current: string }
  mainImage?: any
  publishedAt?: string
  body?: any[]
  excerpt?: string
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title, slug, mainImage, publishedAt, body, excerpt
    }`,
    { slug }
  )
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "post"]{ "slug": slug.current }`
  )
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  return { title: post?.title ?? 'Post' }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
      {post.publishedAt && (
        <time className="text-sm text-gray-400 mb-8 block">
          {new Date(post.publishedAt).toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      )}
      {post.mainImage && (
        <div className="relative w-full h-72 mb-10 rounded-2xl overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(1200).height(630).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      {post.body && (
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>
      )}
    </article>
  )
}
