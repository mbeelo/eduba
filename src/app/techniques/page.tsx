import { Metadata } from 'next'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Traditional Scribe Training',
  description: 'Learn the ancient method that scribes, scholars, and students have used for centuries: read, write from memory, and learn from differences.',
  openGraph: {
    title: 'Traditional Scribe Training | Eduba',
    description: 'Learn the ancient method that scribes, scholars, and students have used for centuries: read, write from memory, and learn from differences.',
  },
}

export default function TechniquesPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="bg-white clean-card" style={{ borderRadius: 0, marginBottom: '2rem' }} role="banner">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-lg" style={{ color: 'var(--accent)' }}>
              eduba
            </span>
          </Link>
          <Link href="/dashboard">
            <button className="button-subtle text-xs sm:text-sm">
              Dashboard
            </button>
          </Link>
        </Container>
      </header>

      <main role="main" id="main-content">
        <Container>
          {/* Hero Section */}
          <Section className="py-16">
            <div className="max-w-4xl mx-auto">
              <Heading level={1} className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                Traditional Scribe Training: The Ancient Art of Learning
              </Heading>
              <BodyText className="text-xl leading-relaxed mb-8" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                For millennia, scribes, scholars, and students have used the same proven method to master important texts:
                read carefully, write from memory, and learn from the differences. Eduba brings this time-tested
                approach to modern learners seeking deep engagement with great works.
              </BodyText>
            </div>
          </Section>

          {/* The Three-Phase Method Section */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                The Three-Phase Scribe Method
              </Heading>
              <BodyText className="text-lg leading-relaxed mb-6">
                Eduba uses the same method that has trained minds for thousands of years, from ancient
                monastery scriptoriums to classical academies. This isn't a modern invention—it's
                the time-tested approach that created the world's greatest scholars and scribes.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Phase 1: Careful Reading
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Like a medieval monk preparing to copy a sacred text, you begin by reading the passage
                with complete attention. This isn't casual reading—you're preparing to reproduce
                the text exactly as written. Every word, every comma, every turn of phrase must
                be absorbed with the precision of a master scribe.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Phase 2: Writing from Memory
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Now comes the crucial test: can you reproduce the text from memory alone? This is
                exactly what scribes did when copying important manuscripts. You type the passage
                as accurately as possible, relying only on what you've internalized from your
                careful reading. This active recall process is where real learning happens.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Phase 3: Learning from Differences
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Like a master checking an apprentice's work, Eduba shows you exactly where your
                memory differed from the original. Every missing word, every substitution, every
                addition is highlighted. This detailed comparison teaches you which parts need
                more attention, just as scribes learned from their copying errors.
              </BodyText>
            </div>
          </Section>

          {/* Historical Context Section */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                A Method Tested by History
              </Heading>
              <BodyText className="text-lg leading-relaxed mb-6">
                This isn't just another study technique—it's how knowledge was preserved and transmitted
                for thousands of years before printing presses existed. From ancient Egyptian scribes
                copying hieroglyphs to medieval monks preserving classical texts, the method was always
                the same: read with care, write from memory, learn from differences.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Medieval Scriptoriums
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                In monastery scriptoriums, young monks learned to copy sacred texts with perfect accuracy.
                They would study a passage, then attempt to write it from memory. Master scribes would
                check their work, pointing out every error. This process—reading, writing, correcting—
                created both accurate manuscripts and deeply educated minds.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Classical Education
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Greek and Roman students learned rhetoric and literature the same way. They would read
                a speech by Cicero or a passage from Homer, then write it out from memory. Teachers
                would mark their errors, and students would practice until they could reproduce the
                text perfectly. This training created the greatest orators and writers of antiquity.
              </BodyText>
            </div>
          </Section>

          {/* Why It Works Section */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Why Traditional Scribe Training Works
              </Heading>
              <BodyText className="text-lg leading-relaxed mb-6">
                This method survived thousands of years for a simple reason: it works better than any
                alternative for deep learning. When you have to reproduce a text from memory, you can't
                just skim or passively read. Every word matters. Every phrase must be internalized.
                This demands the kind of attention that creates lasting understanding.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Precision Over Speed
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Modern education often emphasizes covering lots of material quickly. Scribe training
                takes the opposite approach: deep engagement with fewer, carefully chosen texts.
                A monk who perfectly copied ten pages of scripture learned more than a student who
                skimmed a hundred pages. Quality over quantity has always been the path to mastery.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Learning Through Correction
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                The most powerful learning happens when you see exactly where your memory failed.
                Ancient scribes learned more from their errors than from their successes. When Eduba
                shows you that you wrote &ldquo;principle&rdquo; instead of &ldquo;principal,&rdquo; or missed
                a comma, or substituted &ldquo;that&rdquo; for &ldquo;which,&rdquo; you're getting the same precise
                feedback that trained the greatest minds in history.
              </BodyText>
            </div>
          </Section>

          {/* What You'll Develop Section */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Skills You'll Develop as a Digital Scribe
              </Heading>
              <BodyText className="text-lg leading-relaxed mb-6">
                Traditional scribe training doesn't just help you memorize passages—it develops
                fundamental skills that transfer to all forms of learning and thinking. These are
                the same capabilities that made ancient scribes the most educated people of their time.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Precision and Attention to Detail
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                When you know you'll have to reproduce a text exactly, you learn to notice every
                detail. Commas matter. Word choice matters. Punctuation matters. This training in
                precision carries over to all your reading and writing, making you more careful
                and accurate in everything you do.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Deep Reading and Comprehension
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                You can't reproduce what you don't understand. Scribe training forces you to
                engage with meaning, not just words. You'll find yourself understanding passages
                more deeply because you have to internalize not just what authors say, but how
                they say it. This is reading at its most intensive level.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Patience and Persistence
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                In our age of instant gratification, scribe training teaches the value of patient,
                sustained effort. Master scribes didn't rush. They worked carefully, corrected
                their errors, and practiced until they achieved accuracy. This patience becomes
                a transferable skill that improves everything you learn.
              </BodyText>
            </div>
          </Section>

          {/* Getting Started Section */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Starting Your Scribe Training
              </Heading>
              <BodyText className="text-lg leading-relaxed mb-6">
                Like any apprentice scribe, you should start with shorter, simpler texts before
                attempting longer passages. Choose content that genuinely interests you—motivation
                matters as much in digital scriptoriums as it did in medieval monasteries.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Embrace the Process
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Don't expect perfection immediately. Even master scribes made errors when learning.
                The goal isn't to be flawless on your first attempt—it's to improve with each
                cycle of reading, writing, and correcting. Trust the process that has worked for
                thousands of years.
              </BodyText>

              <div className="bg-gray-50 p-6 rounded-lg mt-8" style={{ background: 'var(--background-soft)' }}>
                <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                  Begin Your Digital Scribe Training
                </Heading>
                <BodyText className="text-base mb-6">
                  Ready to learn the way scholars have learned for millennia? Start with any passage
                  that interests you and experience the power of traditional scribe training adapted
                  for the digital age.
                </BodyText>
                <Link href="/dashboard">
                  <button className="button-primary px-6 py-3 text-base font-medium">
                    Start Training
                  </button>
                </Link>
              </div>

              <p className="label-mono text-xs text-center mt-8 pt-4 border-t" style={{ color: 'var(--foreground)', opacity: 0.5, borderColor: 'var(--border)' }}>
                Last updated: January 2026
              </p>
            </div>
          </Section>
        </Container>
      </main>

      <Footer />
    </div>
  )
}