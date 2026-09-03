export interface SeoWorkContent {
  summary: string
}

// Hand-curated summaries for works in the initial SEO seed batch.
// Keyed by workSlug(author, title) from src/lib/slug.ts — compound (not just
// the title) so two different authors' works of the same name never collide.
// A page whose slug has no entry here simply omits the summary section
// rather than failing.
export const seoWorks: Record<string, SeoWorkContent> = {
  'marcus-aurelius-meditations': {
    summary: 'A series of private notes Marcus Aurelius wrote to himself while on military campaign, likely between 170–180 AD, never intended for anyone else to read. Meditations became one of the most widely read works of Stoic philosophy, prized for its unguarded, practical tone.',
  },
  'seneca-on-the-shortness-of-life': {
    summary: 'Written around 49 AD as a long letter to his father-in-law, Seneca\'s On the Shortness of Life argues that life is long enough if lived deliberately — it is squandered attention, not a lack of time, that makes it feel short.',
  },
  'epictetus-enchiridion': {
    summary: 'A short handbook of Stoic ethics compiled around 125 AD by Epictetus\' student Arrian from his teacher\'s lectures, organized around the core distinction between what is "up to us" and what is not.',
  },
  'declaration-of-independence-declaration-of-independence': {
    summary: 'Adopted by the Continental Congress on July 4, 1776, the Declaration of Independence announced the American colonies\' separation from Great Britain and laid out the philosophical justification for that break.',
  },
  'u-s-constitution-united-states-constitution': {
    summary: 'Signed in 1787, the U.S. Constitution establishes the framework of the federal government. Its preamble states the document\'s purpose in a single, widely memorized sentence.',
  },
  'abraham-lincoln-gettysburg-address': {
    summary: 'Delivered by Abraham Lincoln on November 19, 1863, at the dedication of the Soldiers\' National Cemetery in Gettysburg, Pennsylvania. At just over two minutes, it is among the shortest and most quoted speeches in American history.',
  },
  'abraham-lincoln-second-inaugural-address': {
    summary: 'Delivered on March 4, 1865, as the Civil War neared its end, Lincoln\'s Second Inaugural Address closes with a call for national reconciliation — "with malice toward none, with charity for all."',
  },
  'george-washington-farewell-address': {
    summary: 'Published in 1796 as Washington declined to seek a third presidential term, the Farewell Address offered guidance to the young republic, including its well-known caution against permanent foreign alliances.',
  },
  'thomas-jefferson-letter-to-william-stephens-smith': {
    summary: 'Written from Paris in 1787 in response to news of Shays\' Rebellion, this letter contains Jefferson\'s argument that occasional popular uprisings are a natural, even healthy, feature of a free society.',
  },
  'benjamin-franklin-the-way-to-wealth': {
    summary: 'Published in 1758 as a preface to Poor Richard\'s Almanack, The Way to Wealth strings together proverbs on thrift and diligence into a single speech delivered by a fictional old man, "Father Abraham."',
  },
  'william-shakespeare-sonnet-18': {
    summary: 'First published in 1609, Sonnet 18 ("Shall I compare thee to a summer\'s day?") is likely the most famous of Shakespeare\'s 154 sonnets, arguing that poetry can preserve beauty beyond its natural decay.',
  },
  'lord-byron-hebrew-melodies': {
    summary: 'An 1815 collection of poems Byron wrote to be set to traditional Jewish melodies, including "She Walks in Beauty," one of his most widely anthologized short poems.',
  },
  'john-keats-ode-to-a-nightingale': {
    summary: 'Written in 1819, "Ode to a Nightingale" is one of Keats\' major odes, contrasting the aching weight of mortal life with the seemingly timeless song of a nightingale.',
  },
  'emily-dickinson-because-i-could-not-stop-for-death': {
    summary: 'Written around 1863 and published posthumously in 1890, this poem imagines death as a courteous carriage ride rather than a violent ending — one of Dickinson\'s most studied works.',
  },
  'walt-whitman-leaves-of-grass': {
    summary: 'First published in 1855 and revised by Whitman throughout his life, Leaves of Grass is a sprawling free-verse collection celebrating the body, democracy, and everyday American life, including "I Sing the Body Electric."',
  },
  'john-milton-paradise-lost': {
    summary: 'Published in 1667, Paradise Lost is Milton\'s epic retelling of the Biblical fall of man, dictated after Milton had lost his sight, and remains one of the major long poems in the English language.',
  },
  'socrates-apology-plato': {
    summary: 'Plato\'s account of Socrates\' trial in 399 BC, in which Socrates defends his practice of relentless questioning and argues that "the unexamined life is not worth living."',
  },
  'sun-tzu-the-art-of-war': {
    summary: 'Written around the 5th century BC, The Art of War is one of the oldest and most influential treatises on military strategy, still widely read outside military contexts today.',
  },
  'patrick-henry-speech-to-the-second-virginia-convention': {
    summary: 'Delivered on March 23, 1775, this speech argued for arming the Virginia militia against Britain and closes with the famous line "give me liberty, or give me death!"',
  },
}
