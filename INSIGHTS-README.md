# Insights Content Management System

## Overview
The Insights section is a blog/content hub for publishing SEO-optimized thought leadership articles on thechannelstandard.com. The system supports pillar-cluster content architecture with automatic internal linking, schema markup, and responsive design.

## URL Structure
- Landing page: `/insights`
- Individual articles: `/insights/[slug]`

## File Structure

```
shared/
├── insights.ts           # Type definitions and constants
└── insightsData.ts       # Article content and data

client/src/pages/
├── Insights.tsx          # Landing page with article grid
└── InsightArticle.tsx    # Article detail page template
```

## Adding New Articles

### 1. Edit `shared/insightsData.ts`

Add your article to the `articles` object:

```typescript
'your-article-slug': {
  slug: 'your-article-slug',
  title: 'Your Article Title',
  subtitle: 'Optional subtitle',
  content: `# Your Article Title

Your markdown content goes here...

## Section Heading

More content...
`,
  author: DEFAULT_AUTHOR, // Eric Brooker | CEO, The Channel Standard
  publishDate: '2026-02-17', // ISO date format
  pillar: PILLARS.INTELLIGENCE_GAP, // For cluster articles only
  relatedArticles: ['other-article-slug'], // For internal linking
  faqs: [ // Optional
    {
      question: 'Your question?',
      answer: 'Your answer...',
    },
  ],
  metaDescription: 'SEO meta description (150-160 characters)',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
},
```

### 2. For Pillar Articles

Use the `InsightPillar` type and include a `clusters` array:

```typescript
[PILLARS.YOUR_PILLAR]: {
  slug: PILLARS.YOUR_PILLAR,
  title: 'Your Pillar Title',
  subtitle: 'Why this matters',
  content: `...`,
  author: DEFAULT_AUTHOR,
  publishDate: '2026-02-17',
  clusters: [
    'cluster-article-1',
    'cluster-article-2',
    // ... more cluster slugs
  ],
  relatedArticles: [
    PILLARS.OTHER_PILLAR_1,
    PILLARS.OTHER_PILLAR_2,
  ],
  metaDescription: '...',
  keywords: [...],
} as InsightPillar,
```

### 3. Content Guidelines

**Markdown Support:**
- Headings: `#`, `##`, `###`
- Bold: `**text**`
- Italic: `*text*`
- Links: `[text](url)`
- Lists: `-` or `1.`
- Blockquotes: `>`
- Code: `` `code` ``

**Brand Rules (from publishing instructions):**
- NEVER pitch the Companion in blog content
- NEVER use: disrupting, revolutionary, game-changer, SaaS platform, leads/lead generation
- NEVER blame TSDs directly for ecosystem problems
- Frame problems as systemic ecosystem conditions
- Tone: calm, direct, evidence-based

**Internal Linking:**
- Every cluster links back to its parent pillar (via `pillar` field)
- Every cluster cross-links to at least 1 sibling cluster (via `relatedArticles`)
- Every pillar links to the other 3 pillars (via `relatedArticles`)
- Every post has CTA to `/contact` (automatic)

## Schema Markup

The system automatically generates:
- **Article schema** for all articles (headline, author, date, publisher)
- **FAQPage schema** when FAQs are present
- **Person schema** for author (Eric Brooker)

Schema is injected via `react-helmet` in the article detail page.

## Publishing Schedule

Follow the schedule in `MANUS-PUBLISHING-INSTRUCTIONS.md`:

### Phase 1 — Intelligence Gap (Weeks 1-2)
- Pillar + 6 clusters

### Phase 2 — Advisor Experience (Weeks 3-4)
- Pillar + 6 clusters

### Phase 3 — Best Practices (Weeks 5-6)
- Pillar + 6 clusters

### Phase 4 — Building Program (Weeks 7-8)
- Pillar + 6 clusters

**Total: 29 articles (4 pillars + 24 clusters + 1 intro)**

## Navigation

The Insights section is accessible via:
- Footer "Resources" section
- Direct URL: `/insights`

## Testing

After adding articles:

1. **Check landing page**: Visit `/insights` to see article grid
2. **Check article detail**: Visit `/insights/your-slug` to see full article
3. **Verify internal links**: Click related articles and pillar links
4. **Test schema markup**: Use [Google Rich Results Test](https://search.google.com/test/rich-results)
5. **Check mobile responsiveness**: Test on different screen sizes

## SEO Checklist

- [ ] Unique, descriptive title (50-60 characters)
- [ ] Compelling meta description (150-160 characters)
- [ ] Relevant keywords (3-5 per article)
- [ ] Internal links to related content
- [ ] Schema markup (automatic)
- [ ] Mobile-friendly design (automatic)
- [ ] Fast page load (automatic)

## Maintenance

- Update `publishDate` to control article order (newest first)
- Use `relatedArticles` to keep internal linking fresh
- Add FAQs to target featured snippets in search results
- Monitor analytics to see which topics resonate

## Support

For questions or issues with the Insights system, refer to:
- Type definitions: `shared/insights.ts`
- Data structure: `shared/insightsData.ts`
- Landing page: `client/src/pages/Insights.tsx`
- Article template: `client/src/pages/InsightArticle.tsx`
