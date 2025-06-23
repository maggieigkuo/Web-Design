// gsap scroll trigger
gsap.registerPlugin(ScrollTrigger);

// Fetch event data from JSON
fetch('solutions.json')
    .then(response => response.json() )
    .then(solutions => {
        const timeline = document.getElementById('timeline');

        // Dynamically create event elements
        solutions.forEach((solution, index) => {
            const solutionDiv = document.createElement('div');
            solutionDiv.className = `event ${ index % 2 === 0 ? 'event-top' : 'event-bottom' }`;

            solutionDiv.innerHTML = `
            <a href="${solution.link}" style="color:white;" target="_blank">
            <img src="${solution.image}" alt="${solution.title}">
            </a>
            <div class="event-content">
              <h3 class="event-title">${solution.title}</h3>
            </div>
          `;

            timeline.appendChild(solutionDiv);
        });

        // Initialize GSAP after events are added
        initializeScrollTrigger();
    })
    .catch(error => console.error('Error loading events:', error));





    
function initializeScrollTrigger() {
    const timeline = document.querySelector('.timeline');
    const timelineContainer = document.querySelector('.timeline-container');

    gsap.to(timeline, {
        x: () => -(timeline.scrollWidth - window.innerWidth) + "px",
        ease: "none",
        scrollTrigger: {
            trigger: timelineContainer,
            start: "top top",
            end: () => "+=" + (timeline.scrollWidth - window.innerWidth),
            scrub: true,
            pin: true,
        },
    });
}