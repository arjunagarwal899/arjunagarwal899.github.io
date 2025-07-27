---
layout: page
title: Blog
icon: fas fa-blog
order: 2
---

<div class="blog-container">
  <div class="blog-header">
    <h1>My Blog Posts</h1>
    <p>Here are my latest thoughts and insights, automatically synced from <a href="https://medium.com/@arjunagarwal899" target="_blank">Medium</a>.</p>
  </div>

  <div class="blog-grid">
    {% assign blog_posts = site.posts | where: "medium_post", true %}
    {% for post in blog_posts limit: 12 %}
    <article class="blog-card">
      <div class="blog-card-content">
        <div class="blog-card-header">
          <h3 class="blog-card-title">
            <a href="{{ post.external_url }}" target="_blank" rel="noopener">
              {{ post.title }}
            </a>
          </h3>
          <div class="blog-card-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%B %d, %Y" }}
            </time>
            {% if post.categories %}
            <div class="blog-card-categories">
              {% for category in post.categories %}
              <span class="category-tag">{{ category }}</span>
              {% endfor %}
            </div>
            {% endif %}
          </div>
        </div>
        
        <div class="blog-card-excerpt">
          <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
        </div>
        
        <div class="blog-card-footer">
          <a href="{{ post.external_url }}" target="_blank" rel="noopener" class="read-more-btn">
            Read on Medium
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </article>
    {% endfor %}
  </div>

  {% if blog_posts.size == 0 %}
  <div class="no-posts">
    <p>No blog posts found. Posts will appear here automatically when synced from Medium.</p>
  </div>
  {% endif %}

  <div class="blog-footer">
    <p>
      Want to see all my posts? Visit my 
      <a href="https://medium.com/@arjunagarwal899" target="_blank" rel="noopener">
        Medium profile <i class="fab fa-medium"></i>
      </a>
    </p>
  </div>
</div>

<style>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blog-header p {
  font-size: 1.1rem;
  color: var(--text-muted-color);
  max-width: 600px;
  margin: 0 auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background: var(--card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border: 1px solid var(--card-border-color);
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.blog-card-content {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  line-height: 1.4;
}

.blog-card-title a {
  color: var(--heading-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-card-title a:hover {
  color: var(--link-color);
}

.blog-card-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-muted-color);
}

.blog-card-categories {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.category-tag {
  background: var(--tag-bg);
  color: var(--tag-color);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.blog-card-excerpt {
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.blog-card-excerpt p {
  color: var(--text-color);
  line-height: 1.6;
  margin: 0;
}

.blog-card-footer {
  margin-top: auto;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1px solid var(--link-color);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.read-more-btn:hover {
  background: var(--link-color);
  color: white;
  transform: translateX(2px);
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: var(--text-muted-color);
  font-style: italic;
}

.blog-footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.blog-footer a {
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.blog-footer a:hover {
  color: var(--link-hover-color);
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .blog-card {
    background: var(--card-bg);
    border-color: var(--card-border-color);
  }
  
  .category-tag {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-color);
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .blog-header h1 {
    font-size: 2rem;
  }
  
  .blog-card-content {
    padding: 1.25rem;
  }
  
  .blog-card-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>