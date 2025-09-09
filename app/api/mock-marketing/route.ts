import { NextResponse } from "next/server"

const mockCourse = {
  title: "Digital Marketing Fundamentals",
  description: "A comprehensive introduction to digital marketing strategies and core concepts",
  total_slides: 5,
  slides: [
    {
      slide_number: 1,
      title: "Introduction to Digital Marketing",
      content:
        "## What is Digital Marketing?\n\nDigital marketing is the practice of promoting products, services, or brands through digital channels and technologies.\n\n### Key Components:\n- Search Engine Optimization (SEO)\n- Social Media Marketing\n- Content Marketing\n- Email Marketing\n- Pay-Per-Click (PPC) Advertising\n\n### Benefits:\n- Global reach\n- Cost-effective\n- Measurable results\n- Targeted advertising\n- Real-time engagement\n\nDigital marketing has become essential for businesses of all sizes in today's digital-first world.",
      quiz: {
        question: "What is a key advantage of digital marketing over traditional marketing?",
        options: [
          "It only requires a website",
          "It's always free",
          "It provides measurable results in real-time",
          "It only targets local customers",
        ],
        correct_answer: "It provides measurable results in real-time",
        explanation:
          "Digital marketing stands out because it allows businesses to track and measure results in real-time, enabling quick adjustments to campaigns and better ROI tracking compared to traditional marketing methods.",
      },
    },
    {
      slide_number: 2,
      title: "Search Engine Optimization (SEO)",
      content:
        "## Understanding SEO\n\n### What is SEO?\n- **SEO** is the practice of optimizing websites to rank higher in search engine results.\n- It focuses on organic (non-paid) visibility.\n\n### Key SEO Elements:\n- **On-Page SEO**:\n  - Quality content\n  - Keyword optimization\n  - Meta tags\n  - URL structure\n- **Off-Page SEO**:\n  - Backlinks\n  - Social signals\n  - Domain authority\n- **Technical SEO**:\n  - Site speed\n  - Mobile optimization\n  - XML sitemaps\n\n### Best Practices\n- Create high-quality, relevant content\n- Use targeted keywords naturally\n- Optimize for mobile devices\n- Improve site loading speed\n- Build quality backlinks",
      quiz: {
        question: "Which of these is NOT a component of on-page SEO?",
        options: [
          "Meta descriptions",
          "Quality content",
          "Backlinks",
          "Header tags",
        ],
        correct_answer: "Backlinks",
        explanation:
          "Backlinks are part of off-page SEO, not on-page SEO. On-page SEO includes elements that you can control directly on your website, such as content, meta tags, and header tags.",
      },
    },
    {
      slide_number: 3,
      title: "Social Media Marketing",
      content:
        "## Social Media Marketing Essentials\n\n### Platform Overview:\n- **Facebook**: Broad audience reach, detailed targeting\n- **Instagram**: Visual content, younger audience\n- **LinkedIn**: Professional networking, B2B marketing\n- **Twitter**: Real-time engagement, news, and trends\n- **TikTok**: Short-form video, Gen Z audience\n\n### Key Strategies:\n- Content planning and calendar\n- Engagement optimization\n- Community management\n- Paid advertising\n- Influencer partnerships\n\n### Best Practices:\n- Maintain consistent brand voice\n- Use platform-specific features\n- Track metrics and analytics\n- Engage with audience regularly\n- Create shareable content",
      quiz: {
        question: "What is a key aspect of successful social media marketing?",
        options: [
          "Posting the same content on all platforms",
          "Focusing only on one platform",
          "Maintaining consistent brand voice across platforms",
          "Avoiding paid advertising",
        ],
        correct_answer: "Maintaining consistent brand voice across platforms",
        explanation:
          "While each platform may require different content formats, maintaining a consistent brand voice across all platforms is crucial for brand recognition and trust-building with your audience.",
      },
    },
    {
      slide_number: 4,
      title: "Content Marketing",
      content:
        "## Content Marketing Fundamentals\n\n### Types of Content:\n- Blog posts\n- Videos\n- Infographics\n- Podcasts\n- Ebooks\n- Case studies\n- Whitepapers\n\n### Content Strategy:\n- **Goal Setting**:\n  - Brand awareness\n  - Lead generation\n  - Customer education\n  - Sales conversion\n- **Audience Research**\n- **Content Calendar**\n- **Distribution Channels**\n\n### Content Creation Tips:\n- Focus on value\n- Use data and research\n- Optimize for SEO\n- Include calls-to-action\n- Maintain quality standards",
      quiz: {
        question: "What is the primary purpose of content marketing?",
        options: [
          "Direct sales only",
          "Building brand awareness and trust",
          "Replacing customer service",
          "Reducing marketing costs",
        ],
        correct_answer: "Building brand awareness and trust",
        explanation:
          "While content marketing can drive sales, its primary purpose is to build brand awareness and trust by providing valuable information to your target audience, establishing your brand as an authority in your industry.",
      },
    },
    {
      slide_number: 5,
      title: "Email Marketing",
      content:
        "## Email Marketing Strategy\n\n### Key Components:\n- List building\n- Segmentation\n- Personalization\n- Automation\n- Analytics\n\n### Types of Email Campaigns:\n- **Welcome Series**\n- **Newsletters**\n- **Promotional Emails**\n- **Abandoned Cart**\n- **Re-engagement**\n\n### Best Practices:\n- Compelling subject lines\n- Mobile-friendly design\n- Clear call-to-action\n- A/B testing\n- List hygiene\n- Compliance (GDPR, CAN-SPAM)\n\nEmail marketing remains one of the most effective digital marketing channels with high ROI.",
      quiz: {
        question: "Which email marketing practice is most important for maintaining engagement?",
        options: [
          "Sending daily emails",
          "Using only text-based emails",
          "List segmentation and personalization",
          "Including multiple CTAs",
        ],
        correct_answer: "List segmentation and personalization",
        explanation:
          "List segmentation and personalization are crucial for email marketing success as they ensure recipients receive relevant content, leading to higher engagement rates and better campaign performance.",
      },
    },
  ],
}

export async function GET() {
  return NextResponse.json(mockCourse)
}
