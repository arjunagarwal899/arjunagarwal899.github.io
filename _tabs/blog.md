---
layout: page
title: Blog
icon: fas fa-blog
order: 1
---

<div class="blog-container">
  <div class="blog-header">
    <h1>📝 Research Papers & AI Insights</h1>
    <p>Deep dives into cutting-edge AI research, technical tutorials, and industry insights. Automatically synced from my <a href="https://medium.com/@arjunagarwal899" target="_blank" rel="noopener">Medium publication</a>.</p>
    
    <div class="blog-stats">
      {% assign blog_posts = site.posts | where: "medium_post", true %}
      <div class="stat">
        <span class="stat-number">{{ blog_posts.size }}</span>
        <span class="stat-label">Posts</span>
      </div>
      <div class="stat">
        {% assign total_tags = blog_posts | map: "tags" | join: "," | split: "," | uniq | size %}
        <span class="stat-number">{{ total_tags }}</span>
        <span class="stat-label">Topics</span>
      </div>
      <div class="stat">
        {% assign latest_post = blog_posts.first %}
        {% if latest_post %}
          {% assign days_ago = 'now' | date: '%s' | minus: latest_post.date | date: '%s' | divided_by: 86400 %}
          <span class="stat-number">{{ days_ago }}d</span>
          <span class="stat-label">Latest</span>
        {% else %}
          <span class="stat-number">-</span>
          <span class="stat-label">Latest</span>
        {% endif %}
      </div>
    </div>
  </div>

  <!-- Featured Post -->
  {% if blog_posts.size > 0 %}
  {% assign featured_post = blog_posts.first %}
  <div class="featured-post">
    <div class="featured-badge">✨ Latest Post</div>
    <h2 class="featured-title">
      <a href="{{ featured_post.external_url }}" target="_blank" rel="noopener">
        {{ featured_post.title }}
      </a>
    </h2>
    <div class="featured-meta">
      <time datetime="{{ featured_post.date | date_to_xmlschema }}">
        {{ featured_post.date | date: "%B %d, %Y" }}
      </time>
      {% if featured_post.tags and featured_post.tags.size > 0 %}
        <div class="featured-tags">
          {% for tag in featured_post.tags limit: 3 %}
            <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      {% endif %}
    </div>
    <p class="featured-excerpt">{{ featured_post.excerpt | strip_html | truncatewords: 40 }}</p>
    <a href="{{ featured_post.external_url }}" target="_blank" rel="noopener" class="featured-cta">
      Read Full Article <i class="fas fa-arrow-right"></i>
    </a>
  </div>
  {% endif %}

  <!-- Search and Filter -->
  <div class="blog-controls">
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="🔍 Search posts..." />
    </div>
    <div class="filter-tags">
      {% assign all_tags = blog_posts | map: "tags" | join: "," | split: "," | uniq | sort %}
      <select id="tagFilter">
        <option value="">All Topics ({{ blog_posts.size }})</option>
        {% for tag in all_tags %}
          {% if tag != blank %}
            {% assign tag_count = blog_posts | where_exp: "post", "post.tags contains tag" | size %}
            <option value="{{ tag }}">{{ tag }} ({{ tag_count }})</option>
          {% endif %}
        {% endfor %}
      </select>
    </div>
  </div>

  <!-- Blog Grid -->
  <div class="blog-grid" id="blogGrid">
    {% for post in blog_posts offset: 1 %}
    <article class="blog-card" data-tags="{{ post.tags | join: ',' | downcase }}" data-title="{{ post.title | downcase }}" data-excerpt="{{ post.excerpt | strip_html | downcase }}">
      <div class="blog-card-content">
        <div class="blog-card-header">
          <h3 class="blog-card-title">
            <a href="{{ post.external_url }}" target="_blank" rel="noopener">
              {{ post.title }}
            </a>
          </h3>
          <div class="blog-card-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              {{ post.date | date: "%b %d, %Y" }}
            </time>
            {% if post.tags and post.tags.size > 0 %}
            <div class="blog-card-tags">
              {% for tag in post.tags limit: 2 %}
                <span class="tag-small">{{ tag }}</span>
              {% endfor %}
              {% if post.tags.size > 2 %}
                <span class="tag-small tag-more">+{{ post.tags.size | minus: 2 }}</span>
              {% endif %}
            </div>
            {% endif %}
          </div>
        </div>
        
        <div class="blog-card-excerpt">
          <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
        </div>
        
        <div class="blog-card-footer">
          <a href="{{ post.external_url }}" target="_blank" rel="noopener" class="read-more-btn">
            Read on Medium
            <i class="fab fa-medium"></i>
          </a>
        </div>
      </div>
    </article>
    {% endfor %}
  </div>

  <!-- No Results Message -->
  <div id="noResults" class="no-results" style="display: none;">
    <div class="no-results-content">
      <i class="fas fa-search fa-3x"></i>
      <h3>No posts found</h3>
      <p>Try adjusting your search terms or filters</p>
    </div>
  </div>

  {% if blog_posts.size == 0 %}
  <div class="empty-state">
    <div class="empty-content">
      <i class="fas fa-blog fa-3x"></i>
      <h3>Coming Soon!</h3>
      <p>Blog posts will appear here automatically when synced from Medium.</p>
      <a href="https://medium.com/@arjunagarwal899" target="_blank" rel="noopener" class="cta-button">
        Visit Medium <i class="fab fa-medium"></i>
      </a>
    </div>
  </div>
  {% endif %}

  <div class="blog-footer">
    <div class="footer-content">
      <p>
        <strong>Want to stay updated?</strong> Follow me on 
        <a href="https://medium.com/@arjunagarwal899" target="_blank" rel="noopener">
          Medium <i class="fab fa-medium"></i>
        </a>
        for the latest posts, or 
        <a href="https://www.linkedin.com/in/arjunagarwal899" target="_blank" rel="noopener">
          LinkedIn <i class="fab fa-linkedin"></i>
        </a>
        for professional updates.
      </p>
      <div class="sync-info">
        <small>
          <i class="fas fa-sync-alt"></i> 
          Posts automatically synced every 6 hours from Medium
        </small>
      </div>
    </div>
  </div>
