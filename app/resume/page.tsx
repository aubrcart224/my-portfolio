

export default function ResumePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Resume</h1>
      <div className="prose prose-invert max-w-2xl">
        <h2>Experience</h2>
        <ul>
          <li>Software Engineer at Tech Company A (2020-Present)</li>
          <li>Junior Developer at Startup B (2018-2020)</li>
        </ul>

        <h2>Education</h2>
        <ul>
          <li>B.S. in Computer Science, University X (2014-2018)</li>
        </ul>

        <h2>Skills</h2>
        <ul>
          <li>JavaScript, TypeScript, React, Next.js</li>
          <li>Node.js, Express, MongoDB</li>
          <li>HTML, CSS, Tailwind CSS</li>
          <li>Git, GitHub, CI/CD</li>
        </ul>
      </div>
      </>
  )
}