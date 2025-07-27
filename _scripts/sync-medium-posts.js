const fs = require('fs');
const path = require('path');

async function syncMediumPosts() {
  const RSS_URL = 'https://medium.com/feed/@arjunagarwal899';
  
  try {
    console.log('Fetching Medium posts...');
    const response = await fetch(RSS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const xmlData = await response.text();
    console.log('Parsing RSS XML...');
    
    // Extract posts from XML
    const posts = parseRSSFeed(xmlData);
    console.log(`Found ${posts.length} posts`);
    
    // Ensure _data directory exists
    const dataDir = path.join(process.cwd(), '_data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Process and clean posts data
    const processedPosts = posts.map(post => {
      // Extract first image from content for thumbnail
      const imgMatch = post.content?.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = imgMatch ? imgMatch[1] : null;
      
      // Clean and truncate description - increased to 500+ characters
      let description = post.description || '';
      if (post.content && !description) {
        // Extract description from content if not available
        description = cleanHtmlContent(post.content).substring(0, 600).trim();
      }
      description = cleanHtmlContent(description)?.substring(0, 600)?.trim();
      
      if (description && description.length > 580 && !description.endsWith('...')) {
        // Find the last complete sentence or word before the limit
        const lastSpace = description.lastIndexOf(' ', 580);
        const lastPeriod = description.lastIndexOf('.', 580);
        const cutPoint = Math.max(lastSpace, lastPeriod);
        description = description.substring(0, cutPoint > 0 ? cutPoint + (lastPeriod > lastSpace ? 1 : 0) : 580) + '...';
      }
      
      return {
        title: post.title || 'Untitled',
        link: post.link,
        pubDate: post.pubDate,
        description: description || 'Read more on Medium',
        categories: post.categories || [],
        thumbnail: thumbnail,
        author: post.author || 'Arjun Agarwal'
      };
    });
    
    // Write to Jekyll data file
    const outputPath = path.join(dataDir, 'medium_posts.yml');
    const yamlContent = `# Auto-generated from Medium RSS feed
# Last updated: ${new Date().toISOString()}
posts:
${processedPosts.map(post => `  - title: ${JSON.stringify(post.title)}
    link: ${JSON.stringify(post.link)}
    pubDate: ${JSON.stringify(post.pubDate)}
    description: ${JSON.stringify(post.description)}
    thumbnail: ${post.thumbnail ? JSON.stringify(post.thumbnail) : 'null'}
    categories: [${post.categories.map(cat => JSON.stringify(cat)).join(', ')}]
    author: ${JSON.stringify(post.author)}`).join('\n')}
`;
    
    fs.writeFileSync(outputPath, yamlContent);
    console.log(`Successfully wrote ${processedPosts.length} posts to ${outputPath}`);
    
  } catch (error) {
    console.error('Error syncing Medium posts:', error.message);
    process.exit(1);
  }
}

function parseRSSFeed(xmlData) {
  const posts = [];
  
  // Extract all <item> elements - handle both self-closing and regular tags
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xmlData)) !== null) {
    const itemXml = match[1];
    
    const post = {
      title: extractXmlContent(itemXml, 'title'),
      link: extractXmlContent(itemXml, 'link'),
      pubDate: extractXmlContent(itemXml, 'pubDate'),
      description: extractXmlContent(itemXml, 'description'),
      content: extractXmlContent(itemXml, 'content:encoded'),
      author: extractXmlContent(itemXml, 'dc:creator'),
      categories: extractXmlCategories(itemXml)
    };
    
    // Only add posts that have at least a title and link
    if (post.title && post.link) {
      posts.push(post);
    }
  }
  
  return posts;
}

function extractXmlContent(xml, tagName) {
  // Handle CDATA sections
  const cdataRegex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tagName}>`, 'i');
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) {
    return cdataMatch[1].trim();
  }
  
  // Handle regular content tags
  const regularRegex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const regularMatch = xml.match(regularRegex);
  if (regularMatch) {
    const content = regularMatch[1].trim();
    return content || null;
  }
  
  // Handle self-closing or empty tags
  const emptyRegex = new RegExp(`<${tagName}[^>]*\\s*\\/?>`,'i');
  if (emptyRegex.test(xml)) {
    return null;
  }
  
  return null;
}

function extractXmlCategories(xml) {
  const categories = [];
  
  // Handle CDATA categories
  const cdataRegex = /<category[^>]*><!\\[CDATA\\[(.*?)\\]\\]><\/category>/g;
  let match;
  
  while ((match = cdataRegex.exec(xml)) !== null) {
    const category = match[1].trim();
    if (category && !categories.includes(category)) {
      categories.push(category);
    }
  }
  
  // Handle regular text categories
  const regularRegex = /<category[^>]*>(.*?)<\/category>/g;
  while ((match = regularRegex.exec(xml)) !== null) {
    const category = match[1].trim();
    if (category && !category.includes('CDATA') && !categories.includes(category)) {
      categories.push(category);
    }
  }
  
  return categories;
}

function cleanHtmlContent(content) {
  if (!content) return '';
  
  return content
    // Remove image captions (figcaption tags and their content)
    .replace(/<figcaption[^>]*>[\s\S]*?<\/figcaption>/gi, '')
    // Remove figure tags but keep their content (except figcaption already removed)
    .replace(/<\/?figure[^>]*>/gi, '')
    // Preserve heading spacing by converting headings to text with double newlines
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<h[1-6][^>]*>/gi, '')
    // Convert paragraph endings to single newlines to preserve original structure
    .replace(/<\/p>/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    // Convert line breaks to single newlines
    .replace(/<br\s*\/?>/gi, '\n')
    // Remove all other HTML tags
    .replace(/<[^>]*>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[^;]+;/g, ' ')
    // Clean up whitespace while preserving intentional newlines
    .replace(/[ \t]+/g, ' ') // Multiple spaces/tabs to single space
    .replace(/\n[ \t]+/g, '\n') // Remove spaces after newlines
    .replace(/[ \t]+\n/g, '\n') // Remove spaces before newlines
    // Limit consecutive newlines to maximum of 1 (preserve paragraph breaks)
    .replace(/\n{2,}/g, '\n')
    .trim();
}

syncMediumPosts();
