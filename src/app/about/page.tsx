import { Metadata } from 'next'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Traditional Scribe Training',
  description: 'Learn how the ancient method of scribes—reading, writing from memory, and correcting errors—creates deeper learning than any modern technique.',
  openGraph: {
    title: 'About Traditional Scribe Training | Eduba',
    description: 'Learn how the ancient method of scribes—reading, writing from memory, and correcting errors—creates deeper learning than any modern technique.',
  },
}

export default function AboutPage() {
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
                Traditional Scribe Training: Learning Like the Masters
              </Heading>
              <BodyText className="text-xl leading-relaxed mb-8" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                For thousands of years, before printing presses and digital storage, human knowledge
                was preserved by scribes who used a simple but powerful method: read carefully, write
                from memory, learn from mistakes. Eduba brings this time-tested approach to modern learners.
              </BodyText>
            </div>
          </Section>

          {/* The Scribe Tradition */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                The Ancient Scribe Tradition
              </Heading>

              <BodyText className="text-lg leading-relaxed mb-6">
                Long before printing presses, all important knowledge was preserved by scribes who copied
                texts by hand. But this wasn&rsquo;t mechanical copying—it was a form of deep learning.
                Master scribes trained apprentices using the same method Eduba uses today: read carefully,
                write from memory, learn from every error.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Medieval Scriptoriums
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                In monastery scriptoriums, monks didn&rsquo;t just copy texts—they internalized them.
                A monk would read a passage of scripture, then attempt to write it from memory.
                Master scribes would check every word, marking every error. Through this process of
                reading, writing, and correcting, monks became living libraries of sacred knowledge.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Classical Scholars and Orators
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Greek and Roman students learned the same way. They would study speeches by great orators
                like Demosthenes or Cicero, then write them out from memory. Teachers would mark their
                mistakes, and students would practice until they achieved perfect accuracy. This training
                created minds capable of precise thought and eloquent expression.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Why the Method Survived
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                This wasn&rsquo;t the only way to learn—but it was the best way. Societies that used scribe
                training produced the most educated, articulate, and thoughtful individuals. The method
                survived for thousands of years because it worked better than any alternative for creating
                deep, lasting understanding of important texts.
              </BodyText>
            </div>
          </Section>

          {/* Why Scribe Training Works */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Why Traditional Scribe Training Works
              </Heading>

              <BodyText className="text-lg leading-relaxed mb-6">
                Modern neuroscience has confirmed what scribes knew intuitively: the act of writing
                from memory creates deeper learning than any other method. When you have to reproduce
                a text exactly, your brain processes it differently than when you just read it.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                The Power of Active Recall
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                When you attempt to write a passage from memory, you force your brain to actively
                reconstruct the text. This retrieval process strengthens memory pathways far more
                effectively than passive reading or reviewing. Brain scans show that recall practice
                creates lasting changes in brain structure that passive study cannot achieve.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Learning from Errors
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                The most powerful learning happens when you see exactly where your memory failed.
                When Eduba shows you that you wrote &ldquo;affect&rdquo; instead of &ldquo;effect&rdquo;
                or missed a crucial comma, your brain creates a strong correction signal. This error-based
                learning is far more effective than getting things right the first time.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Deep Attention and Focus
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Knowing you&rsquo;ll have to reproduce a text exactly forces a level of attention
                that normal reading never requires. Every word, every punctuation mark, every subtle
                detail becomes important. This intensive focus creates the kind of deep engagement
                with text that modern students rarely experience, but that was standard for ancient scholars.
              </BodyText>
            </div>
          </Section>

          {/* Cognitive Benefits */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Cognitive Benefits of Memory Training
              </Heading>

              <BodyText className="text-lg leading-relaxed mb-6">
                Memory training provides benefits that extend far beyond the specific material being
                memorized. Research demonstrates that regular memorization practice enhances multiple
                cognitive functions and contributes to overall brain health.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Enhanced Working Memory Capacity
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Working memory—your ability to hold and manipulate information in your mind—is fundamental
                to reasoning, problem-solving, and comprehension. Memory training exercises strengthen
                working memory capacity, leading to improvements in academic performance, professional
                effectiveness, and everyday cognitive tasks.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Improved Attention and Concentration
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                The focused attention required for memorization strengthens your ability to concentrate
                for extended periods and resist distractions. This enhanced attention control benefits
                all areas of learning and performance, from reading comprehension to complex problem-solving.
                In our age of constant digital distraction, this benefit is particularly valuable.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Accelerated Learning and Pattern Recognition
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                A well-stocked memory provides more raw material for pattern recognition and analogical
                thinking. When you have memorized many examples of excellent writing, persuasive arguments,
                or insightful observations, you develop an intuitive sense for quality and can recognize
                similar patterns in new material. This leads to faster learning and better judgment
                across diverse domains.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Protection Against Cognitive Decline
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Studies suggest that intellectually demanding activities like memorization may help
                maintain cognitive function in aging. The mental exercise involved in learning and
                retrieving complex information appears to build cognitive reserve—a buffer against
                age-related cognitive decline. While not a guarantee, regular memory training contributes
                to lifelong mental fitness.
              </BodyText>
            </div>
          </Section>

          {/* Why Eduba Works */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                How Eduba Applies Memory Science
              </Heading>

              <BodyText className="text-lg leading-relaxed mb-6">
                Eduba&rsquo;s design incorporates decades of memory research to create an optimal learning
                environment. Every aspect of the system—from content selection to practice timing—is
                based on scientific principles of effective memorization.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Three-Phase Learning Cycle
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                The Read-Recall-Results cycle mirrors the most effective study techniques identified
                by cognitive research. Initial encoding (reading) is followed immediately by active
                retrieval (recall), with detailed feedback (results) to guide future practice. This
                cycle maximizes both learning efficiency and long-term retention.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Progressive Difficulty and Desirable Difficulty
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Passages within each learning path are arranged by difficulty, allowing you to build
                skills gradually. The system maintains &ldquo;desirable difficulty&rdquo;—challenging
                enough to promote learning but not so difficult as to cause frustration. This balance
                optimizes both motivation and memory formation.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Curated Content for Cultural Literacy
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                The passages in Eduba were selected not just for their memorization value but for their
                contribution to cultural literacy and critical thinking. By memorizing works from diverse
                traditions and time periods, you develop a rich foundation for understanding literature,
                history, philosophy, and contemporary discourse.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Immediate Feedback and Error Correction
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Research shows that immediate feedback is crucial for effective learning. Eduba provides
                word-by-word analysis of your recall attempts, helping you identify specific areas for
                improvement. This detailed feedback accelerates the learning process and helps you
                develop accurate, reliable memories.
              </BodyText>
            </div>
          </Section>

          {/* Addressing Common Concerns */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Addressing Common Concerns About Memorization
              </Heading>

              <BodyText className="text-lg leading-relaxed mb-6">
                In an era of external information storage, some question the value of memorization.
                However, research and experience demonstrate that memorization and critical thinking
                are complementary, not competing, activities.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                &ldquo;Why memorize when I can just look it up?&rdquo;
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Having information readily available in memory changes how you think about problems
                and make connections. Memorized knowledge is instantly accessible for reasoning,
                comparison, and creative combination. External sources require time and attention
                to access, interrupting the flow of thought. Moreover, you can only look up what
                you already know exists—memorized knowledge helps you recognize opportunities for
                further research.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                &ldquo;Doesn&rsquo;t memorization discourage creativity?&rdquo;
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                The opposite is true. Creativity requires raw materials to work with—ideas, patterns,
                and examples that can be combined in novel ways. Many of history&rsquo;s most creative
                individuals, from Shakespeare to Mozart to Einstein, had vast stores of memorized
                material to draw upon. Memorization provides the vocabulary for creative expression.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                &ldquo;Is memorization just rote learning?&rdquo;
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Quality memorization involves deep engagement with meaning, not mechanical repetition.
                When you memorize a passage from Shakespeare or Lincoln, you&rsquo;re not just storing
                words—you&rsquo;re internalizing sophisticated ways of thinking and expressing ideas.
                This kind of memorization enhances understanding rather than replacing it.
              </BodyText>
            </div>
          </Section>

          {/* Getting Started */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                The Journey of Memory Development
              </Heading>

              <BodyText className="text-lg leading-relaxed mb-6">
                Memory training is a skill that improves with practice. Like physical fitness, it
                requires consistent effort but provides increasing returns as you develop your capacity.
                The passages in Eduba are carefully chosen to provide both challenge and reward,
                helping you build confidence while expanding your intellectual horizons.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Start Where You Are
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Whether you&rsquo;re a student seeking academic improvement, a professional looking
                to enhance your communication skills, or simply someone who values the life of the
                mind, memory training offers benefits that compound over time. Each passage you
                memorize makes the next one easier, and each learning path completed opens new
                possibilities for growth and understanding.
              </BodyText>

              <div className="bg-gray-50 p-6 rounded-lg mt-8" style={{ background: 'var(--background-soft)' }}>
                <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                  Begin Your Memory Training Journey
                </Heading>
                <BodyText className="text-base mb-6">
                  Discover how memory training can enhance your thinking, learning, and cultural
                  understanding. Start with any learning path that interests you—the techniques
                  and benefits will transfer to all areas of your intellectual life.
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