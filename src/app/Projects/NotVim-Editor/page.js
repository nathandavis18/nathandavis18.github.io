export const metadata = {
    title: "NotVim-Editor - A 0 dependencies Text Editor",
    description: "A Cross-Platform, 0-dependencies, terminal based text editor written in C++",
    author: "Nathan Davis"
}
export default function NotVimEditor(){
    return(
        <div className="place-items-center px-5">
            <div className="max-w-4xl text-center">
                <h1 className="text-5xl font-medium py-5">NotVim Editor</h1>
                <div className="col-span-6 text-center pb-5" style={{fontSize: '18px'}}>
                    <a className="text-center" href="https://github.com/nathandavis18/NotVim-Editor" target="_blank">https://github.com/nathandavis18/NotVim-Editor</a>
                </div>
            </div>
            <div className="max-w-5xl text-start">
                <video width="1080" height="720" controls autoPlay muted>
                    <source src="/NotVim-Editor/NotVim_Demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag
                </video>
                <br />
                <p className="text-xl">
                    NotVim Editor is a WIP, custom, 0 dependencies, cross-platform, console-based text editor, currently tested to work on Windows and Linux.<br/><br/>
                    All standard features of a text-editor, with the exception of find/replace, have been implemented and should be bug-free. If you would like to test this project, 
                    feel free to clone/download the source code from the repository linked above. Check the releases tab for the most recent stable release!<br/><br/>
                    Currently, you will need a C++20 compliant compiler. Most popular compilers are MSVC with Visual Studio, GCC-13+, Clang-14/17, aand AppleClang-15.
                    A <a href="https://cmake.org/" target="_blank">CMake</a> script is provided for ease of building, or you can choose to manually build the project.
                    If using the provided CMake script, first download the source code. Then, in your terminal (command prompt, powershell, linux terminal, etc), run the following commands: <br />
                </p>
                <br />
                <p className="bg-gray-900 ml-5 text-teal-300">
                    cmake -B [buildDir] (optional: -G [buildGenerator]) -S [pathToSourceCode] -DCMAKE_BUILD_TYPE=Release
                    <br /> <br />
                    cmake --build [buildDir] --config Release
                </p>
                <br />
                <p className="text-xl">
                    An example of this with the current release of v0.4.1a would be
                </p>
                <br />
                <p className="bg-gray-900 ml-5 text-teal-300">
                    cmake -B ./NotVim/out -S ./NotVim-Editor-0.4.1a -DCMAKE_BUILD_TYPE=Release
                    <br /> <br />
                    cmake --build ./NotVim --config Release
                </p>
                <br />
                <p className="text-xl">
                    This will build the program into a folder 'NotVim'. In here, depending on the build generator, there may be
                    a sub folder called 'Release' (or something similar). In there, you will find 'nve.exe', the actual program. Any other files
                    can be disregarded. If you don't see the program, check if there is a 'bin' folder. 
                </p>
                <h2 className="text-2xl font-medium text-center py-5">Guide</h2>
                <video width="1080" height="720" controls muted>
                    <source src="/NotVim-Editor/BuildProject_Demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag
                </video>
                <br /> <br />
                <hr className="border-zinc-500 mb-3"/>
                <h2 className="text-3xl font-medium text-center py-5">Controls/Features</h2>
                <div className="text-xl">
                    <p>
                        MOVEMENT FUNCTIONALITY:
                    </p>
                    <div className="ml-5">
                        <ul>
                            <li>
                                ArrowKey Left/Right: Moves the cursor 1 character left/right through the file
                            </li>
                            <li>
                                ArrowKey Up/Down: Moves the cursor 1 row up/down within the file, remembering previous column position
                            </li>
                            <li>
                                Control-ArrowKey Left/Right: Moves the cursor to the start/end of the previous/next word
                            </li>
                            <li>
                                Control-ArrowKey Up/Down: Shifts the row offset up/down by one, moving the cursor if needed
                            </li>
                            <li>
                                Home/End: Move cursor to start/end of current row
                            </li>
                            <li>
                                Control-Home/End: Move cursor to start/end of file
                            </li>
                            <li>
                                Page Up/Down: Shift row offset by 1 screen's worth. If 30 rows fit on screen, move the row offset by 30 rows
                            </li>
                            <li>
                                Control-Page Up/Down: Move cursor to start/end of current screen view
                            </li>
                        </ul>
                    </div>
                    <br />
                    <p>
                        READ MODE OPTIONS:
                    </p>
                    <div className="ml-5">
                        <ul>
                            <li>
                                i - Enables Edit Mode
                            </li>
                            <li>
                                : - Enables Command Mode
                            </li>
                        </ul>
                    </div>
                    <br />
                    <p>
                        COMMAND MODE OPTIONS:
                    </p>
                    <div className="ml-5">
                        <ul>
                            <li>
                                q - Quits the program. File must be saved for this command to work
                            </li>
                            <li>
                                q! - Force Quits the program. Exits without saving if changes have been made
                            </li>
                            <li>
                                w/s - Write/Save changes
                            </li>
                            <li>
                                wq/sq - Write and Quit / Save and Quit
                            </li>
                        </ul>
                    </div>
                    <br />
                    <p>
                        EDIT MODE OPTIONS:
                    </p>
                    <div className="ml-5">
                        <ul>
                            <li>
                                Letter/Number/Symbol (standard character) - Inserts character at current position and move cursor forward 1 position
                            </li>
                            <li>
                                Tab - Inserts tab character, offsets the cursor to the nearest column which is a multiple of 8
                            </li>
                            <li>
                                Enter/Return - Inserts a new row, moving any contents beyond the cursor onto the new row
                            </li>
                            <li>
                                Backspace/Delete - Deletes character behind/in front of cursor. Moves cursor backwards if using backspace
                            </li>
                            <li>
                                Control-Backspace/Delete - Deletes word behind/in front of cursor. Moves cursor backwards if using backspace
                            </li>
                            <li>
                                Control-Z - Undo most recent change
                            </li>
                            <li>
                                Control-Y - Redo most recent undo
                            </li>
                        </ul>
                    </div>
                    <br />
                    <p>
                        Currently, syntax highlighting is only available for C++ files. Other files will be treated as regular text files. 
                    </p>
                </div>
                <br /><br /><br />
            </div>

        </div>
    );
}