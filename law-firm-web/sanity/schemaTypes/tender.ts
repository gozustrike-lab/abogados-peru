import { defineField, defineType } from 'sanity'

export const tender = defineType({
  name: 'tender',
  title: 'Tenders (Licitaciones)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'currentBid',
      title: 'Current Bid Amount',
      type: 'number',
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Closed', value: 'closed' },
          { title: 'Pending', value: 'pending' },
        ],
      },
      initialValue: 'active',
    }),
  ],
})
