document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
  })

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector("nav ul")

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav") && !e.target.closest(".menu-toggle")) {
      navMenu.classList.remove("active")
    }
  })

  // Skill progress animation
  const skillItems = document.querySelectorAll(".skill-item")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector(".skill-progress")
          progressBar.style.width =
            progressBar.style.width || progressBar.getAttribute("style").split("width:")[1].trim()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  skillItems.forEach((item) => {
    observer.observe(item)
  })

  // No form submission code needed

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        navMenu.classList.remove("active")

        // Scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll("section[id]")

  function highlightNavLink() {
    const scrollY = window.pageYOffset

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight
      const sectionTop = section.offsetTop - 100
      const sectionId = section.getAttribute("id")

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector("nav ul li a[href*=" + sectionId + "]")?.classList.add("active")
      } else {
        document.querySelector("nav ul li a[href*=" + sectionId + "]")?.classList.remove("active")
      }
    })
  }

  window.addEventListener("scroll", highlightNavLink)

  // Initialize animations
  highlightNavLink()

  // Typing effect for subtitle
  function typeText(element, speed = 100) {
    const text = element.getAttribute("data-text")
    element.textContent = ""
    let i = 0

    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(typing, speed)
      } else {
        // Once typing is complete, wait and then reset to start again
        setTimeout(() => {
          element.textContent = ""
          i = 0
          typing()
        }, 3000)
      }
    }

    typing()
  }

  // Initialize typing effects
  const typingElements = document.querySelectorAll(".typing-text, .typing-about")
  typingElements.forEach((element) => {
    typeText(element, element.classList.contains("typing-about") ? 120 : 80)
  })
})

