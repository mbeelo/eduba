# Eduba Content Curation Format

Use this format for each passage. I can easily parse this and convert it to the database format.

## Format Template

```
---
PATH: [path_name]
TITLE: [passage_title]
AUTHOR: [author_name]
WORD_COUNT: [approximate_word_count]
DIFFICULTY: [1-20, where 1 is easiest/shortest]
SOURCE: [book/speech/document where this came from]
CONTEXT: [brief context about when/why this was written]
NOTES: [any special formatting or pronunciation notes]
---

[The exact text of the passage here, including all punctuation, capitalization, and formatting exactly as you want users to memorize it]

---
```

## Example

```
---
PATH: stoics
TITLE: On the Shortness of Life
AUTHOR: Seneca
WORD_COUNT: 45
DIFFICULTY: 3
SOURCE: Letters from a Stoic, Letter 1
CONTEXT: Written around 65 AD as advice to his friend Lucilius
NOTES: The word "vixisse" can be tricky - pronounced VIK-sis-say
---

It is not that we have a short time to live, but that we waste a lot of it. Life is long enough if you know how to use it. But when it is wasted in heedless luxury and spent on no good activity, we are forced at last by death's final constraint to realize that it has passed away before we knew it was passing.

---
```

## Just paste your curated content in this format and I'll:

1. **Parse it automatically** into the database structure
2. **Calculate accurate word counts**
3. **Validate the difficulty progression** within each path
4. **Generate the SQL inserts** for the database
5. **Update the path metadata** with correct counts

## Tips for Difficulty Ordering:
- **1-5**: Short quotes (15-40 words)
- **6-10**: Medium passages (40-80 words)
- **11-15**: Longer excerpts (80-150 words)
- **16-20**: Full passages (150-250 words)

## Paths we're targeting:
- `stoics` - Marcus Aurelius, Seneca, Epictetus
- `founders` - Washington, Jefferson, Adams, Franklin
- `scientists` - Einstein, Darwin, Newton, Curie
- `philosophers` - Plato, Aristotle, Kant, Nietzsche
- `poets` - Shakespeare, Dickinson, Frost, Whitman
- `leaders` - Churchill, Lincoln, Roosevelt
- `writers` - Twain, Thoreau, Emerson, Wilde
- `mystics` - Rumi, Lao Tzu, Buddha, Jesus
- `novelists` - Orwell, Dickens, Austen, Hemingway

This format gives me everything I need while being easy for you to work with! Just paste your content in this structure.