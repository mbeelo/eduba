import { Metadata } from 'next'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Masters Worth Copying',
  description: 'Discover the authors whose works ancient scribes preserved through careful copying. Learn why these minds deserve the deep attention of traditional scribe training.',
  openGraph: {
    title: 'Masters Worth Copying | Eduba',
    description: 'Discover the authors whose works ancient scribes preserved through careful copying. Learn why these minds deserve the deep attention of traditional scribe training.',
  },
}

export default function AuthorsPage() {
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
                Masters Worth Copying: The Authors Scribes Preserved
              </Heading>
              <BodyText className="text-xl leading-relaxed mb-8" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                For centuries, scribes chose which voices deserved preservation through careful copying. The authors
                in Eduba represent minds so exceptional that generations of scribes devoted their lives to reproducing
                their words with perfect accuracy. Understanding these masters enriches your own scribe training
                and deepens your appreciation for texts worth memorizing.
              </BodyText>
            </div>
          </Section>

          {/* The Stoics */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                The Stoics: Philosophy for Daily Life
              </Heading>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Marcus Aurelius (121-180 CE)
                  </Heading>
                  <BodyText className="text-base leading-relaxed mb-4">
                    The philosopher emperor of Rome, Marcus Aurelius wrote his &ldquo;Meditations&rdquo; as personal
                    reflections never intended for publication. His thoughts on duty, mortality, and virtue
                    offer profound insights into living with purpose and resilience. As both ruler and
                    philosopher, his words carry the weight of lived experience in positions of ultimate
                    responsibility.
                  </BodyText>
                </div>

                <div>
                  <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Seneca (4 BCE - 65 CE)
                  </Heading>
                  <BodyText className="text-base leading-relaxed mb-4">
                    Lucius Seneca the Younger was a Roman statesman, dramatist, and Stoic philosopher whose
                    letters and essays provide practical wisdom for navigating life&rsquo;s challenges. His
                    emphasis on reason over emotion and preparation for adversity makes his teachings
                    particularly relevant for modern readers seeking mental resilience.
                  </BodyText>
                </div>
              </div>

              <div className="mb-8">
                <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                  Epictetus (50-135 CE)
                </Heading>
                <BodyText className="text-base leading-relaxed">
                  Born into slavery, Epictetus developed a philosophy centered on the fundamental distinction
                  between what is within our control and what is not. His teachings, recorded by his student
                  Arrian in the &ldquo;Discourses&rdquo; and &ldquo;Enchiridion,&rdquo; emphasize personal
                  freedom through acceptance and focus. His life story—from slave to influential teacher—embodies
                  the Stoic principle that external circumstances cannot diminish our inner dignity.
                </BodyText>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg" style={{ background: 'var(--background-soft)' }}>
                <Heading level={4} className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  Why Study the Stoics?
                </Heading>
                <BodyText className="text-base">
                  Stoic philosophy provides practical tools for managing stress, making decisions, and
                  maintaining perspective. Their emphasis on virtue, wisdom, and emotional regulation
                  remains as relevant today as it was 2,000 years ago. Memorizing their key insights
                  gives you instant access to their wisdom during challenging moments.
                </BodyText>
              </div>
            </div>
          </Section>

          {/* The Founders */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                The Founders: Architects of Democracy
              </Heading>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Thomas Jefferson (1743-1826)
                  </Heading>
                  <BodyText className="text-base leading-relaxed mb-4">
                    The primary author of the Declaration of Independence, Jefferson was a polymath whose
                    interests spanned politics, architecture, science, and philosophy. His eloquent
                    articulation of human rights and democratic principles helped establish the philosophical
                    foundation of American government. His writings demonstrate the power of clear,
                    principled thinking applied to the practical challenges of governance.
                  </BodyText>
                </div>

                <div>
                  <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Abraham Lincoln (1809-1865)
                  </Heading>
                  <BodyText className="text-base leading-relaxed mb-4">
                    Self-educated and renowned for his moral clarity, Lincoln guided America through its
                    greatest crisis. His speeches and letters reveal a mind capable of profound empathy
                    and unwavering commitment to justice. The Gettysburg Address and Second Inaugural
                    Address remain masterpieces of political rhetoric that elevated public discourse
                    to the level of poetry and philosophy.
                  </BodyText>
                </div>
              </div>

              <div className="mb-8">
                <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                  Benjamin Franklin (1706-1790)
                </Heading>
                <BodyText className="text-base leading-relaxed">
                  Diplomat, inventor, writer, and statesman, Franklin embodied the Enlightenment ideal
                  of rational inquiry applied to human affairs. His wit and wisdom, captured in Poor
                  Richard&rsquo;s Almanack and his diplomatic correspondence, demonstrate how practical
                  intelligence and moral insight can shape a nation&rsquo;s character. His approach to
                  self-improvement and civic engagement remains a model for active citizenship.
                </BodyText>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg" style={{ background: 'var(--background-soft)' }}>
                <Heading level={4} className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  The Founders&rsquo; Legacy
                </Heading>
                <BodyText className="text-base">
                  The American Founders created documents and established principles that have influenced
                  democratic movements worldwide. Their careful balance of idealism and pragmatism,
                  their commitment to reasoned debate, and their recognition of human fallibility
                  created a framework for self-government that continues to evolve and inspire.
                </BodyText>
              </div>
            </div>
          </Section>

          {/* The Poets */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                The Poets: Masters of Language and Insight
              </Heading>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    William Shakespeare (1564-1616)
                  </Heading>
                  <BodyText className="text-base leading-relaxed mb-4">
                    Widely regarded as the greatest writer in the English language, Shakespeare&rsquo;s
                    insights into human nature remain unmatched. His plays and sonnets explore themes
                    of love, ambition, betrayal, and redemption with psychological depth that anticipates
                    modern understanding. Memorizing his most famous passages provides access to the
                    full range of human experience expressed in incomparable language.
                  </BodyText>
                </div>

                <div>
                  <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Emily Dickinson (1830-1886)
                  </Heading>
                  <BodyText className="text-base leading-relaxed mb-4">
                    Though she lived in relative seclusion, Dickinson&rsquo;s poetry reveals an
                    extraordinarily acute observer of both inner and outer worlds. Her innovative use
                    of language, unconventional punctuation, and profound spiritual questioning
                    created a unique voice in American literature. Her compressed, intense verses
                    reward careful memorization and contemplation.
                  </BodyText>
                </div>
              </div>

              <div className="mb-8">
                <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                  Robert Frost (1874-1963)
                </Heading>
                <BodyText className="text-base leading-relaxed">
                  Master of traditional forms and colloquial language, Frost captured the essence of
                  rural New England while exploring universal themes of choice, mortality, and belonging.
                  His apparent simplicity conceals sophisticated philosophical and psychological insights.
                  Poems like &ldquo;The Road Not Taken&rdquo; and &ldquo;Stopping by Woods on a Snowy Evening&rdquo;
                  have become part of the American consciousness, demonstrating poetry&rsquo;s power to
                  illuminate life&rsquo;s fundamental questions.
                </BodyText>
              </div>
            </div>
          </Section>

          {/* The Philosophers */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                The Philosophers: Seekers of Wisdom and Truth
              </Heading>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Plato (428-348 BCE)
                  </Heading>
                  <BodyText className="text-base leading-relaxed mb-4">
                    Student of Socrates and teacher of Aristotle, Plato established the Academy and
                    created philosophical dialogues that continue to influence Western thought. His
                    theory of Forms, examination of justice, and insights into education and governance
                    provide frameworks for understanding reality, ethics, and the ideal society.
                    His allegory of the cave remains one of philosophy&rsquo;s most powerful metaphors.
                  </BodyText>
                </div>

                <div>
                  <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                    Aristotle (384-322 BCE)
                  </Heading>
                  <BodyText className="text-base leading-relaxed mb-4">
                    Plato&rsquo;s student who became Alexander the Great&rsquo;s tutor, Aristotle created
                    systematic approaches to logic, ethics, politics, and natural science. His concept
                    of the golden mean, analysis of friendship, and exploration of human flourishing
                    (eudaimonia) provide practical wisdom for living well. His influence extends
                    across virtually every field of human knowledge.
                  </BodyText>
                </div>
              </div>

              <div className="mb-8">
                <Heading level={3} className="text-2xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                  Confucius (551-479 BCE)
                </Heading>
                <BodyText className="text-base leading-relaxed">
                  The great Chinese philosopher whose teachings on ethics, morality, and social harmony
                  have influenced East Asian culture for over two millennia. His emphasis on virtue,
                  respect for tradition, and the importance of education created a philosophical
                  framework that values both personal cultivation and social responsibility. The
                  Analects preserve his wisdom in memorable, practical maxims.
                </BodyText>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg" style={{ background: 'var(--background-soft)' }}>
                <Heading level={4} className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  The Enduring Value of Philosophy
                </Heading>
                <BodyText className="text-base">
                  Philosophy provides tools for critical thinking, ethical reasoning, and understanding
                  the fundamental questions of human existence. By memorizing key philosophical insights,
                  you develop a mental toolkit for navigating complex decisions and understanding
                  different perspectives on life&rsquo;s biggest questions.
                </BodyText>
              </div>
            </div>
          </Section>

          {/* Why These Authors Matter */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Why Scribes Chose These Masters
              </Heading>

              <BodyText className="text-lg leading-relaxed mb-6">
                Ancient scribes didn't copy every text—they selected works of exceptional value, spending
                years perfecting each reproduction. The authors in Eduba represent voices so profound that
                scribes across cultures deemed them worthy of preservation through meticulous copying.
                These masters faced the same fundamental human challenges we encounter today: how to live
                meaningfully, how to govern justly, how to express truth beautifully, and how to think
                clearly about complex problems.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Cultural Literacy and Shared References
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Many of these passages form part of our common cultural vocabulary. Knowing them
                enhances your ability to understand literature, political discourse, and intellectual
                conversation. When you recognize a reference to Hamlet&rsquo;s soliloquy or Lincoln&rsquo;s
                Gettysburg Address, you&rsquo;re connecting with a shared heritage of human thought and expression.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Timeless Wisdom for Modern Challenges
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                The insights of these great minds remain relevant because they address the unchanging
                aspects of human nature and the human condition. Whether you&rsquo;re facing personal
                difficulties, professional challenges, or trying to understand current events, the
                wisdom of the ages provides perspective and guidance.
              </BodyText>

              <div className="bg-gray-50 p-6 rounded-lg mt-8" style={{ background: 'var(--background-soft)' }}>
                <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                  Train Like Ancient Scribes with Modern Masters
                </Heading>
                <BodyText className="text-base mb-6">
                  Begin your scribe training with passages from history's greatest minds. Each learning path
                  in Eduba provides carefully chosen texts worthy of the devoted attention that scribes
                  gave to the masterworks they preserved.
                </BodyText>
                <Link href="/dashboard">
                  <button className="button-primary px-6 py-3 text-base font-medium">
                    Explore Learning Paths
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