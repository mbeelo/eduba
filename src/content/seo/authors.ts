export interface SeoAuthorContent {
  years?: string
  bio: string
}

// Hand-curated bio content for authors in the initial SEO seed batch.
// Adapted from src/app/authors/page.tsx where prose already existed there.
// Keyed by authorSlug(name) from src/lib/slug.ts. A page whose slug has no
// entry here simply omits the bio section rather than failing.
export const seoAuthors: Record<string, SeoAuthorContent> = {
  'marcus-aurelius': {
    years: '121–180 AD',
    bio: 'The philosopher emperor of Rome, Marcus Aurelius wrote his Meditations as private reflections never intended for publication. His thoughts on duty, mortality, and virtue offer insights into living with purpose and resilience, carrying the weight of lived experience from someone who held ultimate political responsibility.',
  },
  seneca: {
    years: '4 BC – 65 AD',
    bio: 'Lucius Annaeus Seneca was a Roman statesman, dramatist, and Stoic philosopher whose letters and essays provide practical wisdom for navigating adversity. His emphasis on reason over emotion and deliberate preparation for hardship makes his writing especially direct even today.',
  },
  epictetus: {
    years: '50–135 AD',
    bio: 'Born into slavery, Epictetus developed a philosophy built on one distinction: what is within our control and what is not. His teachings, recorded by his student Arrian in the Discourses and Enchiridion, emphasize freedom through acceptance and focus on what is actually ours to decide.',
  },
  'abraham-lincoln': {
    years: '1809–1865',
    bio: "Self-educated and renowned for his moral clarity, Lincoln led the United States through the Civil War. His speeches, including the Gettysburg Address and Second Inaugural Address, are considered among the finest examples of American political rhetoric.",
  },
  'george-washington': {
    years: '1732–1799',
    bio: "Commander of the Continental Army and the first President of the United States, Washington's decision to step down after two terms, and his Farewell Address explaining why, shaped the norms of the American presidency for generations.",
  },
  'thomas-jefferson': {
    years: '1743–1826',
    bio: 'The principal author of the Declaration of Independence, Jefferson was a statesman and writer whose articulation of natural rights helped establish the philosophical foundation of American government.',
  },
  'benjamin-franklin': {
    years: '1706–1790',
    bio: "Diplomat, inventor, writer, and statesman, Franklin's wit and wisdom, captured in Poor Richard's Almanack, demonstrate how practical, plainly stated advice can shape a nation's character and endure as folk wisdom.",
  },
  'william-shakespeare': {
    years: '1564–1616',
    bio: 'Widely regarded as the greatest writer in the English language, Shakespeare’s plays and sonnets explore love, ambition, and mortality with a psychological depth that still feels immediate centuries later.',
  },
  'lord-byron': {
    years: '1788–1824',
    bio: 'George Gordon Byron was one of the leading figures of English Romantic poetry, known for both his verse and his restless, scandal-prone life. His 1815 collection Hebrew Melodies includes some of his most enduringly popular short poems.',
  },
  'john-keats': {
    years: '1795–1821',
    bio: 'Keats died at just 25, but in a few intensely productive years produced some of the most celebrated odes in English poetry, exploring beauty, mortality, and the pull between the ideal and the fleeting.',
  },
  'emily-dickinson': {
    years: '1830–1886',
    bio: "Though she lived in relative seclusion and published almost nothing in her lifetime, Dickinson's poetry reveals an acute observer of inner and outer worlds. Her compressed, unconventional verse became one of the defining voices of American poetry.",
  },
  'walt-whitman': {
    years: '1819–1892',
    bio: 'Whitman’s Leaves of Grass, first published in 1855 and revised throughout his life, broke from traditional poetic form to celebrate the body, democracy, and everyday American life in sprawling free verse.',
  },
  'john-milton': {
    years: '1608–1674',
    bio: 'Milton composed Paradise Lost, his epic retelling of humanity’s fall from Eden, after losing his eyesight, dictating the poem’s roughly ten thousand lines to assistants. It remains one of the towering works of English literature.',
  },
  socrates: {
    years: 'c. 470–399 BC',
    bio: "Socrates left no writings of his own; his ideas survive through his students, chiefly Plato. His method of relentless questioning, and his willingness to die rather than abandon it, made him a founding figure of Western philosophy.",
  },
  'sun-tzu': {
    years: 'c. 5th century BC',
    bio: 'A military strategist in ancient China, Sun Tzu is credited with The Art of War, a treatise on strategy and leadership that has been studied by soldiers, politicians, and business leaders for over two thousand years.',
  },
  'patrick-henry': {
    years: '1736–1799',
    bio: "A lawyer and orator, Patrick Henry was among the most forceful early advocates for American independence. His 1775 speech to the Second Virginia Convention became one of the Revolution's defining rallying cries.",
  },
}
