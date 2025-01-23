export const metadata = {
  title: "Nathan Davis - Projects",
  description: "A list of all of the projects I've worked on, both educational and individual projects. Click to see more!",
  author: "Nathan Davis"
}
export default function Projects(){
    return(
        <div className="place-items-center">
            <div class="grid grid-cols-6 justify-center">
                <div className="max-w-4xl text-center col-span-6">
                    <h1 className="text-5xl font-medium py-5">My Projects</h1>
                    <hr className="border-zinc-500"/>
                </div>
                <div className="max-w-4xl col-span-6">
                    <blockquote className="my-8">
                        <b>Go to: </b> <a href="#appointment-scheduler">Appointment Scheduling System</a> | <a href="#textEditor">Text Editor</a> | <a href="#music-player">Music Player</a> | <a href="#multiplayer-tetris">Multiplayer Tetris</a> | <a href="#dsa">Data Structures and Algorithms</a>
                    </blockquote>
                    <hr className="border-zinc-500 mb-3" />
                </div>

                <div className="max-w-4xl col-span-6" style={{fontSize: '18px'}}>
                    <a href="https://www.github.com/nathandavis18/Steamboat-Willie" title="Appointment Scheduler Repository" 
                        target="_blank"><h2 id="appointment-scheduler" style={{fontSize: '30px'}}>Appointment Scheduling System</h2></a>

                    <p className="ml-5 mr-2 mb-3 mt-1">
                        A standalone website, built using C# and the .NET Core 7.0 Framework, that allows students to schedule available appointments with their instructors, advisors, and tutors.
                        This project was designed to be a <a href="https://simplybook.me/en/" target="_blank" title="alternative">SimplyBook.me</a> alternative, specifically tailored for 
                        Weber State University students and faculty.
                    </p>
                    <p className="ml-5 mr-2 mb-3">
                        With this appointment scheduler, students are able to register for an account manually, or alternatively through Google and Microsoft external authentication. 
                        If they want, users are able to integrate their Steamboat Willie account with their Google Calendar, automatically adding and removing appointments to and from their Google Calendar.
                    </p>
                    <p className="ml-5 mr-2 mb-5">
                        A full list of features can be found at the GitHub Repository by clicking on the link above.
                    </p>
                    <hr className="border-zinc-500 mb-3" />
                </div>
                <div className="max-w-4xl col-span-6" style={{fontSize: '18px'}}>
                    <a href="https://www.github.com/nathandavis18/NotVim-Editor" title="Text Editor"
                        target="_blank"><h2 id="textEditor" style={{fontSize: '30px'}}>Text Editor</h2></a>

                    <p className="ml-5 mr-2 mb-3 mt-1">
                        A 0-dependencies (not even curses/ncurses) console-based text editor, similar to Vim. This project is built using C++, and is designed to be cross-platform, as well as 
                        beginner-friendly for any contributors.
                    </p>
                    <p className="ml-5 mr-2 mb-5">
                        I set out to make this project to allow beginner-intermediate programmers get some experience developing cross-platform, open-source projects. I am working on making this project 
                        easy enough to read so that as long as you have an understanding of programming, as well as an understanding of C++ and the basics of the C++ STL, you can contribute to this project.
                    </p>
                    <hr className="border-zinc-500 mb-3" />
                </div>
                <div className="max-w-4xl col-span-6" style={{fontSize: '18px'}}>
                    <a href="https://www.github.com/nathandavis18/Nutty-Music" title="Music Player"
                        target="_blank"><h2 id="music-player" style={{fontSize: '30px'}}>Music Player</h2></a>

                    <p className="ml-5 mr-2 mb-3 mt-1">
                        A C++ application, built using wxWidgets for the GUI, which allows users to play locally downloaded songs, or search for and download songs from youtube to play them. 
                        CMake is required to build this application.
                    </p>
                    <p className="ml-5 mr-2 mb-5">
                        This is a GUI build surrounding <a href="https://github.com/yt-dlp/yt-dlp" target="_blank" title="Yt-dlp GitHub page">yt-dlp</a> and 
                        <a href="https://ffmpeg.org/" target="_blank" title="FFmpeg webpage">ffmpeg</a>, 
                        which allows users to download their favorite youtube songs, as well as the unofficial <a href="https://github.com/sigma67/ytmusicapi" target="_blank" title="YTMusic API GitHub">YTMusic API</a> to search for your favorite 
                        songs on YouTube.
                    </p>
                    <hr className="border-zinc-500 mb-3" />
                </div>
                <div className="max-w-4xl col-span-6" style={{fontSize: '18px'}}>
                    <a href="https://www.github.com/nathandavis18/Co-op-Tetris" title="Multiplayer Tetris"
                        target="_blank"><h2 id="multiplayer-tetris" style={{fontSize: '30px'}}>Multiplayer Tetris</h2></a>

                    <p className="ml-5 mr-2 mb-3 mt-1">
                        This is a co-op/multiplayer version of Tetris built using C++ and SFML. This allows up to 4 players at once. 
                        Players must work together to survive, as the board fills up fast.
                    </p>
                    <p className="ml-5 mr-2 mb-3">
                        The board scales depending on the number of players. One player is normal board, two players is slightly bigger, etc. At 4 players, the board is double the size of a standard tetris board. 
                        If you would like to try it out, feel free to clone the repository linked above. CMake 3.16 is required to build. Currently, the main menu is a blank 
                        black screen. Just click 1, 2, 3, or 4 on your keyboard to choose the number of players and the game will start! 
                    </p>
                    <p className="ml-5 mr-2 mb-5">
                        Controls for each player is listed in the Readme file on the repository. 
                        Currently there is no way to change controls, but that is a feature I am currently working on along with the Main Menu GUI. 
                        If you would like to restart the game with the same number of players, just press F5! 
                    </p>
                    <hr className="border-zinc-500 mb-3" />
                </div>
                <div className="max-w-4xl col-span-6" style={{fontSize: '18px'}}>
                    <a href="https://www.github.com/nathandavis18/Projects" title="Data Structures and Algorithms"
                        target="_blank"><h2 id="dsa" style={{fontSize: '30px'}}>Data Structures and Algorithms</h2></a>

                    <p className="ml-5 mr-2 mb-5 mt-1">
                        These are some custom implementations of some Data Structures and Algorithms using C++. Currently, I have built a custom, templated vector {'class'}, iterator and reverse iterator classes, 
                        an introsort (introspective sort) algorithm, and a merging algorithm, which merges two sorted vectors/arrays/containers into one single vector/array/container.
                    </p>

                    <hr className="border-zinc-500 mb-3" />
                    <a className="ml-5 mr-2 mb-3" href="https://github.com/nathandavis18/Projects/blob/main/Data%20Structures/myVector.hpp" target="_blank" title="Custom Vector Class" style={{fontSize: '24px'}}>Vector Class</a>
                    <p className="ml-10 mr-5 mb-3 mt-1">
                        This custom vector {'class'} performs similarly to the STL version of std::vector. This is a fully templated implementation, allowing for both standard and custom types. 
                        Because this is a vector, and not an array, the contents of the vector are stored on the heap, with data being allocated using std::allocator_traits. 
                    </p>
                    <p className="ml-10 mr-5 mb-5">
                        Bonus features that are in custom::myVector include push_front() and pop_front(), which essentially acts the same as doing 
                        std::vector::insert(std::vector::begin(), value) and std::vector::erase(std::vector::begin()) respectively.
                    </p>
                    <hr className="border-zinc-500 mb-3" />

                    <a className="ml-5 mr-2 mb-3" href="https://github.com/nathandavis18/Projects/blob/main/Data%20Structures/myIterator.hpp" target="_blank" title="Custom Iterator Class" style={{fontSize: '24px'}}>Iterator Classes</a>
                    <p className="ml-10 mr-5 mb-3 mt-1">
                        These are custom forward and reverse random-access compliant iterators. They are fully templated, allowing the use of these iterators for both standard and custom types.
                    </p>
                    <p className="ml-10 mr-5 mb-3">
                        Iterators, in a nutshell, are incremental pointers. You can use the dereference operator * to access the value pointed to by the iterator and 
                        the pointer operator to set a value/call a function from the iterator. Additionally, you can do ++it / --it to increment/decrement the iterator, rather than doing ptr + i or ptr - i.
                    </p>
                    <p className="ml-10 mr-5 mb-3">
                        Iterators are useful when iterating over objects in a container, such as a list, when calculating the size of the container may be an expensive operation.
                    </p>
                    <p className="ml-10 mr-5 mb-5">
                        Link to the reverse iterator can be found <a href="https://github.com/nathandavis18/Projects/blob/main/Data%20Structures/myReverseIterator.hpp" target="_blank" title="Reverse Iterator Code">here</a>.
                    </p>
                    <hr className="border-zinc-500 mb-3" />

                    <a className="ml-5 mr-2 mb-3" href="https://github.com/nathandavis18/Projects/blob/main/Algorithms/sort.hpp" target="_blank" title="Introsort Algorithm Implementation" style={{fontSize: '24px'}}>Introsort Algorithm</a>
                    <p className="ml-10 mr-5 mb-3 mt-1">
                        This is my custom implementation of the introsort algorithm. This algorithm is designed to allow sorting of any type, given that type has a comparison operator. This includes custom types with custom defined comparison operators.
                        Introsort, otherwise known as introspective sort, is a hybrid comparitive sorting algorithm that provides optimal worst-case performance, 
                        with a Time Complexity of O(n log n), and a Space Complexity of O(log n). The 3 parts to introsort are Quicksort, Heapsort, and Insertion Sort.
                    </p>
                    <p className="ml-10 mr-5 mb-3">
                        Quicksort is implemented as the base of the introsort algorithm, sorting partitions around a pivot. I decided to use a median-of-3 selection algorithm to determine the pivot. 
                        The median-of-3 selection algorithm takes the first, middle, and last elements of a given partition and moves it to the first position in the container. 
                        This approach has better performance on average than just using the first or last element as the pivot.
                    </p>
                    <p className="ml-10 mr-5 mb-3">
                        After a specific max recursion depth is hit, which is determined by calculating the log2(container_size) * 2, heapsort is ran instead of quicksort. 
                        Heapsort essentially constructs a binary tree in-place, requiring O(1) space. Unlike normal balanced binary trees, where right &gt; parent &gt; left, in the heapsort implementation parent &gt; right and parent &gt; left.
                        This places the largest element at the root of the tree. Once the tree is constructed, you can traverse up the tree, removing nodes as they are put into their sorted place.
                    </p>
                    <p className="ml-10 mr-5 mb-5">
                        When heapsort is finished, insertion sort makes all of the final touches as needed. Although insertion sort has a worst-case performance of O(n^2) time complexity, 
                        its performance on smaller partitions, as well as arrays that are mostly sorted, is better than most sorting algorithms.
                    </p>
                    <hr className="border-zinc-500 mb-3" />

                    <a className="ml-5 mr-2 mb-3" href="https://github.com/nathandavis18/Projects/blob/main/Algorithms/merge.hpp" target="_blank" title="Merge Algorithm" style={{fontSize: '24px'}}>Merge Algorithm</a>
                    <p className="ml-10 mr-5 mb-3 mt-1">
                        This custom implementation of a merging algorithm allows you to merge two sorted containers into a single container. This algorithm does not ensure that both containers are sorted, 
                        so attempting to use this algorithm with one or more unsorted arrays will result in undefined behavior.
                    </p>
                    <p className="ml-10 mr-5 mb-3">
                        This algorithm implements the two-pointer method. A pointer is set to the first object of each container. If the value of the 2nd container is less than the value of the 1st container, the 2nd value comes first. 
                        Otherwise, the 1st value comes first. Then, whichever pointer had the smaller value moves forward. This continues until one container has finished moving all its elements, after which the remaining elements of the other 
                        container are copied over directly.
                    </p>
                    <p className="ml-10 mr-5 mb-3">
                    This algorithm has a time complexity of O(n + m), where n and m are the lengths of the two containers. It has a space complexity of O(n + m) as well, since unless n or m equals 0, additional space is required.
                    </p>
                </div>
            </div>
        </div>
    );
}