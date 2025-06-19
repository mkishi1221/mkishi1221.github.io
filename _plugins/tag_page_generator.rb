module Jekyll
  class TagPageGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Get all unique tags from posts
      all_tags = []
      Dir["_posts/*.{md,markdown}"].each do |post_path|
        content = File.read(post_path)
        if content =~ /tags:\s*\[(.*?)\]/
          tags = $1.split(',').map { |t| t.strip.gsub(/['"]/,'') }
          all_tags.concat(tags)
        end
      end
      all_tags = Set.new(all_tags)

      # Create tag directory if it doesn't exist
      FileUtils.mkdir_p('tag') unless Dir.exist?('tag')

      # Get existing tag directories
      existing_tags = Set.new(Dir.glob('tag/*').select { |f| File.directory?(f) }.map { |f| File.basename(f) })

      # Remove tag directories that don't have corresponding posts
      (existing_tags - all_tags).each do |tag_to_remove|
        tag_dir = "tag/#{tag_to_remove}"
        if Dir.exist?(tag_dir)
          FileUtils.rm_rf(tag_dir)
          Jekyll.logger.info "Tags:", "Removed tag page for '#{tag_to_remove}'"
        end
      end

      # Generate tag pages for new tags
      all_tags.each do |tag|
        tag_dir = "tag/#{tag}"
        FileUtils.mkdir_p(tag_dir) unless Dir.exist?(tag_dir)
        
        # Only create index.html if it doesn't exist
        tag_file = "#{tag_dir}/index.html"
        unless File.exist?(tag_file)
          File.open(tag_file, 'w') do |f|
            f.write(<<~CONTENT)
---
layout: default
title: #{tag}
tag: #{tag}
---
{% assign posts = site.posts | where_exp: "post", "post.tags contains page.tag" %}
{% assign first_post = posts.first %}

<div class="container">
  <div class="tag" {% if first_post.image %} style="background-image: url({{ first_post.image }});" {% endif %}>
    <div class="row">
      <div class="col col-8 push-2 col-d-12 push-d-0">
        <div class="tag__inner">
          <h1 class="tag__title">{{ page.title }}</h1>
          <div class="tag__counter">
            <span>{{ posts.size }}</span>
            <small>{% if posts.size < 2 %}Article{% else %}Articles{% endif %}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col col-12">
      <div class="contaniner__inner animate">
        <div class="row">
          {% for post in posts %}
            {% include article-content.html %}
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
</div>
CONTENT
          end
          Jekyll.logger.info "Tags:", "Created new tag page for '#{tag}'"
        end
      end
    end
  end
end 