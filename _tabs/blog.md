---
layout: page
title: Blog
icon: fas fa-blog
order: 2
description: "My latest thoughts and insights on AI, machine learning, and technology - automatically synced from Medium."
---

<div class="blog-container">
  <div class="blog-header">
    <h1>My Blog Posts</h1>
    <p>Here are my latest thoughts and insights on AI, machine learning, and technology, automatically synced from <a href="https://medium.com/@arjunagarwal899" target="_blank" rel="noopener">Medium</a>.</p>
    
    {% assign blog_posts = site.posts | where: "medium_post", true %}
    {% if blog_posts.size > 0 %}
    <div class="blog-stats">
      <span class="stat-item">
        <i class="fas fa-newspaper"></i>
        {{ blog_posts.size }} posts published
      </span>
      <span class="stat-item">
        <i class="fas fa-calendar"></i>
        Last updated: {{ blog_posts.first.date | date: "%B %d, %Y" }}
      </span>
    </div>
    {% endif %}
  </div>

  <!-- Filter and Search -->
  <div class="blog-controls">
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input type="text" id="blog-search" placeholder="Search posts..." />
    </div>
    
    <div class="filter-tags">
      <span class="filter-label">Filter by topic:</span>
      <button class="tag-filter active" data-tag="all">All</button>
      {% assign all_tags = blog_posts | map: "tags" | join: "," | split: "," | sort | uniq %}
      {% for tag in all_tags limit: 8 %}
        {% unless tag == "Medium" or tag == "Blog" or tag == "" %}
          <button class="tag-filter" data-tag="{{ tag }}">{{ tag }}</button>
        {% endunless %}
      {% endfor %}
    </div>
  </div>

  <div class="blog-grid" id="blog-grid">
    {% for post in blog_posts limit: 24 %}
    <article class="blog-card" data-tags="{{ post.tags | join: ',' | downcase }}">
      <div class="blog-card-content">
        <div class="blog-card-header">
          <h3 class="blog-card-title">
            <a href="{{ post.external_url }}" target="_blank" rel="noopener">
              {{ post.title }}
            </a>
          </h3>
          <div class="blog-card-meta">
            <time datetime="{{ post.date | date_to_xmlschema }}">
              <i class="fas fa-calendar-alt"></i>
              {{ post.date | date: "%B %d, %Y" }}
            </time>
            {% if post.tags %}
            <div class="blog-card-tags">
              {% for tag in post.tags limit: 3 %}
                {% unless tag == "Medium" or tag == "Blog" %}
                  <span class="tag">{{ tag }}</span>
                {% endunless %}
              {% endfor %}
            </div>
            {% endif %}
          </div>
        </div>
        
        <div class="blog-card-excerpt">
          <p>{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
        </div>
        
        <div class="blog-card-footer">
          <a href="{{ post.external_url }}" target="_blank" rel="noopener" class="read-more-btn">
            <span>Read on Medium</span>
            <i class="fab fa-medium"></i>
          </a>
          <div class="post-reading-time">
            {% assign words = post.excerpt | strip_html | number_of_words %}
            {% assign reading_time = words | divided_by: 200 | plus: 1 %}
            <i class="fas fa-clock"></i>
            {{ reading_time }} min read
          </div>
        </div>
      </div>
    </article>
    {% endfor %}
  </div>

  {% if blog_posts.size == 0 %}
  <div class="no-posts">
    <div class="no-posts-icon">
      <i class="fas fa-newspaper"></i>
    </div>
    <h3>No blog posts found</h3>
    <p>Posts will appear here automatically when synced from Medium.</p>
    <p>The sync happens every 6 hours, or you can trigger it manually from the repository.</p>
    <a href="https://github.com/arjunagarwal899/arjunagarwal899.github.io/actions" target="_blank" rel="noopener" class="check-sync-btn">
      <i class="fas fa-sync-alt"></i>
      Check Sync Status
    </a>
  </div>
  {% endif %}

  <div class="no-results" id="no-results" style="display: none;">
    <div class="no-results-icon">
      <i class="fas fa-search"></i>
    </div>
    <h3>No posts found</h3>
    <p>Try adjusting your search or filter criteria.</p>
  </div>

  {% if blog_posts.size > 24 %}
  <div class="load-more-container">
    <button id="load-more-btn" class="load-more-btn">
      <span>Load More Posts</span>
      <i class="fas fa-chevron-down"></i>
    </button>
  </div>
  {% endif %}

  <div class="blog-footer">
    <div class="footer-content">
      <p>
        <i class="fab fa-medium"></i>
        Want to see all my posts? Visit my 
        <a href="https://medium.com/@arjunagarwal899" target="_blank" rel="noopener">
          Medium profile
        </a>
      </p>
      <p class="sync-info">
        <i class="fas fa-sync-alt"></i>
        Posts are automatically synced every 6 hours from Medium
      </p>
    </div>
  </div>
</div>

<style>
:root {
  --blog-primary: #667eea;
  --blog-secondary: #764ba2;
  --blog-accent: #f093fb;
  --blog-text: var(--text-color);
  --blog-text-muted: var(--text-muted-color);
  --blog-bg: var(--main-bg);
  --blog-card-bg: var(--card-bg);
  --blog-border: var(--border-color);
  --blog-shadow: rgba(0, 0, 0, 0.1);
  --blog-hover-shadow: rgba(0, 0, 0, 0.15);
}

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
  background: linear-gradient(135deg, var(--blog-primary) 0%, var(--blog-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.blog-header p {
  font-size: 1.1rem;
  color: var(--blog-text-muted);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.blog-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--blog-text-muted);
  font-size: 0.9rem;
}

.stat-item i {
  color: var(--blog-primary);
}

.blog-controls {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.search-box {
  position: relative;
  max-width: 400px;
  width: 100%;
}

.search-box i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--blog-text-muted);
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid var(--blog-border);
  border-radius: 2rem;
  background: var(--blog-card-bg);
  color: var(--blog-text);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: var(--blog-primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-label {
  font-weight: 600;
  color: var(--blog-text);
  margin-right: 0.5rem;
}

.tag-filter {
  padding: 0.5rem 1rem;
  border: 2px solid var(--blog-border);
  background: var(--blog-card-bg);
  color: var(--blog-text);
  border-radius: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  font-weight: 500;
}

.tag-filter:hover,
.tag-filter.active {
  background: var(--blog-primary);
  border-color: var(--blog-primary);
  color: white;
  transform: translateY(-2px);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background: var(--blog-card-bg);
  border-radius: 16px;
  box-shadow: 0 4px 6px var(--blog-shadow);
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid var(--blog-border);
  position: relative;
}

.blog-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--blog-primary), var(--blog-secondary), var(--blog-accent));
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px var(--blog-hover-shadow);
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
  font-weight: 600;
}

