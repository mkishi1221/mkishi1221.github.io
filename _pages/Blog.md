---
layout: blog
title: Blog
permalink: /blog/
image: '/images/blog.jpg'
pagination:
  enabled: true
  per_page: 5
  permalink: '/page/:num/'
  title: ':title - page :num'
  limit: 0
  sort_field: 'date'
  sort_reverse: true
---

<div class="container">
  <div class="row animate">
    {% for post in paginator.posts %}
      {% include article-content.html %}
    {% endfor %}
  </div>
</div>

{% include pagination.html %}