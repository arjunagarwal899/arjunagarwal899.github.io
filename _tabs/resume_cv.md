---
layout: page
title: "Resume / CV"
icon: fas fa-download
order: 5
---


<style>
  .resume-frame {
    width: 100%;
    margin: 1rem 0 0;
    background: var(--card-bg, #111);
    border: 1px solid var(--card-border, rgba(255, 255, 255, 0.1));
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .resume-frame iframe {
    width: 100%;
    min-height: 80vh;
    border: none;
    background: #1c1c1c;
  }

  @media (min-height: 900px) {
    .resume-frame iframe {
      min-height: 900px;
    }
  }

  @media (max-width: 768px) {
    .resume-frame iframe {
      min-height: 75vh;
    }
  }

  .resume-actions {
    margin-top: 0.75rem;
    font-size: 0.95rem;
  }

  .resume-actions a {
    font-weight: 600;
  }
</style>



{% assign resume_pdf_url = "https://raw.githubusercontent.com/arjunagarwal899/resume-cv/main/resume-cv.pdf" %}

<div class="resume-frame">
  <iframe
    src="https://mozilla.github.io/pdf.js/web/viewer.html?file={{ resume_pdf_url | uri_escape }}#zoom=page-zoom&pagemode=none"
    title="Resume PDF preview"
    loading="lazy"
    allow="fullscreen"
    referrerpolicy="no-referrer"
  ></iframe>
</div>

<p class="resume-actions">
  Having trouble viewing? 
  <a href="https://github.com/arjunagarwal899/resume-cv/blob/main/resume-cv.pdf" target="_blank" rel="noopener">Open the PDF in a new tab</a>
  or <a href="{{ resume_pdf_url }}" download>download it directly</a>.
</p>
