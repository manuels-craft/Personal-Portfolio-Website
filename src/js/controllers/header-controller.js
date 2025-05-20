export function createHeaderController({ header }) {
  // state
  let isScroll = false;

  // setState
  const setState = (scroll) => {
    isScroll = scroll;
    header.classList.toggle("header-scrolled", isScroll);
  };

  // generate
  const genSectionsArr = () => {
    const sectionLinks = [];
    const pageLinks = [];
    const sections = [];

    const links = [...document.querySelectorAll("a")];

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        sectionLinks.push(link);
        sections.push(href.slice(1));
      } else {
        pageLinks.push(link);
      }
    });

    return {
      sectionLinks,
      pageLinks,
      sections,
    };
  };

  const updateActiveLink = () => {
    const { sectionLinks, pageLinks, sections } = genSectionsArr();
    let matchFound = false;

    for (let i = 0; i < sections.length; i++) {
      const id = sections[i];
      const element = document.getElementById(id);
      const top = element.getBoundingClientRect().top;
      const bottom = element.getBoundingClientRect().bottom;

      if (!element) continue;
      if (top <= 400 && bottom > 400) {
        sectionLinks.forEach((link) => link.classList.remove("active"));
        pageLinks.forEach((link) => link.classList.remove("active"));

        sectionLinks[i].classList.add("active");
        matchFound = true;
        break;
      }
    }

    if (!matchFound) {
      sectionLinks.forEach((link) => link.classList.remove("active"));
      pageLinks.forEach((link) => {
        const linkPath = new URL(link.href).pathname;
        const currentPath = window.location.pathname;
        if (linkPath === currentPath) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  };

  const handleScroll = () => {
    setState(window.scrollY > 100);
    updateActiveLink();
  };

  function init() {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("DOMContentLoaded", handleScroll);
    window.addEventListener("DOMContentLoaded", genSectionsArr);
  }

  return { init, handleScroll, genSectionsArr };
}
