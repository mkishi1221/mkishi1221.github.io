module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      tags = site.posts.docs.flat_map { |post| post.data['tags'] || [] }.uniq
      tags.each do |tag|
        site.pages << TagPage.new(site, site.source, 'tag', tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = "#{tag}/index.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_page.html')
      
      posts = site.posts.docs.select { |post| post.data['tags']&.include?(tag) }
      first_post = posts.first
      
      self.data['title'] = tag
      self.data['posts'] = posts
      self.data['tag'] = tag
      self.data['first_post'] = first_post
    end
  end
end 