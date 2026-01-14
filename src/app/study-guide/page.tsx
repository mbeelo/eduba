import { Metadata } from 'next'
import { Container, Heading, BodyText, Section } from '@/components/ui'
import { Footer } from '@/components/ui/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Traditional Scribe Training Guide',
  description: 'Master the ancient art of scribe training with our comprehensive guide. Learn how scribes developed perfect accuracy through careful reading, memory writing, and error correction.',
  openGraph: {
    title: 'Traditional Scribe Training Guide | Eduba',
    description: 'Master the ancient art of scribe training with our comprehensive guide. Learn how scribes developed perfect accuracy through careful reading, memory writing, and error correction.',
  },
}

export default function StudyGuidePage() {
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
                Your Guide to Traditional Scribe Training
              </Heading>
              <BodyText className="text-xl leading-relaxed mb-8" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                For centuries, scribes preserved knowledge through a simple but powerful method: read carefully,
                write from memory, and learn from differences. This guide will help you master the same
                traditional techniques that trained history's most learned minds.
              </BodyText>
            </div>
          </Section>

          {/* Getting Started */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Getting Started: Your First Steps
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Choose Your Learning Path
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Select a learning path that genuinely interests you. Whether you&rsquo;re drawn to the
                practical wisdom of the Stoics, the eloquent speeches of historical founders, or the
                beautiful language of great poets, your initial enthusiasm will carry you through the
                challenges of early practice. Interest and motivation are the foundation of successful
                memorization.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Start with Shorter Passages
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Begin with the shortest passages in your chosen path. Success breeds success, and early
                victories build the confidence and momentum you need for longer, more challenging texts.
                A completed short passage is infinitely more valuable than a half-memorized long one.
                Use these initial successes to develop your technique and understand your learning patterns.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Set Realistic Expectations
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Memorization is a skill that improves with practice. Your first passage might take many
                attempts, but your tenth will be significantly easier. Expect initial challenges—they&rsquo;re
                a normal part of building your memory capacity. Focus on consistency rather than speed,
                and celebrate small improvements along the way.
              </BodyText>
            </div>
          </Section>

          {/* The Three-Phase Method */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Mastering the Traditional Scribe Method
              </Heading>

              <BodyText className="text-lg leading-relaxed mb-6">
                The traditional scribe training method—Reading, Writing from Memory, and Learning from Differences—
                has remained unchanged for millennia because it works. Understanding how to practice each phase
                like ancient scribes is crucial to developing their legendary precision.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Phase 1: Careful Reading (Like a Medieval Monk)
              </Heading>
              <BodyText className="text-base leading-relaxed mb-4">
                A scribe preparing to copy a sacred text doesn't skim—they study every word with complete
                attention. This isn't casual reading; you're preparing to reproduce the text exactly:
              </BodyText>
              <ul className="list-disc list-inside space-y-2 mb-6 text-base" style={{ color: 'var(--foreground)' }}>
                <li><strong>Read with scribe-like precision</strong>—notice every comma, every capitalization, every word choice</li>
                <li><strong>Absorb the natural rhythm</strong>—scribes learned that great texts have flow that aids copying</li>
                <li><strong>Understand before copying</strong>—scribes who understood the meaning made fewer errors</li>
                <li><strong>Identify distinctive phrases</strong>—memorable turns of phrase served as landmarks for scribes</li>
                <li><strong>Trace the logical flow</strong>—understanding how ideas connect prevented confusion during copying</li>
              </ul>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Phase 2: Writing from Memory (The Scribe's Test)
              </Heading>
              <BodyText className="text-base leading-relaxed mb-4">
                Now comes the crucial test: can you reproduce the text exactly like a master scribe? This is
                where ancient apprentices proved their skill—writing from memory alone:
              </BodyText>
              <ul className="list-disc list-inside space-y-2 mb-6 text-base" style={{ color: 'var(--foreground)' }}>
                <li><strong>Begin immediately</strong>—scribes didn't delay between studying and copying</li>
                <li><strong>Write without looking back</strong>—resist checking the original, just like scribes working from memory</li>
                <li><strong>Aim for exact reproduction</strong>—scribes were trained for perfect accuracy, not approximation</li>
                <li><strong>Trust your preparation</strong>—if you read carefully, your memory contains more than you think</li>
                <li><strong>Accept the struggle</strong>—difficulty during recall is where real learning happens</li>
              </ul>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Phase 3: Learning from Differences (The Master's Correction)
              </Heading>
              <BodyText className="text-base leading-relaxed mb-4">
                Like a master scribe checking an apprentice's work, Eduba shows you exactly where your memory
                differed from the original. This correction phase is where scribes became masters:
              </BodyText>
              <ul className="list-disc list-inside space-y-2 mb-8 text-base" style={{ color: 'var(--foreground)' }}>
                <li><strong>Study every marked difference</strong>—scribes learned more from errors than successes</li>
                <li><strong>Understand why you missed words</strong>—did you not read carefully enough? Not understand the meaning?</li>
                <li><strong>Notice your progress patterns</strong>—track improvement like scribes tracked their accuracy</li>
                <li><strong>Plan your next copying session</strong>—focus on the specific errors you made</li>
                <li><strong>Value accuracy over speed</strong>—scribes prioritized precision above all else</li>
              </ul>
            </div>
          </Section>

          {/* Study Strategies */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Advanced Scribe Training Strategies
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                The Scribal Sectioning Method
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Master scribes taught apprentices to divide longer texts into natural sections—usually
                2-4 lines that form complete thoughts. Practice copying each section perfectly before
                attempting the full passage, just as scriptoriums trained novices. This prevents the
                overwhelming task of copying entire manuscripts at once while building the precision
                necessary for longer works.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                The Traditional Layered Approach
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Ancient scribes learned texts in layers, like building a cathedral. First, they mastered
                the overall structure and flow of ideas. Then they perfected key phrases and transitions
                that connected sections. Finally, they achieved word-perfect accuracy. This methodical
                approach, used in monasteries and classical schools, creates robust memory that won't
                collapse if you forget a single word.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Understanding Like a Scholar-Scribe
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Medieval scribes weren't just copists—they were scholars who understood what they copied.
                Research the historical context, understand the author's intent, and appreciate why
                specific words were chosen. Scribes who understood the meaning made fewer errors than
                those who copied mechanically. When you grasp why Cicero chose one word over another,
                or why Lincoln structured a sentence precisely as he did, accurate copying becomes natural.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Building Personal Connections
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                The greatest scribes internalized texts by connecting them to their own experience and knowledge.
                Link Stoic wisdom to your daily challenges, connect Lincoln's speeches to current events,
                or relate poetic imagery to places you've seen. These personal connections create what
                scribes called "living memory"—texts that become part of your own thinking rather than
                mere collections of words.
              </BodyText>
            </div>
          </Section>

          {/* Creating Effective Routines */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Creating Effective Study Routines
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Optimal Session Length and Timing
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Most people find that 15-20 minute focused sessions are ideal for memorization work.
                Shorter sessions prevent mental fatigue while longer ones often lead to diminishing
                returns. Schedule sessions when you&rsquo;re mentally fresh—for many people, this
                means morning or early afternoon. Avoid memorization when you&rsquo;re tired or
                distracted, as poor-quality practice can actually hinder progress.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                The Power of Distributed Practice
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Spread your practice across multiple days rather than concentrating it in single long
                sessions. The spacing effect—the tendency for distributed practice to be more effective
                than massed practice—is one of the most robust findings in memory research. Practice
                a passage today, review it tomorrow, then again in three days, and once more after
                a week. This pattern builds strong, lasting memories with minimal total time investment.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Maintaining Multiple Passages
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                As you build your repertoire, you&rsquo;ll need to maintain previously memorized passages
                while learning new ones. Create a review schedule that includes periodic practice of
                older material. A simple approach: review passages from the past week daily, from
                the past month weekly, and from earlier months monthly. This maintenance work prevents
                forgetting and keeps your entire collection of memorized passages accessible.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Environmental Considerations
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Find a quiet, comfortable space for your memorization practice. Minimize distractions
                by turning off notifications and choosing times when interruptions are unlikely.
                Some people benefit from slight background noise or instrumental music, while others
                need complete silence. Experiment to find what works best for you, then try to
                maintain consistent conditions for your practice sessions.
              </BodyText>
            </div>
          </Section>

          {/* Troubleshooting Common Challenges */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Troubleshooting Common Challenges
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                &ldquo;I keep forgetting the same parts&rdquo;
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Persistent trouble spots often indicate areas where you don&rsquo;t fully understand
                the meaning or flow of ideas. Focus additional attention on these sections: look up
                unfamiliar words, research historical references, or try to paraphrase the difficult
                section in your own words. Sometimes writing out the troublesome passage by hand
                (not just typing) can help encode it more deeply. Create special associations or
                memory cues specifically for these challenging transitions.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                &ldquo;I can&rsquo;t seem to get started&rdquo;
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Starting problems often stem from choosing passages that are too long or difficult.
                Drop down to shorter, simpler texts until you build momentum and confidence. Consider
                starting with famous quotes or short poems that you already partially know. The goal
                is to experience success quickly, which will motivate you to tackle more challenging
                material. Remember, there&rsquo;s no shame in starting small—every expert was once
                a beginner.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                &ldquo;I feel like I&rsquo;m not making progress&rdquo;
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Progress in memorization is often non-linear—you may struggle for several sessions,
                then suddenly achieve a breakthrough. Keep detailed records of your accuracy scores
                and review them regularly to see gradual improvements that might not be obvious
                day-to-day. Focus on the process rather than just results: consistent practice is
                success, regardless of immediate outcomes. Sometimes taking a day or two break can
                help consolidate learning and restore motivation.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                &ldquo;I mix up similar passages&rdquo;
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Interference between similar passages is common, especially when working within a single
                author or theme. Create strong distinguishing features for each passage: focus on
                unique opening lines, distinctive vocabulary, or specific contexts. Practice transitions
                between different passages to strengthen the boundaries between them. Sometimes it
                helps to learn passages from different learning paths in alternation rather than
                working through a single path sequentially.
              </BodyText>
            </div>
          </Section>

          {/* Tracking Progress */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-3xl font-bold mb-6" style={{ color: 'var(--accent)' }}>
                Tracking Your Progress and Staying Motivated
              </Heading>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Using Eduba&rsquo;s Built-in Tracking
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Pay attention to your accuracy scores and completion rates across different passages
                and learning paths. These metrics provide objective feedback about your improvement
                over time. Notice patterns: are you stronger with certain types of content? Do you
                perform better at certain times of day? Use this data to optimize your practice
                sessions and celebrate your achievements.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Setting Meaningful Goals
              </Heading>
              <BodyText className="text-base leading-relaxed mb-6">
                Set both short-term and long-term goals that are specific and achievable. Short-term
                goals might include mastering a particular passage or completing a certain number
                of practice sessions per week. Long-term goals could involve completing an entire
                learning path or building a personal anthology of favorite memorized passages.
                Write down your goals and review them regularly to maintain focus and motivation.
              </BodyText>

              <Heading level={3} className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Celebrating Milestones
              </Heading>
              <BodyText className="text-base leading-relaxed mb-8">
                Acknowledge your achievements along the way. Successfully memorizing your first passage
                is a significant accomplishment, as is completing your first learning path or reaching
                a high accuracy score. These celebrations reinforce positive associations with the
                work and help maintain long-term motivation. Share your progress with friends or
                family who can appreciate your dedication to this valuable skill.
              </BodyText>
            </div>
          </Section>

          {/* Call to Action */}
          <Section className="py-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-lg" style={{ background: 'var(--background-soft)' }}>
                <Heading level={2} className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                  Ready to Begin Your Memory Training Journey?
                </Heading>
                <BodyText className="text-base mb-6">
                  Armed with these strategies and techniques, you&rsquo;re prepared to make the most
                  of your memory training practice. Remember, consistency beats intensity—regular
                  short sessions will yield better results than occasional marathon efforts.
                </BodyText>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard">
                    <button className="button-primary px-6 py-3 text-base font-medium">
                      Start Training Now
                    </button>
                  </Link>
                  <Link href="/techniques">
                    <button className="button-outline px-6 py-3 text-base font-medium">
                      Learn Memory Techniques
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