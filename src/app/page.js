import Link from 'next/link';

export default function Home() {
  const myHeight = "500px";
  return (
    <div className="place-items-center px-5">      
      <div className="text-center flex-none">
        <h1 className="text-6xl py-5 bg-gradient-to-r from-red-500 via-red-300 to-white text-transparent bg-clip-text font-medium">Nathan Davis</h1>
      </div>
      <div className="block lg:flex border-t border-zinc-500">
        <div className="max-w-xl mx-auto justify-center pt-5">
          <p className="text-xl text-center lg:text-start">
            Hey! I am Nathan Davis, a Computer Science graduate from Weber State University with a passion for learning and solving problems! I currently live in Weber County in northern Utah.<br /><br />
            
            In my free time I like to work on individual projects, do independent research, spend time with my family, and play some of my favorite video games (currently Terraria).<br /><br />

            I have built an appointment scheduling system for Weber State University to use freely and openly for educational and non-commercial purposes. 
            You can view that project <a href="https://github.com/nathandavis18/Steamboat-Willie" target="_blank">here</a>. 
            You can also find more information about my other projects <Link href="/Projects/Project-List">here</Link>.
            <br /> <br />
            My Socials: <a href="https://linkedin.com/in/nathandavis18" target='_blank'>LinkedIn</a> | <a href="https://github.com/nathandavis18" target='_blank'>GitHub</a>
          </p>
        </div>
        <div className="place-items-center lg:place-items-end lg:ml-20 pt-5">
          <img src="me.jpg" className="w-96"
          style={{
            border: '1px solid', boxShadow: '5px 5px 5px gray', display: 'block'
          }}/>
        </div>
        <br /> <br />
      </div>
    </div>
  );
}
