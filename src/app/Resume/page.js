export const metadata = {
    title: "Nathan Davis - Resume/CV",
    description: "This is a copy of my Resume/CV",
    author: "Nathan Davis"
}

export default function Resume(){
    return(
        <div className="place-items-center">
            <div class="grid grid-cols-6 justify-center">
                <div className="max-w-4xl text-center col-span-6">
                    <h1 className="text-5xl font-medium py-5">Resume/CV</h1>
                </div>
                <hr className="col-span-6 border-zinc-500 mb-3" />

                <div className="max-w-4xl col-span-6">
                    <blockquote className="my-8">
                    <b>Go to: </b> 
                    <a href="#summary">Summary</a> | <a href="#education">Education</a> | <a href="#skills">Technical Skills</a> | <a href="#projects">Projects</a> | <a href="#experience">Experience</a> | <a href="#about-me">About Me</a> | <a href="/Resume/nathan-davis-resume.pdf">PDF</a>
                    </blockquote>
                </div>
                <hr className="col-span-6 border-zinc-500 mb-3" />

                <div className="max-w-4xl col-span-6" style={{fontSize: '18px'}}>
                    <h2 id="summary" style={{fontSize: '30px'}}>Summary</h2>

                    <p className="mr-2 mb-3 mt-1">
                        I am a software engineer proficient in C#, JavaScript, HTML, CSS, and C++. I have some experience writing Java, Python, SQL, and C.
                        I also have some exposure to the MASM language.
                    </p>
                    <p className="mr-2 mb-3">
                        I am proficient in the .NET/.NET Core Framework with C# and the C++ STL. 
                        I also have some experience with React, Next.js, Bootstrap, Tailwind, Django, and Microsoft's Playwright
                    </p>
                    <p className="mr-2 mb-3">
                        I have managed group/individual projects using GitHub and Git Version Control with Trello, following the Agile methodology.
                    </p>
                    <p className="mr-2 mb-5">
                        I currently live in Weber County in northern Utah. I am open to remote work, as well as work in the Greater Salt Lake City Metropolitan area.
                    </p>
                </div>
                <hr className="col-span-6 border-zinc-500 mb-3" />

                <div className="max-w-4xl col-span-6">
                    <h2 id="education" style={{fontSize: '30px'}}>Education</h2>
                </div>
                <div className="max-w-2xl col-span-3 mt-3"><b className="text-start text-xl">Weber State University</b></div>
                <div className="max-w-2xl col-span-3 mt-3"><p className="text-end">2024</p></div>
                <div className="max-w-4xl col-span-6 mb-5" style={{fontSize: '18px'}}>
                    <i>Bachelor of Science in Computer Science, 3.77 GPA | cum laude</i>
                    <p className="mt-3">
                        <b>Relavent Courses: </b> Data Structures and Algorithms, Advanced Database Programming, Object-Oriented Programming </p>
                        <p>&emsp;Web Development, Network Fundamentals</p>
                </div>
                <hr className="col-span-6 border-zinc-500 mb-3" />

                <div className="max-w-4xl col-span-6">
                    <h2 id="skills" style={{fontSize: '30px'}}>Technical Skills</h2>
                </div>
                <div className="max-w-4xl col-span-6 ml-6 mb-5" style={{fontSize: '18px'}}>
                    <ul>
                        <li><b>Languages:</b> C#, JavaScript, Python, HTML, CSS, SQL, C++</li>
                        <li><b>Frameworks:</b> .NET, React, Next.js, Bootstrap, Tailwind, Django, Playwright</li>
                        <li><b>DevOps/Tools:</b> OOP, Git, AWS, Agile, CI/CD (GitHub Actions), Microsoft SQL Server, MySQL</li>
                    </ul>
                </div>
                <hr className="col-span-6 border-zinc-500 mb-3" />

                <div className="max-w-4xl col-span-6">
                    <h2 id="projects" style={{fontSize: '30px'}}>Technical Projects</h2>
                </div>
                <div className="max-w-3xl col-span-5 mt-3" style={{fontSize: '18px'}}><b className="text-start">CAPSTONE: Appointment Scheduling System</b> | <i>C#, .NET, JavaScript, SQL, Bootstrap, Git</i></div>
                <div className="max-w-1xl col-span-1 mt-3" style={{fontSize: '18px'}}><p className="text-end">Feb 2024 &ndash; Apr 2024</p></div>
                <div className="col-span-6 text-end" style={{fontSize: '18px'}}>
                    <a className="text-end" href="https://github.com/nathandavis18/Steamboat-Willie" target="_blank" style={{color: '#ededed', textDecorationLine: 'none'}}>github.com/nathandavis18/Steamboat-Willie</a>
                </div>
                <div className="max-w-4xl col-span-6 ml-6 mb-3" style={{fontSize: '18px'}}>
                    <ul>
                        <li>
                            Collaborated with a team of 4 engineers to design and build a SaaS platform enabling students to schedule appointments with advisors/instructors; 
                            adopted by Weber State University for educational and non-commercial uses
                        </li>
                        <li>
                            Enhanced basic minimum viable product into a polished system by leveraging client-based insights from advisors and instructors, 
                            leading to an improvement in product functionality and user experience
                        </li>
                        <li>
                            Designed filtering algorithm enabling students to filter for specific appointments, decreasing appointment search time
                        </li>
                        <li>
                            Implemented automated integration with Google Calendar to populate user's calendar via Google's Calendar V3 API
                        </li>
                        <li>
                            Incorporated Google and Microsoft external authentication services allowing users to 
                            login and signup using 3rd party services via Google's and Microsoft's OAuth2.0 APIs
                        </li>
                    </ul>
                </div>

                <div className="max-w-3xl col-span-5 mt-3" style={{fontSize: '18px'}}><b className="text-start">Terminal Based Text Editor</b> | <i>C++</i></div>
                <div className="max-w-1xl col-span-1 mt-3" style={{fontSize: '18px'}}><p className="text-end">July 2024 &ndash; Sep 2024</p></div>
                <div className="col-span-6 text-end" style={{fontSize: '18px'}}>
                    <a className="text-end" href="https://github.com/nathandavis18/NotVim-Editor" target="_blank" style={{color: '#ededed', textDecorationLine: 'none'}}>github.com/nathandavis18/NotVim-Editor</a>
                </div>
                <div className="max-w-4xl col-span-6 ml-6 mb-3" style={{fontSize: '18px'}}>
                    <ul>
                        <li>
                            Built a VIM-like terminal-based text editor with 0 dependencies utilizing C++ and the CMake build system
                        </li>
                        <li>
                            Authored algorithms for precise rendering adjustments, ensuring a smooth user experience
                        </li>
                        <li>
                            Leveraged OS-specific APIs for cross-platform terminal interactions
                        </li>
                    </ul>
                </div>

                <div className="max-w-3xl col-span-5 mt-3" style={{fontSize: '18px'}}><b className="text-start">Portfolio Website</b> | <i>JavaScript, React/Next.js, HTML, CSS, Tailwind</i></div>
                <div className="max-w-1xl col-span-1 mt-3" style={{fontSize: '18px'}}><p className="text-end">June 2024 &ndash; Present</p></div>
                <div className="col-span-6 text-end" style={{fontSize: '18px'}}>
                    <a className="text-end" href="https://github.com/nathandavis18/portfolio" target="_blank" style={{color: '#ededed', textDecorationLine: 'none'}}>github.com/nathandavis18/portfolio</a>
                </div>
                <div className="max-w-4xl col-span-6 ml-6 mb-3" style={{fontSize: '18px'}}>
                    <ul>
                        <li>
                            Built a static React/Next.js app portfolio to showcase my skills and projects
                        </li>
                        <li>
                            Created as a learning project to deepen knowledge of React components and to learn Tailwind CSS
                        </li>
                        <li>
                            Utilized Next.js's Link and Navigation functionality for dynamic header updates
                        </li>
                    </ul>
                </div>

                <div className="max-w-3xl col-span-5 mt-3" style={{fontSize: '18px'}}><b className="text-start">Recipe Sharing Site</b> | <i>JavaScript, React, Python, Django, AWS, Nginx, Bootstrap</i></div>
                <div className="max-w-1xl col-span-1 mt-3" style={{fontSize: '18px'}}><p className="text-end">July 2024 &ndash; Aug 2024</p></div>
                <div className="col-span-6 text-end" style={{fontSize: '18px'}}>
                    <a className="text-end" href="https://github.com/nathandavis18/Recipe-Sharing-Site" target="_blank" style={{color: '#ededed', textDecorationLine: 'none'}}>github.com/nathandavis18/Recipe-Sharing-Site</a>
                </div>
                <div className="max-w-4xl col-span-6 ml-6 mb-5" style={{fontSize: '18px'}}>
                    <ul>
                        <li>
                            Developed a full-stack recipe sharing site to enhance web development skills
                        </li>
                        <li>
                            Implemented React and JavaScript/JSX for the frontend and Django for the backend with AWS hosting
                        </li>
                        <li>
                            Configured a Nginx proxy server to facilitate secure communication between frontend and backend server
                        </li>
                        <li>
                            Leveraged several AWS services (EC2, S3, CloudFront CDN, and VPCs) for optimized hosting and reduced latency
                        </li>
                    </ul>
                </div>
                <hr className="col-span-6 border-zinc-500 mb-3" />

                <div className="max-w-4xl col-span-6">
                    <h2 id="experience" style={{fontSize: '30px'}}>Experience</h2>
                </div>
                <div className="max-w-3xl col-span-5 mt-3" style={{fontSize: '18px'}}><b className="text-start">Personal Shopper</b> - Walmart | Layton, UT</div>
                <div className="max-w-1xl col-span-1 mt-3" style={{fontSize: '18px'}}><p className="text-end">Aug 2020 &ndash; Present</p></div>
                <div className="max-w-4xl col-span-6 ml-6 mb-5" style={{fontSize: '18px'}}>
                    <ul>
                        <li>
                            Optimized picking operations to increase efficiency by 10%, 
                            achieving a consistent 200 items/hour rate with 0 compromise on quality, boosting overall customer satisfaction
                        </li>
                        <li>
                            Demonstrated consistent attention to detail and time management in a fast-paced environment
                        </li>
                        <li>
                            Trained and mentored 10+ new hires, streamlining onboarding processes and enhancing team productivity
                        </li>
                    </ul>
                </div>

                <hr className="col-span-6 border-zinc-500 mb-3" />

                <div className="max-w-4xl col-span-6">
                    <h2 id="about-me" style={{fontSize: '30px'}}>About Me</h2>
                </div>
                <div className="max-w-4xl col-span-6 mt-3" style={{fontSize: '18px'}}>
                    I was originally interested in programming because I wanted to learn how games were made and wanted to make my own. 
                    I chose to enroll at Weber State University due to all the positive things I had heard about it, and I can say that I made a good choice.
                    During my time in Weber's computer science degree, I started to enjoy the software engineering side of programming more and more. <br /> <br />
                    
                    Outside of my time at Weber and work, I enjoy spending my time working on individual projects, spending time with my family, and playing some of my favorite games.
                    I also frequently do independent research to further hone my programming skills. I am a motivated self-learner, and pride myself in being the best that I can.
                </div>
            </div>
        </div>
    );
}