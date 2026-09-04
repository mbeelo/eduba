# Eduba Organic Growth Plan

Last updated: 2026-09-04

Ground rule for everything in this doc: **always post as yourself, disclose you built Eduba up front.** No sockpuppeting, no "share for months then reveal in DMs when asked" — that's the kind of thing that gets accounts banned and communities annoyed when discovered, and it's not necessary. A genuine "I built this" post performs fine in every community below when the thing itself is good, which this is.

---

## Where things stand (as of this doc)

**Done:**
- Production deploy fixed — the site had been silently broken (missing env vars) for 161+ days before this was caught. `eduba.co` → `www.eduba.co` is live and correct.
- Crawlable SEO layer shipped: `/passages/[slug]`, `/authors/[slug]`, `/works/[slug]`, `/collections/[slug]` — 20 hand-curated, verified-public-domain passages across 6 of 8 collections (stoics, founders, poets, philosophers, warriors, orators — scientists and novelists still empty).
- Google Search Console verified, sitemap submitted (71 URLs).
- Two real indexing bugs found and fixed: canonical tags pointing at the wrong domain, and 8 static pages (`/about`, `/techniques`, `/benefits`, `/study-guide`, `/authors`, `/contact`, `/privacy`, `/terms`) silently inheriting the homepage's canonical tag instead of their own.
- Full technical verification: all 71 sitemap URLs return 200, have self-referential canonicals, unique titles, valid JSON-LD, and no accidental noindex.

**Not done yet:**
- Bing Webmaster Tools (import from GSC, or manual DNS verification — same sitemap either way).
- Content QA: spot-check the 20 seed passages against real Gutenberg/PD editions before pushing hard on distribution.
- Scientists and novelists collections have zero `seo_ready` passages — Newton, Darwin, Dickens, Melville, Dostoevsky, Tolstoy are all sitting completely dark right now.
- A shareable "I just memorized X" result card (biggest single product lever for organic reach — see below).

---

## Sequencing

### Phase 0 — This week (mechanical, no audience yet)
1. Bing Webmaster Tools + sitemap submission.
2. Content QA pass on the 20 live passages.
3. Let Google's recrawl catch up — check the GSC Page Indexing report in ~1-2 weeks. The "not indexed" numbers there right now predate all of the above fixes; don't read anything into them until a recrawl happens.

### Phase 1 — First real post (once Phase 0 is done)
**r/Stoicism, disclosed, as yourself.** This is the single best-fit community for this product — the audience already reads and discusses exactly this content daily. One well-written, genuine post here beats five mediocre posts spread thin.

Post it, engage honestly in the comments, don't cross-post the same copy to five subreddits the same week. See the template below.

### Phase 2 — Once you have real usage signal from Phase 1
- Show HN
- Product Hunt
- r/GetStudying, r/studytips (same disclosed approach)

Don't front-load all of these — a Product Hunt/HN launch works better with even a small amount of existing traction and testimonials to point to than as the very first thing anyone sees.

### Phase 3 — Content expansion (parallel track, not blocking Phase 1/2)
- Bring scientists + novelists collections up to a few `seo_ready` passages each, closing the visible gap on `/collections`.
- As search impressions start coming in via GSC, prioritize expanding whichever collections/authors are already getting query volume.

### Phase 4 — Product-side growth lever
A shareable result card ("I just memorized *Meditations 2.1* on Eduba") is the highest-leverage product change for organic reach specifically — it turns individual users into distribution, the way Wordle's share-your-grid did. Worth building before a big Phase 2 launch push, not after, since it gives launch-day visitors something to share immediately.

---

## Templates (disclosed, honest)

### r/Stoicism post

**Title:** I built a free tool to actually memorize Marcus Aurelius, not just read him

**Post:**

"You have power over your mind—not outside events. Realize this, and you will find strength."

I've read that line a hundred times. I could not have recited it from memory until I built a way to force myself to.

I made **Eduba** — a free tool for actively memorizing passages from the Stoics (and a few other traditions) instead of just reading them. The loop is simple: read the passage, then type it from memory with no hints, see exactly which words you missed, try again. No points, no streak pressure, no notifications — just the passage and whether you actually know it.

It's got Marcus Aurelius, Seneca, and Epictetus passages live right now [link to `/collections/stoics`], free, no account needed to try it.

Genuinely curious what this community thinks — do you memorize passages deliberately, or mostly re-read? I'd love feedback on which passages are worth adding next.

**Notes:**
- Link straight to `/collections/stoics`, not the homepage — it's the actual relevant content, not a landing page pitch.
- Answer every comment. This is the whole game for a first post in a community — genuine engagement, not drive-by posting.
- Don't reply defensively to any "just use Anki" comments — engage with the actual point (active recall vs. spaced repetition tradeoffs are a fair question).

---

### Show HN

**Title:** Show HN: Eduba – active recall memorization for classical texts, no gamification

**Post:**
I built this after getting frustrated with study apps that feel more like games than learning tools — streaks, points, notifications competing for attention instead of the actual content.

Eduba is: read a passage, type it from memory, see exactly what you got wrong, repeat. Currently live with a curated set of public-domain passages from the Stoics, the American founders, classic poetry, and a few other traditions — more to come.

No account required to try it, no ads on the practice flow.

[link]

Happy to answer questions about the approach, the content curation, or anything else.

---

### Product Hunt

**Tagline:** Active recall memorization for texts worth remembering

**Description:**
Eduba is a free tool for memorizing real passages — Marcus Aurelius, Seneca, the Declaration of Independence, Shakespeare — through active recall instead of passive reading. Read the passage, type it from memory, see exactly what you missed, repeat until it's yours.

No gamification, no streak anxiety, no ads in the practice flow. Just the text and whether you actually know it.

**Maker comment:** Built this because I wanted to actually *know* passages I cared about, not just have read them once. Would love your feedback, especially on which authors/passages to add next.

---

## UTM tracking

Keep it simple and consistent:
```
?utm_source=<platform>&utm_medium=organic&utm_campaign=<specific_post>
```
Examples:
```
?utm_source=reddit&utm_medium=organic&utm_campaign=stoicism_launch
?utm_source=hackernews&utm_medium=organic&utm_campaign=show_hn
?utm_source=producthunt&utm_medium=organic&utm_campaign=ph_launch
```

Check these against GA4 (`G-H4EEGEK9Q4`) — confirm the events are actually landing there before relying on them, since the app's internal `analytics` singleton was found to be disconnected from real GA4 during this session's work; only the direct `window.gtag` calls (like the `seo_passage_to_practice` event) are confirmed to actually fire.

---

## What "success" looks like, honestly

Don't set vanity-metric targets before you have a single real data point. After the r/Stoicism post, look at:
- Did people engage in the comments (genuine signal of fit)?
- Did GA4 show real sessions from the referral, and did any convert to a completed practice session?
- Did anyone come back a second day?

That tells you far more than an upvote count, and it tells you whether Phase 2 (HN/Product Hunt) is worth doing yet or whether the product needs another iteration first.
