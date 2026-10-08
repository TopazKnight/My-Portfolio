class ProjectEngine {
  constructor(jsonPath, containerId) {
    this.jsonPath = jsonPath;
    this.container = document.getElementById(containerId);
    this.projects = [];
  }

  async loadProjects() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error("Gagal memuat data project");
      this.projects = await response.json();
      this.renderProjects(this.projects);
    } catch (error) {
      console.error("ProjectEngine Error:", error);
      if (this.container) {
        this.container.innerHTML = `<p class="error-msg">Gagal memuat data project.</p>`;
      }
    }
  }

  renderProjects(items) {
    if (!this.container) return;
    this.container.innerHTML = items.map(item => `
      <article class="project-card reveal visible" data-category="${item.category}">
        <div class="project-image ${item.gradient}">
          <span class="project-badge">${item.badge}</span>
        </div>
        <div class="project-body">
          <p class="project-type">${item.type}</p>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="tags">
            ${item.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
          <a href="${item.link}" class="project-link" aria-label="Lihat Project ${item.title}">Lihat Detail →</a>
        </div>
      </article>
    `).join('');
  }

  filterProjects(category) {
    if (category === "all") {
      this.renderProjects(this.projects);
    } else {
      const filtered = this.projects.filter(p => p.category === category);
      this.renderProjects(filtered);
    }
  }
}
