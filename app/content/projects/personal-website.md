Okay so i need to write some content about this perosnal website, it think the best idea here is to get basic plots and then expand on them with gpt

# Building a personal website

## Project Overview

This is a journey through the ins and outs of making the very website you find yourself on now, it didn't start in the shape you see it today, here's all the iteration.

- old website
  - why was it bad
    - I used to have a website, it looked something like this, (insert image). A bland copy of a premade template, it did the job, it showed all the information any good personal website would, but it was missing any real engieering, any real personality. So i set out to make something better, a website that felt like a experince, something that was fun to go through. I wanted the user to be crurious and excited at every page rather than scrolling through like any other website.
  - what did we want to do with the new one
    - Three.js
      - Whilst looking for some inperaation i stumbled into three.js portfolios and this seemed like the perfect way to really make my website feel alive. I soon after started mocking up some designs. addmitadly too abitious, maybe we can make some of them later.
  - show some images of it
    - some images of those ideas with expaltions
- new website, show iteration one talk about the larger goals and coming back to a more simple design
  - eventually i fell on something simpler, i have other things i need to do and well this website cant be a full time job. Keeping things with a clean UX and a exciting UI i landed on this.
- show the og mock up made with shadcn
  - show and expalin some code maybe go into the donut code talk about using shadcn stuff like that simple simple
- talk about getting the md portion of the website working
  - react md pages routing show off some code on this
- talk about having the simple version of the website down
  - and heres the result of all that work, i thought i would be done at this point and just fill in the content but i got inspired again to make it even more of a experience
- why move away from the orgional projects cards?
  - they were kinda boring got inspired by a more fun design
- new projects cards talk about the animation logic and making it smooth
  - add code here for sure
- new bg
  - talk about making the big one lol
  - lots of good talking on optimization tbh i did some cool stuff there oh yeah add the density slider idiot lol i love you too
- closing thoughts and iterations for the future
  - whatever comes to mind

# Building My Personal Website: A Journey Through Iteration and Exploration

## Project Overview

Creating a personal website is a unique opportunity to showcase not just your work but also your personality and technical skill. Here's the journey behind developing the website you're experiencing right now.

## Initial Website Design

### The Problem with My Old Website

Initially, my personal website was a straightforward copy of a pre-made template. While it successfully conveyed the necessary information—projects, resume, contact—it lacked personality, creativity, and genuine engineering challenges. The user experience was dull and uninspired, this needed to be changed who wants to hire someone with a boring website.

![Old Website Screenshot]

### Vision for the New Website

Driven by a desire for creativity and technical exploration, I aimed to build a website that felt more like an interactive experience rather than a static page, took a lot of initial inspo from VOID (recently taken down). I wanted visitors to feel curious, intrigued, and eager to explore each section. A good portfolio should have the user in awe wondering how such a thing was even created on the web.

#### Inspiration: Exploring Three.js

While researching creative portfolios, I encountered several stunning Three.js websites. These immersive, interactive experiences immediately captured my imagination. Motivated by this inspiration, I began drafting ambitious designs and concepts leveraging Three.js.

[Initial Three.js Mockups]
![[Pasted image 20250331212515.png]]
![[Pasted image 20250331212533.png]]
![[Pasted image 20250331212556.png]]
Although these early concepts were exciting, they proved overly ambitious for the immediate timeline. I recognized the importance of balancing aspiration with practical constraints.

## Simplifying the Vision

Ultimately, I decided to start with a simpler, yet polished design. Given my other commitments, it was crucial to manage complexity effectively, ensuring the website remained engaging without becoming overwhelming.

### Initial Mockups with Shadcn/UI

Using Shadcn/UI, I rapidly prototyped a clean and visually appealing interface. Shadcn streamlined component creation and provided an elegant foundation that was easy to maintain and scale.

Here's the original mock-up:

![Shadcn Initial Mockup]
![[Pasted image 20250331212629.png]]
![[Pasted image 20250331212657.png]]![[Pasted image 20250331212715.png]]

### Interactive Elements: The Donut Component

A playful yet simple addition was the interactive "donut" component, bringing a subtle element of delight. Leveraging Shadcn and some simple React logic made this straightforward yet effective.

```jsx
// Create Particle Geometry

const particleCount = 100000; // Torus parameters

const R = 80; // Main radius
const r = 20; // Tube radius
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  const theta = Math.random() * Math.PI * 2; // Angle around main ring
  const phi = Math.random() * Math.PI * 2; // Angle around tube
  const x = (R + r * Math.cos(phi)) * Math.cos(theta);

  const y = (R + r * Math.cos(phi)) * Math.sin(theta);

  const z = r * Math.sin(phi); // Optional: Adjust to create a subtle band or diagonal // Example: Uncomment to skew the torus // const skew = 0.3; // z += theta * skew;

  positions[i * 3] = x;

  positions[i * 3 + 1] = y;

  positions[i * 3 + 2] = z;
}
```

