'use client'

import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/client'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

interface Comment {
  _id: string
  name: string
  comment: string
  createdAt: string
}

interface CommentsProps {
  postId: string
}

// Bypass Sanity's CDN cache so newly posted comments are visible to everyone
// immediately, not just the person who wrote them.
const freshClient = client.withConfig({ useCdn: false })

export function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [postId])

  async function fetchComments() {
    try {
      const fetchedComments = await freshClient.fetch<Comment[]>(
        `*[_type == "comment" && post._ref == $postId && approved != false] | order(createdAt desc) {
          _id, name, comment, createdAt
        }`,
        { postId }
      )
      setComments(fetchedComments)
    } catch (err) {
      console.error('Error fetching comments:', err)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !comment.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), comment: comment.trim(), postId }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Unable to post comment.')
        setIsSubmitting(false)
        return
      }

      setName('')
      setComment('')
      await fetchComments()
    } catch (err) {
      setError('Unable to post comment right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-extrabold mb-6">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <Input
          label="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          maxLength={100}
          disabled={isSubmitting}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-yye-gray uppercase tracking-[0.05em]">
            Your Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            maxLength={1000}
            rows={4}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-[10px] border border-yye-green/[0.18] bg-white outline-none transition-all font-sans text-sm text-yye-dark placeholder:text-gray-400 focus:border-yye-green focus:ring-1 focus:ring-yye-green/[0.15] resize-none"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="space-y-6">
        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c._id}
              className="p-5 rounded-xl border border-yye-green/[0.12] bg-white/40"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-bold text-yye-dark">{c.name}</span>
                <time className="text-xs text-gray-400">
                  {new Date(c.createdAt).toLocaleDateString('en-NG', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {c.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
