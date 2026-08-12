/* ==========================================================================
   PlanForge Project Website - JavaScript Controls
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Active State on Scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  function highlightNavOnScroll() {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 2. Tab Switching Logic (Generic for multiple tab groups)
  const tabGroups = document.querySelectorAll('.tab-container');

  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const contents = group.querySelectorAll('.tab-content');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetContent = group.querySelector(`#${targetId}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });

  // 3. One-Click Copy Functionality for Code & BibTeX
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-target');
      let textToCopy = '';

      if (targetId) {
        const targetElem = document.querySelector(`#${targetId}`);
        if (targetElem) {
          textToCopy = targetElem.innerText || targetElem.textContent;
        }
      } else {
        // Fallback: look for pre code inside the wrapper
        const wrapper = btn.closest('.code-block-wrapper');
        if (wrapper) {
          const codeElem = wrapper.querySelector('code');
          if (codeElem) {
            textToCopy = codeElem.innerText || codeElem.textContent;
          }
        }
      }

      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
          const originalText = btn.innerHTML;
          btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Copied!
          `;
          btn.style.background = 'rgba(16, 185, 129, 0.25)';
          btn.style.color = '#34D399';

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy text: ', err);
        });
      }
    });
  });
});
