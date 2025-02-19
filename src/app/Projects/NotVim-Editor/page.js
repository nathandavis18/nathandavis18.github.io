import {FunctionText, CommentText, UserVariableType, MacroType, VariableType}  from "./CodeHighlight";

export const metadata = {
    title: "NotVim-Editor - A 0 dependencies Text Editor",
    description: "A Cross-Platform, 0-dependencies, terminal based text editor written in C++",
    author: "Nathan Davis"
}
export default function NotVimEditor(){
    return(
        <div className="place-items-center px-5">
            <div className="max-w-4xl text-center">
                <h1 className="text-5xl font-semibold py-5">NotVim Editor</h1>
                <div className="col-span-6 text-center pb-5" style={{fontSize: '18px'}}>
                    <a className="text-center" href="https://github.com/nathandavis18/NotVim-Editor" target="_blank">https://github.com/nathandavis18/NotVim-Editor</a>
                    <p className="text-sm mt-3">(This page is still a WIP, check back later for more progess on my blog about building my own text editor!)</p>
                </div>
            </div>
            <hr className="border-slate-500 w-full max-w-5xl"/>
            <div className="max-w-5xl text-start mt-5">
                <h2 className="text-3xl font-semibold text-center mb-3">Building my own Text Editor</h2>
                <p className="text-xl">
                    If you would like to read about the process of me building my own text editor, including the struggles I had to overcome, keep reading!
                    This blog will walk you through the key steps/parts of the Windows version of my editor, and how I put it all together!
                </p>
                <hr className="border-slate-500 my-5"/>
                <h2 className="text-2xl font-semibold text-center mb-3">Entering Raw Mode in the Terminal</h2>
                <p className="text-xl">
                    To make a terminal-based text editor, you need a way for the terminal to accept input without the need for pressing the Enter/Return key.
                    To solve this issue, we put our terminal into what is known as 'Raw Mode'. <br /> <br />

                    Putting the terminal in raw mode is OS-specific, as you must interface directly with your OS API. Since this is a cross-platform project,
                    I had to interface with both the Win32 API and some Unix APIs. <br /> <br />

                    To set the terminal in raw mode on Windows, we first create a variable that grabs the current/default terminal mode. We can do this using
                    Win32's <code className="text-[17px]"><FunctionText>GetConsoleMode</FunctionText></code> function. An example of how to do this would be<br /> <br />
                </p>
                <div className="border border-slate-600 py-3 pl-1">
                    <code>
                        #include {"<Windows.h>"} <br />
                        <UserVariableType>DWORD</UserVariableType> defaultMode;<CommentText> //DWORD is just a typedef of unsigned long </CommentText> <br />
                        <FunctionText>GetConsoleMode</FunctionText>(<FunctionText>GetStdHandle</FunctionText>(<MacroType>STD_INPUT_HANDLE</MacroType>), &defaultMode);
                    </code>
                </div>
                <p className="text-xl mt-5 mb-3">
                    With the default mode captured, we are ready to enable raw mode. To do this, we need a new variable to store all the new raw mode flags,
                    and then call another function from the Win32 API.
                </p>
                <div className="border border-slate-600 py-3 pl-1">
                    <code>
                        <UserVariableType>DWORD</UserVariableType> rawMode = <MacroType>ENABLE_EXTENDED_FLAGS</MacroType> | {'('}defaultMode & ~<MacroType>ENABLE_LINE_INPUT</MacroType> & ~<MacroType>ENABLE_PROCESSED_INPUT</MacroType>);<br />
                        &emsp; & ~<MacroType>ENABLE_ECHO_INPUT</MacroType> & ~<MacroType>ENABLE_PROCESSED_OUTPUT</MacroType> & ~<MacroType>ENABLE_WRAP_AT_EOL_OUTPUT</MacroType>{')'}; <br />
                        <FunctionText>SetConsoleMode</FunctionText>(<FunctionText>GetStdHandle</FunctionText>(<MacroType>STD_INPUT_HANDLE</MacroType>), rawMode);
                    </code>
                </div>
                <p className="text-xl mt-5 mb-3">
                    So, what does any of this mean? Let's start from the beginning. First, we are retrieving the default terminal settings from Windows using <code className="text-[17px]"><FunctionText>GetConsoleMode</FunctionText></code> 
                    &nbsp;and storing it into <code className="text-[17px]">defaultMode</code>.
                    These settings control how text is displayed and entered into the terminal. <br /> <br />
                    
                    Next, using the default mode as a base, we set up a variable to set our own terminal settings. We do this by enabling extended flags, which allows us to enable/disable certain flags.
                    Then, we disable certain flags that control how input is processed by the terminal. We don't want the terminal to process any of the input, since we need to control exactly what each input does.
                    <br /><br />
                    The Windows API contains macros for each of these flags (highlighted in purple). By disabling each of these flags, we are essentially telling the terminal to send every character to us, without processing it.
                    <br /><br />
                    We can wrap this all into functions to allow us to easily enable/disable raw input mode, like so:
                </p>
                <div className="border border-slate-600 py-3 pl-1">
                    <code>
                        #include {"<Windows.h>"} <br />
                        <UserVariableType>DWORD</UserVariableType> defaultMode;<CommentText> //DWORD is just a typedef of unsigned long </CommentText> <br />
                        <FunctionText>GetConsoleMode</FunctionText>(<FunctionText>GetStdHandle</FunctionText>(<MacroType>STD_INPUT_HANDLE</MacroType>), &defaultMode); <br /> <br />
                        <VariableType>void</VariableType> <FunctionText>enableRawInputMode</FunctionText>(){'{'}<br />
                        &emsp;&emsp;<UserVariableType>DWORD</UserVariableType> rawMode = <MacroType>ENABLE_EXTENDED_FLAGS</MacroType> | {'('}defaultMode & ~<MacroType>ENABLE_LINE_INPUT</MacroType> & ~<MacroType>ENABLE_PROCESSED_INPUT</MacroType>{')'};<br />
                        &emsp;&emsp;&emsp; & ~<MacroType>ENABLE_ECHO_INPUT</MacroType> & ~<MacroType>ENABLE_PROCESSED_OUTPUT</MacroType> & ~<MacroType>ENABLE_WRAP_AT_EOL_OUTPUT</MacroType>{')'}; <br />
                        &emsp;&emsp;<FunctionText>SetConsoleMode</FunctionText>(<FunctionText>GetStdHandle</FunctionText>(<MacroType>STD_INPUT_HANDLE</MacroType>), rawMode);<br />
                        {'}'}<br /><br />
                        <VariableType>void</VariableType> <FunctionText>disableRawInputMode</FunctionText>(){'{'}<br />
                        &emsp;&emsp;<FunctionText>SetConsoleMode</FunctionText>{'('}<FunctionText>GetStdHandle</FunctionText>{'('}<MacroType>STD_INPUT_HANDLE</MacroType>{')'}, defaultMode{')'}; <br />
                        {'}'}
                    </code>
                </div>
                <p className="text-xl mt-5 mb-5">
                    With these functions set up, any time we need to enable or disable raw mode, its as easy as calling the function. 
                </p>
                <hr className="border-slate-500 mb-5"/>
                <h2 className="text-2xl font-semibold text-center mb-3">Getting Terminal Size</h2>
                <p className="text-xl mt-5 mb-3">
                    Next up on the list is to get the terminal size. This is the total size of displayable area within the terminal. This information is important so we know
                    how many rows of data can be displayed at a time, as well as how many characters can be displayed left-right without the lines wrapping. <br /> <br />

                    We can achieve this pretty simply with the Win32 API, setting it up in a function like:
                </p>
                <div className="border border-slate-600 py-3 pl-1">
                    <code>
                        <VariableType>int</VariableType> rows, cols; <br />
                        <VariableType>void</VariableType> <FunctionText>getWindowSize</FunctionText>(){'{'}<br />
                        &emsp;&emsp;<UserVariableType>CONSOLE_SCREEN_BUFFER_INFO</UserVariableType> screenInfo; <br />
                        &emsp;&emsp;<FunctionText>GetConsoleScreenBufferInfo</FunctionText>{'('}<FunctionText>GetStdHandle</FunctionText>{'('}<MacroType>STD_OUTPUT_HANDLE</MacroType>{')'}, &screenInfo{'))'};
                        <br />
                        &emsp;&emsp;rows = screenInfo.srWindow.Bottom - screenInfo.srWindow.Top + 1; <br />
                        &emsp;&emsp;cols = screenInfo.srWindow.Right - screenInfo.srWindow.Left + 1;
                        <br />{'}'}
                    </code>
                </div>
                <p className="text-xl mt-5">
                    We now have access to the total number of displayable rows and columns. Make sure the rows and columns are stored somewhere accessible to the part of your program
                    responsible for displaying the file to the user, as you will need them to know how much information you can display. <br /><br />

                    That's all we need from the Win32 API for displaying and getting input from the user without them needing to press Enter/Return. Next up is
                    controlling what the input does.
                </p>
                <hr className="border-slate-500 my-5"/>
                <h2 className="text-2xl font-semibold text-center mb-3">Handling Input</h2>
                <p className="text-xl mb-3">
                    The Win32 API provides a very handy function, <code className="text-[17px]"><FunctionText>_getch</FunctionText></code>, which helps parse the input from the user quickly.
                    This function returns an int, which represents a character code. Knowing this, we can do the following:
                </p>
                <div className="border border-slate-600 py-3 pl-1">
                    <code>
                        #include {"<conio.h>"}; <br />
                        <VariableType>int</VariableType> input = <FunctionText>_getch</FunctionText>();
                    </code>
                </div>
                <p className="text-xl mb-3 mt-5">
                    Without providing any extra functionality other than allowing the user to insert characters, we are basically done.
                    There will be some weird things that happen if the user presses a key that isn't just a standard character (letter or number), but it works!
                    <br /><br />
                    However, let's take it one step further and prevent these weird bugs. There are 2 special return codes from 
                    &nbsp;<code className="text-[17px]"><FunctionText>_getch</FunctionText></code> that we need to focus on: 0 and 224.
                    <br/><br />
                    0 denotes the use of a function key (F1, F2, F3, etc.), while 224 denotes the use of an action key (arrow keys, home, end, delete, page up/down, and their Ctrl variants).
                    <br /><br />
                    To fix this, we can read that input and either ignore it or process it farther to get the specific key pressed. Putting this all into a function, we get something like:
                </p>
                <div className="border border-slate-600 py-3 pl-1">
                    <code>
                        #include {"<conio.h>"}; <br />
                        <VariableType>const int</VariableType> functionKeyCode = 0; <br />
                        <VariableType>const int</VariableType> actionKeyCode = 224; <br />
                        <VariableType>int</VariableType> <FunctionText>handleInput</FunctionText>(){'{'}<br />
                        &emsp;&emsp;<VariableType>int</VariableType> input = <FunctionText>_getch</FunctionText>(); <br />
                        &emsp;&emsp;if(input == functionKeyCode){'{'}<br />
                        &emsp;&emsp;&emsp;&emsp;<VariableType>int</VariableType> _ = <FunctionText>_getch</FunctionText>(); <CommentText>//Ignore this input</CommentText> <br />
                        &emsp;&emsp;{'}'} <br />
                        &emsp;&emsp;else if(input == actionKeyCode){'{'}<br />
                        &emsp;&emsp;&emsp;&emsp;input = <FunctionText>_getch</FunctionText>(); <CommentText>//Get the specific action key pressed</CommentText> <br />
                        &emsp;&emsp;&emsp;&emsp;<CommentText>//How you handle the action keys goes here</CommentText><br />
                        &emsp;&emsp;&emsp;&emsp;return input; <br />
                        &emsp;&emsp;{'}'} <br />
                        &emsp;&emsp;return input; <br />
                        {'}'}
                    </code>
                </div>
                <p className="text-xl mb-3 mt-5">
                    For the action keys to work properly, you must do something different with how they act. In my case, I chose to use an enum of action types, and
                    depending on what keycode was returned after the action keycode, I returned a specific action type. 
                </p>
            </div>

        </div>
    );
}