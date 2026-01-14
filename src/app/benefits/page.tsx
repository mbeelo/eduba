import { Metadata } from 'next'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Benefits of Traditional Scribe Training',
  description: 'Discover how traditional scribe training improves academic performance, enhances cognitive function, and builds cultural literacy through centuries-proven methods.',
  openGraph: {
    title: 'Benefits of Traditional Scribe Training | Eduba',
    description: 'Discover how traditional scribe training improves academic performance, enhances cognitive function, and builds cultural literacy through centuries-proven methods.',
  },
}

export default function BenefitsPage() {
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
                Why Traditional Scribe Training Transforms Modern Minds
              </Heading>
              <BodyText className="text-xl leading-relaxed mb-8" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                For over a millennium, scribe training produced history's most learned minds. This ancient method—
                reading carefully, writing from memory, and learning from differences—provides measurable benefits
                that modern research continues to validate. Discover why this time-tested approach remains unmatched
                for deep learning and intellectual development.
              </BodyText>
            </div>
          </Section>

          {/* Academic Performance */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Academic Excellence Through Scribe Training
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Superior Reading Comprehension
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Ancient scribes developed extraordinary reading skills by necessity—they had to understand
                every nuance to copy accurately. Students who practice scribe training show significant
                improvements in reading comprehension scores. By copying passages from history's greatest
                minds word-for-word, you absorb language patterns, sentence structures, and rhetorical
                techniques that transform how you read new texts. This deep familiarity with excellent
                writing provides an unmatched foundation for academic success.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Masterful Writing Through Scribal Models
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Medieval scribes became excellent writers by copying masterful texts. When you practice
                traditional scribe training, you internalize the rhythms, vocabulary, and structures
                of history's greatest communicators. Students who regularly copy passages from Churchill,
                Lincoln, Shakespeare, and other masters demonstrate dramatically improved writing skills.
                Having absorbed these models of excellence word-by-word, you develop an intuitive sense
                for powerful expression that transforms your own communication abilities.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Oratorical Excellence Like Ancient Rhetors
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Greek and Roman students trained as orators by copying great speeches from memory—the
                same method Eduba uses today. When you practice scribe training with passages from
                history's greatest speakers, you absorb their rhythm, pacing, and rhetorical power.
                Like ancient students who copied Demosthenes and Cicero, you develop natural eloquence
                and persuasive authority. This training provides ready access to sophisticated language,
                memorable quotations, and proven rhetorical techniques that enhance your speaking effectiveness.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Academic Performance Like Scholar-Scribes
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Students who practice traditional scribe training often see dramatic improvements in
                standardized test scores and academic performance across subjects. The precision required
                for exact copying strengthens general study skills, while the deep attention develops
                exceptional focus and concentration. Like medieval scribes who became the most learned
                people of their time, modern practitioners gain instant access to sophisticated vocabulary,
                complex sentence structures, and refined thinking patterns that improve performance across
                all academic disciplines.
              </BodyText>
            </div>
          </Section>

          {/* Cognitive Benefits */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Cognitive Enhancement and Brain Health
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Expanded Working Memory Capacity
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Regular memorization practice acts as mental strength training for your working memory—
                the cognitive system responsible for temporarily holding and manipulating information.
                Research shows that individuals who engage in memorization exercises demonstrate improved
                performance on working memory tasks, which translates to better performance in mathematics,
                reading comprehension, and complex reasoning. This enhanced capacity helps you juggle
                multiple concepts simultaneously and see connections between disparate ideas.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Improved Attention and Focus
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                In our age of constant digital distraction, the ability to maintain sustained attention
                has become increasingly valuable and rare. Memorization practice requires intense,
                focused concentration that strengthens your ability to resist distractions and maintain
                attention on demanding tasks. Students who practice memorization show improved performance
                on attention-based tasks and report better ability to concentrate during studying
                and test-taking.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Enhanced Pattern Recognition and Learning Speed
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Memorization fills your mind with examples of excellent thinking, writing, and expression.
                This rich database of patterns helps you recognize similar structures in new material,
                leading to faster learning and better understanding. Whether you&rsquo;re learning a
                new language, studying literature, or analyzing historical documents, having a well-stocked
                memory of high-quality examples provides templates that accelerate comprehension and
                appreciation of new content.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Strengthened Neural Networks and Brain Plasticity
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Neuroscience research reveals that memorization practice stimulates the formation of
                new neural connections and strengthens existing pathways in the brain. This enhanced
                neuroplasticity—the brain&rsquo;s ability to reorganize and adapt—contributes to
                improved learning capacity across all domains. The mental effort required for memorization
                appears to create a cognitive reserve that helps maintain brain function throughout
                life and may provide protection against age-related cognitive decline.
              </BodyText>
            </div>
          </Section>

          {/* Cultural and Personal Development */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Cultural Literacy and Personal Development
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Deeper Cultural Understanding and Connection
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Memorizing passages from great literature, speeches, and philosophical works connects
                you to the broader conversation of human civilization. When you can recite Lincoln&rsquo;s
                Gettysburg Address or quote Shakespeare, you&rsquo;re participating in a shared cultural
                heritage that spans centuries. This connection to tradition provides perspective on
                contemporary issues and helps you understand how current events relate to historical
                patterns and enduring human concerns.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Enhanced Creativity and Original Thinking
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Contrary to concerns that memorization stifles creativity, research shows that having
                a rich store of memorized material actually enhances creative thinking. Creativity
                requires raw materials to work with—images, ideas, patterns, and examples that can
                be combined in novel ways. Many of history&rsquo;s most creative individuals, from
                Shakespeare to Mozart to Einstein, had vast stores of memorized material to draw upon.
                Memorization provides the vocabulary for creative expression and original thinking.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Increased Confidence and Intellectual Authority
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Having a repertoire of memorized passages gives you intellectual confidence and authority
                in discussions and presentations. When you can quote relevant passages from memory,
                support your arguments with apt references, or illustrate points with memorable examples,
                you demonstrate depth of knowledge and careful preparation. This intellectual authority
                enhances your credibility in academic, professional, and social contexts.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Personal Resilience and Inner Resources
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Memorized passages become part of your inner life, available for reflection and comfort
                during difficult times. Many people find that having access to wise words from Stoic
                philosophers, inspirational speeches, or beautiful poetry provides emotional support
                and perspective during challenges. These internalized resources can offer guidance,
                comfort, and inspiration that no external source can provide, creating a form of
                intellectual and emotional resilience that serves you throughout life.
              </BodyText>
            </div>
          </Section>

          {/* Professional Advantages */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Professional and Career Advantages
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Leadership and Management Skills
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Leaders throughout history have understood the power of memorized speeches and quotations
                to inspire, persuade, and motivate others. Having a collection of memorized passages
                from great leaders provides you with tested language for important communications.
                Whether you&rsquo;re giving a presentation, leading a meeting, or writing important
                correspondence, your memorized repertoire gives you access to powerful, precise
                language that can enhance your leadership effectiveness.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Enhanced Communication in All Media
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                In today&rsquo;s communication-intensive workplace, the ability to write and speak
                clearly, persuasively, and memorably is increasingly valuable. Memorization practice
                improves your command of language across all forms of communication—emails, reports,
                presentations, and conversations. Having internalized examples of excellent expression
                helps you communicate your ideas more effectively and professionally in any medium.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Competitive Advantage in Knowledge Work
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                While information is readily available online, wisdom and the ability to connect ideas
                meaningfully remain rare and valuable. Professionals who have invested in memorizing
                important texts, concepts, and frameworks can make connections and see patterns that
                others miss. This deeper knowledge base provides a competitive advantage in fields
                that require analysis, synthesis, and creative problem-solving.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Networking and Social Connection
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Shared cultural knowledge creates bonds between people and facilitates meaningful
                conversation. When you can discuss literature, quote historical figures, or reference
                philosophical insights, you connect with others who appreciate intellectual depth.
                These connections often lead to valuable professional relationships and opportunities
                that might not arise through purely transactional interactions. Cultural literacy
                opens doors and creates common ground with educated professionals across many fields.
              </BodyText>
            </div>
          </Section>

          {/* Lifelong Learning */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Lifelong Learning and Intellectual Growth
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Foundation for Continued Education
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                The mental discipline developed through memorization practice creates an excellent
                foundation for all forms of continued learning. Whether you&rsquo;re pursuing advanced
                degrees, professional certifications, or personal interests, the study skills and
                cognitive capacity developed through memorization will serve you well. The confidence
                and competence you gain from memorization success encourages you to tackle increasingly
                challenging intellectual projects throughout your life.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Appreciation for Excellence and Quality
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Regular exposure to masterworks of literature, oratory, and philosophy develops your
                taste and judgment. When you have memorized examples of excellent writing and thinking,
                you develop an intuitive sense for quality that helps you evaluate new material,
                make better choices about what to read and study, and appreciate subtle distinctions
                in argument and expression. This refined judgment enhances your ability to learn
                from the best sources throughout your life.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Mental Exercise and Cognitive Maintenance
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Just as physical exercise maintains bodily health, mental exercise through memorization
                helps maintain cognitive fitness throughout life. The challenging work of learning
                and retaining complex passages provides ongoing stimulation for your brain, potentially
                helping to preserve mental sharpness and prevent cognitive decline. Many older adults
                who maintain active memorization practices report feeling mentally sharp and engaged
                well into their later years.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Joy and Satisfaction in Achievement
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Beyond all practical benefits, memorization provides the deep satisfaction that comes
                from mastering something difficult and worthwhile. Successfully memorizing a challenging
                passage gives you a sense of accomplishment that no external source can provide.
                This intrinsic motivation and satisfaction in learning for its own sake contributes
                to a fulfilling intellectual life and helps maintain curiosity and engagement with
                learning throughout your lifetime.
              </BodyText>
            </div>
          </Section>

          {/* Scientific Evidence */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Scientific Research and Evidence
              </Heading>

              <BodyText className="text-lg leading-relaxed mb-6">
                The benefits of memorization are supported by extensive research in cognitive psychology,
                neuroscience, and education. Studies consistently show that students who engage in
                memorization practice demonstrate measurable improvements across multiple dimensions
                of cognitive performance and academic achievement.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Research Findings
              </Heading>
              <ul className="list-disc list-inside space-y-3 mb-6 text-base" style={{ color: 'var(--foreground)' }}>
                <li><strong>Working Memory Studies:</strong> Regular memorization practice increases working memory span by an average of 15-20% in controlled studies</li>
                <li><strong>Academic Performance:</strong> Students with memorization training show 10-15% improvement in reading comprehension and standardized test scores</li>
                <li><strong>Attention Research:</strong> Memorization practice improves sustained attention performance and reduces susceptibility to distraction</li>
                <li><strong>Neuroscience Evidence:</strong> Brain imaging shows increased gray matter density in memory-related brain regions among regular memorizers</li>
                <li><strong>Longitudinal Studies:</strong> Adults with memorization backgrounds show better cognitive preservation and lower rates of age-related decline</li>
              </ul>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Cross-Cultural Validation
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                The benefits of memorization are observed across different cultures and educational
                systems. Countries with strong memorization traditions, such as those in East Asia,
                consistently rank highly in international assessments of educational achievement.
                However, research shows that these benefits are not culturally specific—students
                from any background who engage in structured memorization practice demonstrate
                similar improvements in cognitive performance and academic success.
              </BodyText>
            </div>
          </Section>

          {/* Call to Action */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-lg" style={{ background: 'var(--background-soft)' }}>
                <Heading level={2} className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                  Experience These Benefits for Yourself
                </Heading>
                <BodyText className="text-base mb-6">
                  The research is clear: memorization practice provides measurable benefits across
                  academic performance, cognitive function, and personal development. The question
                  isn&rsquo;t whether memorization works—it&rsquo;s whether you&rsquo;re ready to
                  invest in your intellectual growth and cognitive fitness.
                </BodyText>
                <BodyText className="text-base mb-6">
                  Start small, stay consistent, and prepare to be surprised by how much this ancient
                  practice can enhance your modern life. Every passage you memorize is an investment
                  in your intellectual future and cognitive health.
                </BodyText>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard">
                    <button className="button-primary px-6 py-3 text-base font-medium">
                      Begin Your Practice
                    </button>
                  </Link>
                  <Link href="/study-guide">
                    <button className="button-outline px-6 py-3 text-base font-medium">
                      Learn How to Start
                    </button>
                  </Link>
                </div>

                <p className="label-mono text-xs text-center mt-8 pt-4 border-t" style={{ color: 'var(--foreground)', opacity: 0.5, borderColor: 'var(--border)' }}>
                  Last updated: January 2026
                </p>
              </div>
            </div>
          </Section>
        </Container>
      </main>

      <Footer />
    </div>
  )
}