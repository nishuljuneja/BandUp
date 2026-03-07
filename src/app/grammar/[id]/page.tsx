import type { Metadata } from 'next';
import PageClient from './GrammarLessonClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const title = id
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: title + ' — English Grammar Lesson',
    description: 'Learn ' + title.toLowerCase() + ' with clear explanations, examples and interactive exercises. Ideal for IELTS, CELPIP, PTE and TOEFL grammar preparation.',
    alternates: { canonical: '/grammar/' + id },
  };
}

export default function Page() {
  return <PageClient />;
}
