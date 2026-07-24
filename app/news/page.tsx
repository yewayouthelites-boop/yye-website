import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { defineQuery } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  HiArrowRight,
  HiClock,
  HiEnvelope,
  HiMagnifyingGlass,
  HiSparkles,
} from 'react-icons/hi2'

export const metadata: Metadata = {
  title: 'News, Insights & Community Stories',
  description:
    'Stay informed with the latest updates from Yewa Youth Elites, including youth empowerment, entrepreneurship, innovation, community impact, upcoming events, and practical resources.',
}

interface Post {
  _id: string
  title: string
  slug: string
  mainImage?: unknown | null
  publishedAt?: string | null
  excerpt?: string | null
}

interface ArticlePreview {
  category: string
  title: string
  description: string
  readTime: string
}

const categoryTabs = [
  'All Posts',
  'Youth Development',
  'Entrepreneurship',
  'Skills & Training',
  'Community Impact',
  'Events',
  'Success Stories',
]

const articlePreviews: readonly ArticlePreview[] = [
  {
    category: 'Youth Development',
    title: 'Building Confidence Through Leadership Programs',
    description:
      'Leadership begins with opportunity. Learn how our programs are equipping young people with the confidence, communication, and decision-making skills needed to lead in their communities.',
    readTime: '5 min read',
  },
  {
    category: 'Entrepreneurship',
    title: 'Turning Ideas Into Sustainable Businesses',
    description:
      'Great businesses often begin with simple ideas. Explore practical strategies, mentorship opportunities, and resources that help aspiring entrepreneurs build lasting ventures.',
    readTime: '6 min read',
  },
  {
    category: 'Community Impact',
    title: 'Creating Change Together',
    description:
      'Real transformation happens when communities work together. Discover stories of collaboration, volunteerism, and initiatives making a measurable difference.',
    readTime: '4 min read',
  },
  {
    category: 'Events',
    title: "Upcoming Programs You Shouldn't Miss",
    description:
      'From workshops and networking events to leadership bootcamps and training sessions, stay informed about upcoming opportunities to learn and connect.',
    readTime: '3 min read',
  },
  {
    category: 'Success Stories',
    title: 'From Learning to Leading',
    description:
      'Meet inspiring individuals whose journeys reflect the power of determination, mentorship, and continuous learning through Yewa Youth Elites.',
    readTime: '5 min read',
  },
]

const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    excerpt
  }
