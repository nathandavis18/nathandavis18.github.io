export const metadata = {
    title: "Nathan Davis - Resume/CV",
    description: "This is a copy of my Resume/CV",
    author: "Nathan Davis"
}

export default function Resume(){
    return(
        <div className="place-items-center px-5">
            <div className="grid grid-cols-6 justify-center w-full max-w-4xl">
                <div className="text-center col-span-6">
                    <h1 className="text-5xl font-medium py-5">Resume/CV</h1>
                    <hr className="border-zinc-500"/>
                </div>

                <div className="col-span-6">
                    <blockquote className="my-8">
                        <b>Go to: </b> <a href="#summary">Summary</a> | <a href="#education">Education</a> | <a href="#skills">Technical Skills</a> | <a href="#projects">Projects</a> | <a href="#experience">Experience</a> | <a href="#about-me">About Me</a> | <a href="/Resume/nathan-davis-resume.pdf">PDF</a>
                    </blockquote>
                    <hr className="border-zinc-500 mb-3" />
                </div>

                <div className="col-span-6" style={{fontSize: '18px'}}>
                    <h2 id="summary" style={{fontSize: '30px'}}>Summary</h2>

                    <p className="mr-2 mb-3 mt-1">
                        I am a software engineer proficient in C#, JavaScript, HTML, CSS, and C++. I have some experience writing TypeScript, Java, Python, SQL, and C.
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
                    <hr className="col-span-6 border-zinc-500 mb-3" />
                </div>

                <div className="col-span-6">
                    <h2 id="education" style={{fontSize: '30px'}}>Education</h2>
                    <div className="flex w-full">
                        <div className="mt-3 w-1/4"><b className="text-start text-xl">Weber State University</b></div>
                        <div className="mt-3 w-3/4 place-items-end"><p className="text-end">2024</p></div>
                    </div>
                    <div className="mb-5" style={{fontSize: '18px'}}>
                        <i>Bachelor of Science in Computer Science, 3.77 GPA | cum laude</i>
                        <p className="mt-3">
                            <b>Relavent Courses: </b> Data Structures and Algorithms, Advanced Database Programming, Object-Oriented Programming </p>
                            <p>Web Development, Network Fundamentals</p>
                    </div>
                    <hr className="border-zinc-500 mb-3" />
                </div>

                <div className="col-span-6">
                    <h2 id="skills" style={{fontSize: '30px'}}>Technical Skills</h2>
                    <div className="ml-6 mb-5" style={{fontSize: '18px'}}>
                        <ul>
                            <li><b>Languages:</b> C#, JavaScript, TypeScript, Python, HTML, CSS, SQL, C++</li>
                            <li><b>Frameworks:</b> .NET, Tailwind, React, Next.js, Django, Playwright, Bootstrap</li>
                            <li><b>DevOps/Tools:</b> Git, Agile, CI/CD (GitHub Actions), Microsoft SQL Server, MySQL</li>
                        </ul>
                    </div>
                    <hr className="border-zinc-500 mb-3" />
                </div>

                <div className="col-span-6">
                    <h2 id="projects" style={{fontSize: '30px'}}>Technical Projects</h2>
                    <div className="flex w-full">
                        <div className="mt-3 w-3/4" style={{fontSize: '18px'}}><b className="text-start">CAPSTONE: Appointment Scheduling System</b> | <i>C#, .NET, JavaScript, SQL, Bootstrap, Git</i></div>
                        <div className="mt-3 place-items-end w-1/4" style={{fontSize: '18px'}}><p className="text-end">Feb 2024 &ndash; Apr 2024</p></div>
                    </div>
                        <div className="col-span-6 text-end" style={{fontSize: '18px'}}>
                            <a className="text-end" href="https://github.com/nathandavis18/Steamboat-Willie" target="_blank" style={{color: '#ededed', textDecorationLine: 'none'}}>github.com/nathandavis18/Steamboat-Willie</a>
                        </div>
                    <div className="ml-6 mb-3 mt-2" style={{fontSize: '18px'}}>
                        <ul>
                            <li>
                                Led the development of a SaaS platform enabling students to schedule appointments with advisors and instructors; 
                                adopted by Weber State University for educational and non-commercial purposes
                            </li>
                            <li>
                                Enhanced minimum viable product (MVP) functionality by incorporating user feedback, improving UI/UX and overall 
                                system usability based on real-world advisor and student feedback 
                            </li>
                            <li>
                                Designed and implemented an efficient filtering algorithm, reducing appointment search time and improving 
                                accessibility for students 
                            </li>
                            <li>
                                Integrated Google Calendar API, enabling automated appointment synchronization
                            </li>
                            <li>
                                Integrated OAuth2.0 authentication with Google and Microsoft login, enhancing security and providing seamless 
                                third-party authentication
                            </li>
                        </ul>
                    </div>

                    <div className="flex w-full">
                        <div className="mt-3 w-3/4" style={{fontSize: '18px'}}><b className="text-start">Terminal Based Text Editor</b> | <i>C++</i></div>
                        <div className="mt-3 w-1/4" style={{fontSize: '18px'}}><p className="text-end">July 2024 &ndash; Present</p></div>
                    </div>
                    <div className="text-end" style={{fontSize: '18px'}}>
                        <a className="text-end" href="https://nathandavis18.com/Projects/NotVim-Editor" target="_blank" style={{color: '#ededed', textDecorationLine: 'none'}}>nathandavis18.com/Projects/NotVim-Editor</a>
                    </div>
                    <div className="ml-6 mb-3 mt-2" style={{fontSize: '18px'}}>
                        <ul>
                            <li>
                                Engineered a high-performance, cross-platform text editor in C++ with zero dependencies, ensuring a lightweight, 
                                standalone application 
                            </li>
                            <li>
                                Designed and implemented low-level rendering algorithms to optimize speed for a smooth editing experience 
                            </li>
                            <li>
                                Integrated OS-specific APIs to handle keyboard inputs and text rendering for cross-platform compatibility
                            </li>
                            <li>
                                Designed and implemented a token-based syntax highlighting system to highlight keywords and comments 
                            </li>
                            <li>
                                mplemented CI/CD pipelines using GitHub Actions to automate build and release processes 
                            </li>
                        </ul>
                    </div>

                    <div className="flex w-full">
                        <div className="mt-3 w-3/4" style={{fontSize: '18px'}}><b className="text-start">Recipe Sharing Site</b> | <i>TypeScript, React/Next.js, TailwindCSS, Django, Python, Git</i></div>
                        <div className="mt-3 w-1/4" style={{fontSize: '18px'}}><p className="text-end">July 2024 &ndash; Present</p></div>
                    </div>
                    <div className="text-end" style={{fontSize: '18px'}}>
                        <a className="text-end" href="https://github.com/nathandavis18/Recipe-Sharing-Site" target="_blank" style={{color: '#ededed', textDecorationLine: 'none'}}>github.com/nathandavis18/Recipe-Sharing-Site</a>
                    </div>
                    <div className="ml-6 mb-3 mt-2" style={{fontSize: '18px'}}>
                        <ul>
                            <li>
                                Developed a full-stack recipe-sharing platform using TypeScript, React/Next.js, and Django, enabling users to create, 
                                store, and delete recipes 
                            </li>
                            <li>
                                Implemented a responsive UI/UX with TailwindCSS, ensuring seamless browsing across devices 
                            </li>
                            <li>
                                Designed and integrated a Django-based REST API, handling GET, POST, and DELETE functions 
                            </li>
                        </ul>
                    </div>

                    <div className="flex w-full">
                        <div className="mt-3 w-3/4" style={{fontSize: '18px'}}><b className="text-start">Data Structures and Algorithms</b> | <i>C++</i></div>
                        <div className="mt-3 w-1/4" style={{fontSize: '18px'}}><p className="text-end">Oct 2023 &ndash; June 2024</p></div>
                    </div>
                    <div className="text-end" style={{fontSize: '18px'}}>
                        <a className="text-end" href="https://github.com/nathandavis18/Projects" target="_blank" style={{color: '#ededed', textDecorationLine: 'none'}}>github.com/nathandavis18/Projects</a>
                    </div>
                    <div className="ml-6 mb-5 mt-2" style={{fontSize: '18px'}}>
                        <ul>
                            <li>
                                Designed and implemented custom data structures (iterators and vectors) in C++ to learn memory management 
                            </li>
                            <li>
                                Developed high-performing algorithms in C++ to learn algorithm implementation and design
                            </li>
                            <li>
                                Benchmarked algorithms against standard library equivalents, achieving equivalent speed and memory performance 
                            </li>
                        </ul>
                    </div>
                    <hr className="border-zinc-500 mb-3" />
                </div>


                <div className="col-span-6">
                    <h2 id="experience" style={{fontSize: '30px'}}>Experience</h2>
                    <div className="flex w-full">   
                        <div className="mt-3 w-3/4" style={{fontSize: '18px'}}><b className="text-start">Personal Shopper</b> - Walmart | Layton, UT</div>
                        <div className="mt-3 w-1/4" style={{fontSize: '18px'}}><p className="text-end">Aug 2020 &ndash; Present</p></div>
                    </div>
                    <div className="ml-6 mb-5" style={{fontSize: '18px'}}>
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
                    <hr className="border-zinc-500 mb-3" />
                </div>


                <div className="col-span-6">
                    <h2 id="about-me" style={{fontSize: '30px'}}>About Me</h2>
                    <div className="mt-3" style={{fontSize: '18px'}}>
                        I was originally interested in programming because I wanted to learn how games were made and wanted to make my own. 
                        I chose to enroll at Weber State University due to all the positive things I had heard about it, and I can say that I made a good choice.
                        During my time in Weber's computer science degree, I started to enjoy the software engineering side of programming more and more. <br /> <br />
                        
                        Outside of my time at Weber and work, I enjoy spending my time working on individual projects, spending time with my family, and playing some of my favorite games.
                        I also frequently do independent research to further hone my programming skills. I am a motivated self-learner, and pride myself in being the best that I can.
                    </div>
                </div>
                <br /> <br /> <br /> <br />
            </div>
        </div>
    );
}