.blog-card-title a {
  color: var(--heading-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.blog-card-title a:hover {
  color: var(--blog-primary);
}

.blog-card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--blog-text-muted);
}

.blog-card-meta time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.blog-card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: linear-gradient(135deg, var(--blog-primary), var(--blog-secondary));
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.blog-card-excerpt {
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.blog-card-excerpt p {
  color: var(--blog-text);
  line-height: 1.6;
  margin: 0;
}

.blog-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 1rem;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  background: linear-gradient(135deg, var(--blog-primary), var(--blog-secondary));
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: 2rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.read-more-btn:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.post-reading-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--blog-text-muted);
  font-size: 0.8rem;
}

.no-posts,
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--blog-text-muted);
}

.no-posts-icon,
.no-results-icon {
  font-size: 4rem;
  color: var(--blog-primary);
  margin-bottom: 1rem;
}

.no-posts h3,
.no-results h3 {
  margin-bottom: 1rem;
  color: var(--heading-color);
}

.check-sync-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  background: var(--blog-primary);
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.check-sync-btn:hover {
  background: var(--blog-secondary);
  transform: translateY(-2px);
}

.load-more-container {
  text-align: center;
  margin: 2rem 0;
}

.load-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--blog-card-bg);
  border: 2px solid var(--blog-primary);
  color: var(--blog-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.load-more-btn:hover {
  background: var(--blog-primary);
  color: white;
}

.blog-footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--blog-border);
}

.footer-content p {
  margin: 0.5rem 0;
  color: var(--blog-text-muted);
}

.footer-content a {
  color: var(--blog-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-content a:hover {
  color: var(--blog-secondary);
}

.sync-info {
  font-size: 0.9rem;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-container {
    padding: 1rem 0.5rem;
  }
  
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
  
  .blog-card-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  
  .blog-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .blog-controls {
    margin-bottom: 1.5rem;
  }
  
  .filter-tags {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .blog-header h1 {
    font-size: 1.75rem;
  }
  
  .blog-card-title {
    font-size: 1.1rem;
  }
  
  .filter-tags {
    flex-direction: column;
    align-items: center;
  }
  
  .filter-label {
    margin-bottom: 0.5rem;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  :root {
    --blog-shadow: rgba(0, 0, 0, 0.3);
    --blog-hover-shadow: rgba(0, 0, 0, 0.4);
  }
}

/* Animation for cards appearing */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.blog-card {
  animation: slideInUp 0.6s ease-out;
}

/* Hidden class for filtering */
.blog-card.hidden {
  display: none;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('blog-search');
  const tagFilters = document.querySelectorAll('.tag-filter');
  const blogCards = document.querySelectorAll('.blog-card');
  const noResults = document.getElementById('no-results');
  const blogGrid = document.getElementById('blog-grid');
  
  let currentFilter = 'all';
  let currentSearch = '';
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      currentSearch = e.target.value.toLowerCase();
      filterPosts();
    });
  }
  
  // Tag filter functionality
  tagFilters.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      tagFilters.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      currentFilter = this.dataset.tag;
      filterPosts();
    });
  });
  
  function filterPosts() {
    let visibleCount = 0;
    
    blogCards.forEach(card => {
      const title = card.querySelector('.blog-card-title a').textContent.toLowerCase();
      const excerpt = card.querySelector('.blog-card-excerpt p').textContent.toLowerCase();
      const tags = card.dataset.tags.toLowerCase();
      
      // Check search match
      const searchMatch = currentSearch === '' || 
        title.includes(currentSearch) || 
        excerpt.includes(currentSearch) ||
        tags.includes(currentSearch);
      
      // Check tag filter match
      const tagMatch = currentFilter === 'all' || 
        tags.includes(currentFilter.toLowerCase());
      
      if (searchMatch && tagMatch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });
    
    // Show/hide no results message
    if (noResults) {
      if (visibleCount === 0 && (currentSearch !== '' || currentFilter !== 'all')) {
        noResults.style.display = 'block';
        blogGrid.style.display = 'none';
      } else {
        noResults.style.display = 'none';
        blogGrid.style.display = 'grid';
      }
    }
  }
  
  // Load more functionality (if implemented)
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // This would be implemented if you have pagination
      console.log('Load more posts...');
    });
  }
});
</script>