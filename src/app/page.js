import Link from 'next/link';

export default function Home() {
  return (
    <div className="place-items-center">      
      <div className="grid grid-cols-2 justify-center">
        <div className="text-center col-span-2 pb-8">
          <h1 className="text-6xl py-5">Nathan Davis</h1>
          <hr className="border-zinc-500"/>
        </div>
        <div className="max-w-xl col-span-1 mx-auto justify-center mr-20">
          <p className="text-xl">
            Hey! I am Nathan Davis, a Computer Science graduate from Weber State University with a passion for learning and solving problems! I currently live in Weber County in northern Utah.<br /><br />
            
            In my free time I like to work on individual projects, do independent research, spend time with my family, and play some of my favorite video games (currently Terraria).<br /><br />

            I have built an appointment scheduling system for Weber State University to use freely and openly for educational and non-commercial purposes. 
            You can view that project <a href="https://github.com/nathandavis18/Steamboat-Willie" target="_blank">here</a>. 
            You can also find more information about my other projects <Link href="/Projects">here</Link>.
          </p>
        </div>
        <div className="col-span-1 place-items-end mx-full">
          <img src="me.jpg" 
          style={{
            height: '500px', border: '1px solid', boxShadow: '5px 5px 5px gray'
          }}/>
        </div>
      </div>
    </div>
  );
}
