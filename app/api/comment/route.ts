import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: 'dv9j02qq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

type CommentPayload = {
  name?: string
  comment?: string
  postId?: string
}

export async function POST(request: Request) {
  const token = process.env.SANITY_WRITE_TOKEN

  if (!token) {
    return NextResponse.json(
      { error: 'Comment service is not configured.' },
      { status: 500 }
    )
  }

  let payload: CommentPayload

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = String(payload.name || '').trim()
  const comment = String(payload.comment || '').trim()
  const postId = String(payload.postId || '').trim()

  if (!name || !comment || !postId) {
    return NextResponse.json(
      { error: 'Please fill in all fields.' },
      { status: 400 }
    )
  }

  if (name.length > 100) {
    return NextResponse.json(
      { error: 'Name must be 100 characters or less.' },
      { status: 400 }
    )
  }

  if (comment.length > 1000) {
    return NextResponse.json(
      { error: 'Comment must be 1000 characters or less.' },
      { status: 400 }
    )
  }

  try {
    const newComment = await writeClient.create({
      _type: 'comment',
      name,
      comment,
      post: {
        _type: 'reference',
        _ref: postId,
      },
      createdAt: new Date().toISOString(),
      // Comments go live immediately; switch this off in Sanity Studio to hide one.
      approved: true,
    })

    return NextResponse.json({ ok: true, comment: newComment })
  } catch (error: any) {
    console.error('Sanity write error:', error)
    return NextResponse.json(
      { error: 'Unable to post comment right now.' },
      { status: 500 }
    )
  }
}
