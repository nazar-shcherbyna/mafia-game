'use server';

import { settings } from '@/settings';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';
export interface EventFormErrorsType {
  errors: Record<string, string[]>;
  message: string;
}

const EventFormSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Please enter a valid title.',
    })
    .min(settings.eventTitle.minLength)
    .max(settings.eventTitle.maxLength),
  date: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Please enter a date in the future.',
  }),
  location: z
    .string({
      invalid_type_error: 'Please enter a valid location.',
    })
    .min(settings.eventLocation.minLength)
    .max(settings.eventLocation.maxLength),
});

export async function createEvent(
  adminId: string,
  prevState: EventFormErrorsType | undefined,
  formData: FormData,
): Promise<EventFormErrorsType | undefined> {
  try {
    const validatedFields = EventFormSchema.safeParse({
      title: formData.get('title'),
      date: formData.get('date'),
      location: formData.get('location'),
    });

    if (validatedFields.success) {
      const { title, date, location } = validatedFields.data;
      const formattedDate = new Date(date).toISOString();
      const eventId = crypto.randomUUID();

      await sql`
            INSERT INTO events (id, title, date, location, admin_id)
            VALUES (${eventId}, ${title}, ${formattedDate}, ${location}, ${adminId})
        `;

      redirect(`/events/${eventId}`);
    } else {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to create event.',
      };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        default:
          return {
            errors: {},
            message: 'Failed to create event.',
          };
      }
    }
    throw error;
  }
}