### Markdown Integration

Integrating markdown was critical to maintaining flexibility and ease of content updates. Utilizing React and markdown libraries, I set up dynamic routing and rendering:

```jsx
// Markdown Page Routing Example
import ReactMarkdown from 'react-markdown';

const MarkdownPage = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;

  const projects = [

  {

    id: "kernel-driver",

    title: "Kernel Driver",

    description: "A shared memeory kernel driver",

  },
};
```

## Expanding Beyond the Simple Version

Initially, I believed that reaching this simplified version would mark completion, allowing me to focus purely on content. However, inspiration struck again, pushing me to enhance the website further and make it even more engaging.

### Reimagining Project Cards

The original project cards felt static and uninspired. Inspired by more interactive and animated designs, I redeveloped them into dynamic components with smooth transitions.![[Pasted image 20250331212920.png]]

Here's how the new animations work:

```jsx
// Animation logic example using Framer Motion
import { motion } from "framer-motion";

const AnimatedCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {project.name}
  </motion.div>
);
```

##### **Mock two**

You can already see them on the website so ill spare, you the pictures for the sake of space. These new cards felt even better than the old ones giving it that little extra punch that was needed. It was fun to work with the animations and get things to a point where it was all flowing smoothly. If you want to look at the code its all open source on my github.

### Creating an Immersive Background

Later i added a significant enhancement, the immersive background, which added depth and interactivity to the website. Optimizing this background required some engineering solutions to maintain performance without sacrificing visual richness.

- Implemented performance optimizations
  I was originally using p.2 to render everything and well that worked for getting the initial mockup it was a nightmare to run the animation on the web. Since p.2 is single threaded on the cpu it really starts to throttle especially when simulating as much as i needed to. I tried some levels of optimization before switching as well, but none of this really did the trick. Checking the fps, pre calculating positions, clearing cache, drawing the function with adaptive quality and displaying within native screen size to name a few.

```jsx
 // Update FPS counter

      frameCount++

      if (currentTime - lastFpsUpdate >= fpsUpdateInterval) {

        const fps = Math.round((frameCount * 1000) / (currentTime - lastFpsUpdate))

        setFps(fps)



        // Adaptive quality based on performance

        if (fps < 25 && quality < 6) {

          setQuality((q) => q + 1) // Decrease quality if FPS is low

        } else if (fps > 40 && quality > 1) {

          setQuality((q) => q - 1) // Increase quality if FPS is high

        }



        frameCount = 0

        lastFpsUpdate = currentTime

      }

// Draw points with spatial optimization

      for (let y = 0; y < height; y += step) {

        for (let x = 0; x < width; x += step) {

          // Check if point is already in cache

          const cacheKey = `${Math.round(x)},${Math.round(y)},${Math.round(t * 100) / 100}`

          let point



          if (pointCache.has(cacheKey)) {

            point = pointCache.get(cacheKey)!

          } else {

            point = calculatePoint(x, y, t, width, height)



            // Only cache a limited number of points to avoid memory issues

            if (pointCache.size < 10000) {

              pointCache.set(cacheKey, point)

            }

          }

// Limit cache size by removing oldest entries

      if (pointCache.size > 8000) {

        const keysToDelete = Array.from(pointCache.keys()).slice(0, 2000)

        keysToDelete.forEach((key) => pointCache.delete(key))

      }



      animationId = requestAnimationFrame(draw)
```

None of these could really overcome the need for well using a gpu, p.2 is outdated and really not meant for what i was trying to do. I went back to three.js but it really lost a lot of the shading that i had working in p.2, so instead i moved to something more similar in webgl. This proved to work quite well and once the code was migrated over it rendered in a similar way just with the freedom to use a gpu, some more optimization was made for webgl but for the most part things were kept the same.

- Added interactive controls, including a density slider

This provided users with customizable engagement, greatly enhancing their interaction.

## Future Iterations and Closing Thoughts

The process of developing my personal website has been iterative and deeply rewarding. While I am satisfied with the current version, future plans include:

- Revisiting the ambitious Three.js ideas
- Further interactive elements to enhance user engagement
- Continuous optimization and refinement based on user feedback

This journey reflects both my growth as a developer and my commitment to creating engaging digital experiences. Stay tuned for future updates!