</div>

<style>
/* Enhanced Blog Styles */
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
  margin: 0 auto 2rem auto;
  line-height: 1.6;
}

.blog-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: var(--link-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Featured Post */
.featured-post {
  background: linear-gradient(135deg, var(--card-bg) 0%, var(--sidebar-bg) 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  border: 1px solid var(--card-border-color);
  position: relative;
  overflow: hidden;
}

.featured-post::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.featured-badge {
  display: inline-block;
  background: var(--link-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.featured-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.featured-title a {
  color: var(--heading-color);
  text-decoration: none;
}

.featured-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-muted-color);
}

.featured-tags {
  display: flex;
  gap: 0.5rem;
}

.featured-excerpt {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.featured-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--link-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.featured-cta:hover {
  background: var(--link-hover-color);
  transform: translateY(-2px);
}

/* Controls */
.blog-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--card-bg);
  color: var(--text-color);
}

.filter-tags select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-color);
  font-size: 1rem;
  min-width: 200px;
}

/* Blog Grid */
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
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid var(--card-border-color);
  opacity: 1;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.blog-card.hidden {
  display: none;
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
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-muted-color);
}

.blog-card-tags {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.tag, .tag-small {
  background: var(--tag-bg, rgba(var(--link-color-rgb, 59, 130, 246), 0.1));
  color: var(--link-color);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--link-color);
}

.tag-small {
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
}

.tag-more {
  background: var(--text-muted-color);
  color: white;
  border-color: var(--text-muted-color);
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

/* Empty and Error States */
.empty-state, .no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-muted-color);
}

.empty-content, .no-results-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-content i, .no-results-content i {
  color: var(--text-muted-color);
  margin-bottom: 1rem;
}

.empty-content h3, .no-results-content h3 {
  margin-bottom: 1rem;
  color: var(--heading-color);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--link-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: var(--link-hover-color);
  transform: translateY(-2px);
}

/* Footer */
.blog-footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.footer-content p {
  margin-bottom: 1rem;
}

.footer-content a {
  color: var(--link-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-content a:hover {
  color: var(--link-hover-color);
}

.sync-info {
  color: var(--text-muted-color);
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-header h1 {
    font-size: 2rem;
  }
  
  .blog-stats {
    gap: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .featured-post {
    padding: 1.5rem;
  }
  
  .featured-title {
    font-size: 1.5rem;
  }
  
  .blog-controls {
    flex-direction: column;
  }
  
  .filter-tags select {
    min-width: 100%;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .blog-card-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .blog-container {
    padding: 1rem 0.5rem;
  }
  
  .blog-stats {
    flex-direction: row;
    gap: 1rem;
  }
  
  .blog-card-content {
    padding: 1.25rem;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const tagFilter = document.getElementById('tagFilter');
  const blogGrid = document.getElementById('blogGrid');
  const noResults = document.getElementById('noResults');
  const blogCards = blogGrid.querySelectorAll('.blog-card');

  function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedTag = tagFilter.value.toLowerCase();
    let visibleCount = 0;

    blogCards.forEach(card => {
      const title = card.dataset.title;
      const excerpt = card.dataset.excerpt;
      const tags = card.dataset.tags;
      
      const matchesSearch = !searchTerm || 
        title.includes(searchTerm) || 
        excerpt.includes(searchTerm);
      
      const matchesTag = !selectedTag || 
        tags.includes(selectedTag);
      
      if (matchesSearch && matchesTag) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Show/hide no results message
    if (visibleCount === 0 && (searchTerm || selectedTag)) {
      noResults.style.display = 'block';
      blogGrid.style.display = 'none';
    } else {
      noResults.style.display = 'none';
      blogGrid.style.display = 'grid';
    }
  }

  // Add event listeners
  searchInput.addEventListener('input', filterPosts);
  tagFilter.addEventListener('change', filterPosts);
  
  // Add smooth scroll for better UX
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
</script>