document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('header, section');
  const backToTop = document.getElementById('back-to-top');
  const projectGrid = document.getElementById('project-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  fetch('data/projects.json')
    .then(res => res.json())
    .then(projects => {
      renderProjects(projects);
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const stack = btn.dataset.stack;
          const filtered = stack === 'All' ? projects : projects.filter(p => p.stack.includes(stack));
          renderProjects(filtered);
        });
      });
    });

  function renderProjects(list) {
    projectGrid.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.tabIndex = 0;
      const title = document.createElement('h3');
      title.textContent = p.title;
      const desc = document.createElement('p');
      desc.textContent = p.description;
      const tags = document.createElement('div');
      tags.className = 'tags';
      p.stack.forEach(s => {
        const span = document.createElement('span');
        span.textContent = s;
        tags.appendChild(span);
      });
      card.append(title, desc, tags);
      if (p.demo) {
        const demo = document.createElement('a');
        demo.href = p.demo;
        demo.textContent = 'Live Demo';
        demo.className = 'btn';
        demo.target = '_blank';
        demo.rel = 'noopener';
        demo.setAttribute('aria-label', `Live demo of ${p.title}`);
        card.appendChild(demo);
      }
      if (p.source) {
        const src = document.createElement('a');
        src.href = p.source;
        src.textContent = 'Source Code';
        src.className = 'btn';
        src.target = '_blank';
        src.rel = 'noopener';
        src.setAttribute('aria-label', `Source code of ${p.title}`);
        card.appendChild(src);
      }
      projectGrid.appendChild(card);
    });
  }

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  const hero = document.getElementById('hero');
  const topObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      backToTop.classList.toggle('show', !entry.isIntersecting);
    });
  });
  topObserver.observe(hero);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