`)

async function getPosts(): Promise<Post[]> {
  return client.fetch(postsQuery)
}

function formatPostDate(date?: string | null): string | null {
  if (!date) return null

  return new Date(date).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function NewsPage() {
  const posts = await getPosts()
  const hasPosts = posts.length > 0
  const featuredPost = posts[0] ?? null

  return (
    <>
      <section className="yye-pattern relative overflow-hidden bg-yye-dark px-[5%] pb-16 pt-[140px] sm:pb-20">
        <div className="relative z-[2] mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-yye-yellow/30 bg-yye-yellow/[0.12] px-[14px] py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-yye-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-yye-yellow" />
            Latest Updates
          </span>

          <h1
            className="mx-auto mt-6 max-w-[850px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
          >
            News, Insights & Community Stories
          </h1>

          {/* <p className="mx-auto mt-5 max-w-[740px] text-base leading-[1.8] text-white/68 sm:text-lg">
            Stay informed with the latest updates from Yewa Youth Elites.
            Explore stories about youth empowerment, entrepreneurship,
            innovation, community impact, upcoming events, and practical
            resources designed to help young people build better futures.
          </p> */}

          {/* <div className="mx-auto mt-10 max-w-[720px] rounded-[16px] border border-white/[0.08] bg-white/[0.06] p-3 shadow-card-hover-lg backdrop-blur">
            <label className="relative block">
              <span className="sr-only">Search articles</span>
              <HiMagnifyingGlass
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-yye-gray"
                size={20}
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search articles..."
                className="h-12 w-full rounded-[10px] border border-white/[0.08] bg-white pl-12 pr-4 text-sm font-medium text-yye-dark outline-none transition-colors placeholder:text-yye-gray/70 focus:border-yye-yellow"
              />
            </label>
          </div>

          <div className="mx-auto mt-5 flex max-w-[900px] flex-wrap justify-center gap-2">
            {categoryTabs.map((category, index) => (
              <button
                key={category}
                type="button"
                className={`rounded-full px-4 py-2 text-[12px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yye-yellow/40 ${
                  index === 0
                    ? 'bg-yye-yellow text-yye-dark shadow-sm'
                    : 'border border-white/[0.14] bg-white/[0.18] text-white hover:bg-white/[0.28] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div> */}
        </div>
      </section>

      <section className="bg-yye-light px-[5%] py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="section-tag">Featured Story</span>
            <h2 className="section-title max-w-[720px]">
              {featuredPost?.title ?? 'Empowering the Next Generation Through Skills and Opportunity'}
            </h2>
            <p className="section-sub max-w-[640px]">
              {featuredPost?.excerpt ??
                'Every young person deserves access to the knowledge, mentorship, and opportunities needed to thrive. Discover how Yewa Youth Elites is helping individuals unlock their potential through education, entrepreneurship, and community-driven initiatives.'}
            </p>
            <Link
              href={featuredPost ? `/news/${featuredPost.slug}` : '#articles'}
              className="btn-primary mt-8 inline-flex items-center gap-2"
            >
              Read More
              <HiArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[20px] shadow-card-hover-lg">
            {featuredPost?.mainImage ? (
              <Image
                src={urlFor(featuredPost.mainImage as never).width(1200).height(760).url()}
                alt={featuredPost.title}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-yye-green/95 via-yye-green/80 to-yye-dark" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-yye-dark/80 via-yye-dark/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[12px] bg-yye-yellow text-yye-dark">
                <HiSparkles size={24} aria-hidden="true" />
              </div>
              <p className="max-w-[360px] text-sm font-semibold leading-[1.6] text-white/88">
                {featuredPost?.excerpt ??
                  'Practical resources, real stories, and community opportunities for young people ready to grow.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="articles" className="bg-white px-[5%] py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="section-tag">Latest Articles</span>
              <h2 className="section-title mb-0">Stories and resources.</h2>
            </div>
            {hasPosts && (
              <p className="text-sm font-semibold text-yye-gray">
                {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
              </p>
            )}
          </div>

          {hasPosts ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <>
              <div className="rounded-[20px] border border-yye-green/[0.12] bg-yye-light px-6 py-12 text-center sm:px-10">
                <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-[14px] bg-yye-green/[0.1] text-yye-green">
                  <HiEnvelope size={26} aria-hidden="true" />
                </span>
                <h3 className="text-[1.6rem] font-extrabold text-yye-dark">
                  No Articles Yet
                </h3>
                <p className="mx-auto mt-3 max-w-[560px] text-sm leading-[1.8] text-yye-gray">
                  We&apos;re preparing valuable stories, educational resources,
                  and community updates.
                </p>
                <p className="mx-auto mt-3 max-w-[680px] text-sm leading-[1.8] text-yye-gray">
                  Check back soon to explore inspiring success stories,
                  upcoming programs, and practical insights for young people
                  looking to grow and make an impact.
                </p>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articlePreviews.map((article) => (
                  <ArticlePreviewCard key={article.title} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="bg-yye-cream px-[5%] py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <span className="section-tag bg-white text-yye-green">
              Never Miss an Update
            </span>
            <h2 className="section-title max-w-[600px]">
              Join our community and receive the latest news.
            </h2>
            <p className="section-sub max-w-[660px]">
              Join our community and receive the latest news, event
              announcements, inspiring stories, and opportunities directly in
              your inbox.
            </p>
          </div>

          <form className="flex flex-col gap-3 rounded-[16px] bg-white p-3 shadow-card-hover sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email address"
              className="h-12 min-w-0 flex-1 rounded-[10px] border border-yye-green/[0.12] px-4 text-sm font-medium text-yye-dark outline-none transition-colors placeholder:text-yye-gray/70 focus:border-yye-green"
            />
            <button type="button" className="btn-primary h-12 px-7 py-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section className="yye-pattern bg-yye-dark px-[5%] py-20 text-center">
        <div className="relative z-[2] mx-auto max-w-3xl">
          <h2 className="font-extrabold leading-[1.15] tracking-[-0.02em] text-white text-[clamp(2rem,4vw,3.2rem)]">
            Ready to Grow With Us?
          </h2>
          <p className="mx-auto mt-4 max-w-[660px] text-base leading-[1.8] text-white/68">
            Join a community dedicated to empowering young people through
            education, entrepreneurship, innovation, and leadership.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/#contact" className="btn-yellow">
              Become a Member
            </Link>
            <Link href="/#programs" className="btn-outline">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function PostCard({ post }: { post: Post }) {
  const publishedDate = formatPostDate(post.publishedAt)

  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-yye-green/[0.12] bg-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-card-hover"
    >
      <div className="relative h-52 w-full bg-yye-light">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage as never).width(700).height(460).url()}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-yye-green/[0.08] text-yye-green">
            <HiSparkles size={34} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 inline-flex w-fit rounded-full bg-yye-green/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-yye-green">
          Latest Updates
        </span>
        <h3 className="text-[1.15rem] font-extrabold leading-[1.28] text-yye-dark group-hover:text-yye-green">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-[1.7] text-yye-gray">
            {post.excerpt}
          </p>
        )}
        {publishedDate && (
          <time className="mt-5 flex items-center gap-2 text-xs font-semibold text-yye-gray/75">
            <HiClock size={16} aria-hidden="true" />
            {publishedDate}
          </time>
        )}
      </div>
    </Link>
  )
}

function ArticlePreviewCard({ article }: { article: ArticlePreview }) {
  return (
    <article className="flex h-full flex-col rounded-[16px] border border-yye-green/[0.12] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-px hover:shadow-card-hover">
      <span className="mb-4 inline-flex w-fit rounded-full bg-yye-green/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-yye-green">
        {article.category}
      </span>
      <h3 className="text-[1.15rem] font-extrabold leading-[1.28] text-yye-dark">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-[1.7] text-yye-gray">
        {article.description}
      </p>
      <p className="mt-5 flex items-center gap-2 text-xs font-semibold text-yye-gray/75">
        <HiClock size={16} aria-hidden="true" />
        {article.readTime}
      </p>
    </article>
  )
}
