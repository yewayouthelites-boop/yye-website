import { defineField, defineType } from 'sanity'

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved (visible on site)',
      description:
        'Comments go live automatically. Switch this off to hide it from the website without deleting it.',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      comment: 'comment',
      post: 'post.title',
      approved: 'approved',
    },
    prepare({ name, comment, post, approved }) {
      const hidden = approved === false
      return {
        title: `${hidden ? '🚫 ' : ''}${name} on "${post}"`,
        subtitle:
          (hidden ? '[HIDDEN] ' : '') +
          (comment?.substring(0, 50) + (comment?.length > 50 ? '...' : '')),
      }
    },
  },
})
