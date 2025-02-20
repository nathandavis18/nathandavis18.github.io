import {FunctionText, CommentText, UserVariableType, MacroType, VariableType, ControlKeyword, VariableName}  from "./CodeHighlight";
import CodeBlock from './CodeBlocks';

export const metadata = {
    title: "NotVim-Editor - A 0 dependencies Text Editor",
    description: "A Cross-Platform, 0-dependencies, terminal based text editor written in C++",
    author: "Nathan Davis"
}
export default function NotVimEditor(){
    return(
        <div className="place-items-center px-3">
            <div className="max-w-4xl text-center">
                <h1 className="text-5xl font-semibold py-5">NotVim Editor</h1>
                <div className="col-span-6 text-center pb-5" style={{fontSize: '18px'}}>
                    <a className="text-center" href="https://github.com/nathandavis18/NotVim-Editor" target="_blank">https://github.com/nathandavis18/NotVim-Editor</a>
                    <p className="text-sm mt-3">{'('}This page is still a WIP, check back later for more progess on my blog about building my own text editor!{')'}</p>
                </div>
            </div>
            <hr className="border-slate-500 w-full max-w-4xl"/>
            <div className="max-w-full md:max-w-4xl text-start mt-5 px-5">
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
                <CodeBlock text="Get Default Mode Example">
                    #include {"<Windows.h>"} <br />
                    <UserVariableType>DWORD</UserVariableType> <VariableName>defaultMode</VariableName>;<CommentText> //DWORD is just a typedef of unsigned long </CommentText> <br />
                    <FunctionText>GetConsoleMode</FunctionText>{'('}<wbr /><FunctionText>GetStdHandle</FunctionText>{'('}<MacroType>STD_INPUT_HANDLE</MacroType>{')'}, &<VariableName>defaultMode</VariableName>{')'};
                </CodeBlock>
                <p className="text-xl mt-5 mb-3">
                    With the default mode captured, we are ready to enable raw mode. To do this, we need a new variable to store all the new raw mode flags,
                    and then call another function from the Win32 API.
                </p>
                <CodeBlock text="Enable Raw Mode Example">
                    <UserVariableType>DWORD</UserVariableType> <VariableName>rawMode</VariableName> = <MacroType>ENABLE_EXTENDED_FLAGS</MacroType> | {'('}<VariableName>defaultMode</VariableName> & ~<MacroType>ENABLE_LINE_INPUT</MacroType> & ~<MacroType>ENABLE_PROCESSED_INPUT</MacroType>{')'};<br />
                    &emsp; & ~<MacroType>ENABLE_ECHO_INPUT</MacroType> & ~<MacroType>ENABLE_PROCESSED_OUTPUT</MacroType> & ~<MacroType>ENABLE_WRAP_AT_EOL_OUTPUT</MacroType>{')'}; <br />
                    <FunctionText>SetConsoleMode</FunctionText>{'('}<wbr /><FunctionText>GetStdHandle</FunctionText>{'('}<MacroType>STD_INPUT_HANDLE</MacroType>{')'}, <VariableName>rawMode</VariableName>{')'};
                </CodeBlock>
                <p className="text-xl mt-5 mb-3">
                    So, what does any of this mean? Let's start from the beginning. First, we are retrieving the default terminal settings from Windows using <code className="text-[17px]"><FunctionText>GetConsoleMode</FunctionText></code> 
                    &nbsp;and storing it into <code className="text-[17px]"><VariableName>defaultMode</VariableName></code>.
                    These settings control how text is displayed and entered into the terminal. <br /> <br />
                    
                    Next, using the default mode as a base, we set up a variable to set our own terminal settings. We do this by enabling extended flags, which allows us to enable/disable certain flags.
                    Then, we disable certain flags that control how input is processed by the terminal. We don't want the terminal to process any of the input, since we need to control exactly what each input does.
                    <br /><br />
                    The Windows API contains macros for each of these flags {'('}highlighted in purple{')'}. By disabling each of these flags, we are essentially telling the terminal to send every character to us, without processing it.
                    <br /><br />
                    We can wrap this all into functions to allow us to easily enable/disable raw input mode, like so:
                </p>
                <CodeBlock text="Console.cpp" linkToFile="https://github.com/nathandavis18/NotVim-Editor/blob/fb343d3b9e572f8e3705fc9bbeb7fae303b7c1a2/src/Console/Console.cpp#L1070">
                    #include {"<Windows.h>"} <br />
                    <UserVariableType>DWORD</UserVariableType> <VariableName>defaultMode</VariableName>;<CommentText> //DWORD is just a typedef of unsigned long </CommentText> <br />
                    <FunctionText>GetConsoleMode</FunctionText>{'('}<FunctionText><wbr />GetStdHandle</FunctionText>{'('}<MacroType>STD_INPUT_HANDLE</MacroType>{')'}, &<VariableName>defaultMode</VariableName>{')'}; <br /> <br />
                    <VariableType>void</VariableType> <FunctionText>enableRawInputMode</FunctionText>{'()'}{'{'}<br />
                    &emsp;&emsp;<UserVariableType>DWORD</UserVariableType> <VariableName>rawMode</VariableName> = <MacroType>ENABLE_EXTENDED_FLAGS</MacroType> | {'('}<VariableName>defaultMode</VariableName> & ~<MacroType>ENABLE_LINE_INPUT</MacroType> & ~<MacroType>ENABLE_PROCESSED_INPUT</MacroType>{')'};<br />
                    &emsp;&emsp;&emsp; & ~<MacroType>ENABLE_ECHO_INPUT</MacroType> & ~<MacroType>ENABLE_PROCESSED_OUTPUT</MacroType> & ~<MacroType>ENABLE_WRAP_AT_EOL_OUTPUT</MacroType>{')'}; <br />
                    &emsp;&emsp;<FunctionText>SetConsoleMode</FunctionText>{'('}<wbr /><FunctionText>GetStdHandle</FunctionText>{'('}<MacroType>STD_INPUT_HANDLE</MacroType>{')'}, <VariableName>rawMode</VariableName>{')'};<br />
                    {'}'}<br /><br />
                    <VariableType>void</VariableType> <FunctionText>disableRawInputMode</FunctionText>{'()'}{'{'}<br />
                    &emsp;&emsp;<FunctionText>SetConsoleMode</FunctionText>{'('}<wbr /><FunctionText>GetStdHandle</FunctionText>{'('}<MacroType>STD_INPUT_HANDLE</MacroType>{')'}, <VariableName>defaultMode</VariableName>{')'}; <br />
                    {'}'}
                </CodeBlock>
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
                <CodeBlock text="Console.cpp" linkToFile="https://github.com/nathandavis18/NotVim-Editor/blob/fb343d3b9e572f8e3705fc9bbeb7fae303b7c1a2/src/Console/Console.cpp#L1106">
                    <VariableType>int</VariableType> <VariableName>rows</VariableName>, <VariableName>cols</VariableName>; <br />
                    <VariableType>void</VariableType> <FunctionText>getWindowSize</FunctionText>{'()'}{'{'}<br />
                    &emsp;&emsp;<UserVariableType>CONSOLE_SCREEN_BUFFER_INFO</UserVariableType> <VariableName>screenInfo</VariableName>; <br />
                    &emsp;&emsp;<FunctionText>GetConsoleScreenBufferInfo</FunctionText>{'('}<FunctionText><wbr />GetStdHandle</FunctionText>{'('}<MacroType>STD_OUTPUT_HANDLE</MacroType>{')'}, &<VariableName>screenInfo</VariableName>{'))'};
                    <br />
                    &emsp;&emsp;<VariableName>rows</VariableName> = screenInfo.srWindow.Bottom - screenInfo.srWindow.Top + 1; <br />
                    &emsp;&emsp;<VariableName>cols</VariableName> = screenInfo.srWindow.Right - screenInfo.srWindow.Left + 1;
                    <br />{'}'}
                </CodeBlock>
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
                <CodeBlock text="Intro to _getch()">
                    #include {"<conio.h>"}; <br />
                    <VariableType>int</VariableType> <VariableName>input</VariableName> = <FunctionText>_getch</FunctionText>{'('}{')'};
                </CodeBlock>
                <p className="text-xl mb-3 mt-5">
                    Without providing any extra functionality other than allowing the user to insert characters, we are basically done.
                    There will be some weird things that happen if the user presses a key that isn't just a standard character {'('}letter or number{')'}, but it works!
                    <br /><br />
                    However, let's take it one step further and prevent these weird bugs. There are 2 special return codes from 
                    &nbsp;<code className="text-[17px]"><FunctionText>_getch</FunctionText></code> that we need to focus on: 0 and 224.
                    <br/><br />
                    0 denotes the use of a function key {'('}F1, F2, F3, etc.{')'}, while 224 denotes the use of an action key {'('}arrow keys, home, end, delete, page up/down, and their Ctrl variants{')'}.
                    <br /><br />
                    To fix this, we can read that input and either ignore it or process it farther to get the specific key pressed. Putting this all into a function, we get something like:
                </p>
                <CodeBlock text="Input.cpp" linkToFile={"https://github.com/nathandavis18/NotVim-Editor/blob/fb343d3b9e572f8e3705fc9bbeb7fae303b7c1a2/src/Input/Input.cpp#L44"}>
                    #include {"<conio.h>"}; <br />
                    <VariableType>const int</VariableType> <VariableName>functionKeyCode</VariableName> = 0; <br />
                    <VariableType>const int</VariableType> <VariableName>actionKeyCode</VariableName> = 224; <br />
                    <VariableType>int</VariableType> <FunctionText>handleInput</FunctionText>{'()'}{'{'}<br />
                    &emsp;&emsp;<VariableType>int</VariableType> <VariableName>input</VariableName> = <FunctionText>_getch</FunctionText>{'('}{')'}; <br />
                    &emsp;&emsp;<ControlKeyword>if</ControlKeyword>{'('}<VariableName>input</VariableName> == <VariableName>functionKeyCode</VariableName>{')'}{'{'}<br />
                    &emsp;&emsp;&emsp;&emsp;<VariableType>int</VariableType> _ = <FunctionText>_getch</FunctionText>{'('}{')'}; <CommentText>//Ignore this input</CommentText> <br />
                    &emsp;&emsp;{'}'} <br />
                    &emsp;&emsp;<ControlKeyword>else if</ControlKeyword>{'('}<VariableName>input</VariableName> == <VariableName>actionKeyCode</VariableName>{')'}{'{'}<br />
                    &emsp;&emsp;&emsp;&emsp;<VariableName>input</VariableName> = <FunctionText>_getch</FunctionText>{'()'}; <CommentText>//Get the specific action key pressed</CommentText> <br />
                    &emsp;&emsp;&emsp;&emsp;<CommentText>//How you handle the action keys goes here</CommentText><br />
                    &emsp;&emsp;&emsp;&emsp;<ControlKeyword>return</ControlKeyword> input; <br />
                    &emsp;&emsp;{'}'} <br />
                    &emsp;&emsp;<ControlKeyword>return</ControlKeyword> <VariableName>input</VariableName>; <br />
                    {'}'}
                </CodeBlock>
                <p className="text-xl mt-5">
                    For the action keys to work properly, you must do something different with how they act. In my case, I chose to use an enum of action types, and
                    depending on what keycode was returned after the action keycode, I returned a specific action type. 
                </p>
                <hr className="border-slate-500 my-5"/>
                <h2 className="text-2xl font-semibold text-center mb-3">Displaying Text to User</h2>
                <p className="text-xl mb-3 mt-5">
                    Displaying the text to the user is pretty much the same as displaying text on your console through normal means. 
                    With C++23 you can use <code className="text-[17px]">std::<FunctionText>print</FunctionText></code>, otherwise you can use <code className="text-[17px]">std::<FunctionText>cout</FunctionText></code>
                    <br /><br />
                    For example, to display "Hello, World", you can do something like:
                </p>
                <CodeBlock text="Displaying Text to user Example">
                    #include {"<iostream>"}; <br />
                    <VariableType>int</VariableType> <FunctionText>main</FunctionText>{"(){"}<br />
                    &emsp;&emsp;std::<FunctionText>cout</FunctionText> {'<<'} "Hello, World" {'<<'} std::<FunctionText>endl</FunctionText>; <br />
                    {'}'}
                </CodeBlock>
                <p className="text-xl mb-3 mt-5">
                    Basically, the only thing that's different is how you control what part of the file should be displayed to the user.<br /><br />

                    There are several ways you can choose to store the text. I chose to go with <code className="text-[17px]">std::<UserVariableType>vector</UserVariableType>{'<'}std::<UserVariableType>string</UserVariableType>{'>'}</code>
                    <br /><br />
                    To keep track of which rows within the vector I should display, I store a row offset. 
                    Rather than starting from the beginning of the vector when displaying to the user, I start from this row offset.
                    For example, say we have this scenario:
                </p>
                <CodeBlock text="Row Offset example">
                    <CommentText>//fileRows is defined somewhere in the file and contains all the rows of text</CommentText> <br />
                    std::<UserVariableType>string</UserVariableType> <VariableName>buffer</VariableName> = {'""'};<br />
                    <ControlKeyword>for</ControlKeyword>{'('}<VariableType>int</VariableType> <VariableName>i</VariableName> = <VariableName>rowOffset</VariableName>
                    ; <VariableName>i</VariableName> {'<'} <VariableName>rows</VariableName> + <VariableName>rowOffset</VariableName>; ++<VariableName>i</VariableName>{'){'}<br />
                    &emsp;&emsp;<VariableName>buffer</VariableName>.<FunctionText>append</FunctionText>{'('}<VariableName>fileRows</VariableName>{'['}<VariableName>i</VariableName>{'])'}; <br />
                    &emsp;&emsp;<VariableName>buffer</VariableName>.<FunctionText>append</FunctionText>{'("\\r\\n")'}; <CommentText>//New lines should print on new rows</CommentText><br /> 
                    {'}'} <br />
                    std::<FunctionText>cout</FunctionText> {'<<'} <VariableName>buffer</VariableName>; <br />
                    std::<FunctionText>cout</FunctionText>.<FunctionText>flush</FunctionText>{'()'}; <CommentText>//cout.flush forces the buffer to be printed to the console</CommentText>
                </CodeBlock>
                <p className="text-xl mb-3 mt-5">
                    Remember how I said you would need to keep the rows and columns for the terminal stored somewhere? This is where that becomes relevant. 
                    <br /><br />
                    If the strings for each row are less than the max columns of the terminal, then this will work fine. But what if the lines are longer?
                    Well, just like how we store the row offset, we can store a column offset, and do:
                </p>
                <CodeBlock>
                    std::<UserVariableType>string</UserVariableType> <VariableName>buffer</VariableName> = {'""'};<br />
                    <ControlKeyword>for</ControlKeyword>{'('}<VariableType>int</VariableType> <VariableName>i</VariableName> = <VariableName>rowOffset</VariableName>
                    ; <VariableName>i</VariableName> {'<'} <VariableName>rows</VariableName> + <VariableName>rowOffset</VariableName>; ++<VariableName>i</VariableName>{'){'}<br />
                    &emsp;&emsp;std::<UserVariableType>string</UserVariableType> <VariableName>renderedLine</VariableName> = <VariableName>fileRows</VariableName>{'['}<VariableName>i</VariableName>{']'}; <br />
                    &emsp;&emsp;<VariableName>renderedLine</VariableName> = <VariableName>renderedLine</VariableName>.<FunctionText>substr</FunctionText>{'('}<VariableName>colOffset</VariableName>, <VariableName>colOffset + cols</VariableName>{')'};<br />
                    &emsp;&emsp;<VariableName>buffer</VariableName>.<FunctionText>append</FunctionText>{'('}<VariableName>renderedLine</VariableName>{')'}; <br />
                    &emsp;&emsp;<VariableName>buffer</VariableName>.<FunctionText>append</FunctionText>{'("\\r\\n")'}; <CommentText>//New lines should print on new rows</CommentText><br /> 
                    {'}'} <br />
                    std::<FunctionText>cout</FunctionText> {'<<'} <VariableName>buffer</VariableName>; <br />
                    std::<FunctionText>cout</FunctionText>.<FunctionText>flush</FunctionText>{'()'}; <CommentText>//cout.flush forces the buffer to be printed to the console</CommentText>
                </CodeBlock>
                <p className="text-xl mb-3 mt-5">
                    If you want just a plain text editor, without syntax highlighting or anything special, this pretty much sums up rendering to the user. 
                    We have to handle tabs slightly differently to get them to render properly as the column offset moves, but that will come later. For now, we can render
                    text to the user just fine. 
                    <br /><br />
                    In order for text to constantly update on screen, we need a way to clear individual rows or the entire terminal on each update.
                    There isn't many good ways to achieve this that are completely cross-compatible. However, almost all current terminals support ANSI Escape codes. 
                    <br /><br />
                    You can read more about ANSI Escape Codes <a href="https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797" target="_blank">here</a>, 
                    but for now we will stick to some basic ones. <br /><br />

                    <code className="text-[17px]">Escape Code "\x1b{'['}2J"</code> will clear the entire terminal, or <code className="text-[17px]">Escape Code "\x1b{'['}0K"</code> will
                    clear the line from the cursor position to the end of the row. To prevent the screen from flickering on each update, I chose to use the latter. 
                    <br /><br />
                    We also need a way to control where the text is being written to. This is controlled by the terminal's cursor position. We can also use ANSI Escape Codes to move the cursor.
                    So, to start from the beginning, we need to move the cursor to (1, 1), the top-left corner. This can be achieved with <code className="text-[17px]">Escape Code "\x1b{'['}1;1H"</code>.
                    <br /><br />
                    The console will also store previous 'frames', allowing the user to scroll up and view them. We can clear this with <code className="text-[17px]">Escape Code "\x1b{'['}3J"</code>.
                    So, let's put this all together:
                </p>
                <CodeBlock text="Console.cpp" linkToFile={"https://github.com/nathandavis18/NotVim-Editor/blob/fb343d3b9e572f8e3705fc9bbeb7fae303b7c1a2/src/Console/Console.cpp#L252"}>
                    std::<UserVariableType>string</UserVariableType> <VariableName>buffer</VariableName> = {'"\\x1b[1;1H"'}; <CommentText>//Move cursor to (1,1)</CommentText><br />
                    <ControlKeyword>for</ControlKeyword>{'('}<VariableType>int</VariableType> <VariableName>i</VariableName> = <VariableName>rowOffset</VariableName>
                    ; <VariableName>i</VariableName> {'<'} <VariableName>rows</VariableName> + <VariableName>rowOffset</VariableName>; ++<VariableName>i</VariableName>{'){'}<br />
                    &emsp;&emsp;std::<UserVariableType>string</UserVariableType> <VariableName>renderedLine</VariableName> = <VariableName>fileRows</VariableName>{'['}<VariableName>i</VariableName>{']'}; <br />
                    &emsp;&emsp;<VariableName>renderedLine</VariableName> = <VariableName>renderedLine</VariableName>.<FunctionText>substr</FunctionText>{'('}<VariableName>colOffset</VariableName>, <VariableName>colOffset + cols</VariableName>{')'};<br />
                    &emsp;&emsp;<VariableName>buffer</VariableName>.<FunctionText>append</FunctionText>{'('}<VariableName>renderedLine</VariableName>{')'}; <br />
                    &emsp;&emsp;<VariableName>buffer</VariableName>.<FunctionText>append</FunctionText>{'("\\x1b[0K\\r\\n")'}; <CommentText>//Clear everything after last character in line in this row</CommentText><br /> 
                    {'}'} <br />
                    <VariableName>buffer</VariableName>.<FunctionText>append</FunctionText>{'("\\x1b[3J")'}; <CommentText>//Clear saved lines</CommentText><br />
                    std::<FunctionText>cout</FunctionText> {'<<'} <VariableName>buffer</VariableName>; <br />
                    std::<FunctionText>cout</FunctionText>.<FunctionText>flush</FunctionText>{'()'}; <CommentText>//cout.flush forces the buffer to be printed to the console</CommentText>
                </CodeBlock>
                <p className="text-xl mb-3 mt-5">
                    And just like that, you are displaying text to the user while making sure only the current data is being displayed. 
                    Now let's move on to controlling the cursor so we can control where we type.
                </p>
                <hr className="border-slate-500 my-5"/>
                <h2 className="text-2xl font-semibold text-center mb-3">Controlling the File Cursor</h2>
                <p className="text-xl mb-3 mt-5">
                    We need to constantly know where in the file we are currently at. We can do this by storing two 
                    variables: <VariableName>cursorX</VariableName> and <VariableName>cursorY</VariableName>. As the user inputs text, the <VariableName>cursorX</VariableName> position
                    needs to be moved to the right, and if they delete characters with Backspace, it needs to move to the left. If they use the Arrow Keys, both cursors may need to move.
                    <br /><br />
                    Handling character insertion is the easiest scenario. We can just do the following:
                </p>
                <CodeBlock text="Console.cpp" linkToFile={"https://github.com/nathandavis18/NotVim-Editor/blob/fb343d3b9e572f8e3705fc9bbeb7fae303b7c1a2/src/Console/Console.cpp#L678"}>
                    <VariableType>void</VariableType> <FunctionText>insertChar</FunctionText>{'('}<VariableType>const char</VariableType> <VariableName>c</VariableName>{'){'}<br />
                    &emsp;&emsp;std::<UserVariableType>string</UserVariableType>& <VariableName>currentLine</VariableName> = <VariableName>fileRows</VariableName>.<FunctionText>at</FunctionText>{'('}<VariableName>cursorY</VariableName>{')'};
                    <br />
                    &emsp;&emsp;<VariableName>currentLine</VariableName>.<FunctionText>insert</FunctionText>{'('}<VariableName>currentLine</VariableName>.<FunctionText>begin</FunctionText>{'()'} 
                    &nbsp;+ <VariableName>cursorX</VariableName>, <VariableName>c</VariableName>{')'}; <br />
                    &emsp;&emsp;++<VariableName>cursorX</VariableName>;<br />
                    {'}'}
                </CodeBlock>
                <p className="text-xl mb-3 mt-5">
                    This will insert a character at the current cursor position and move the cursor one position to the right.<br /><br />

                    Handling Backspace is mostly similar, but there are a couple of extra things to keep in mind: If we are at the beginning of the file, and if we are at the beginning of a row. 
                    <br /><br />
                    If we are at the beginning of the file, we don't want to do anything, since there is nothing behind the cursor. 
                    If we are at the beginning of a row, we want to delete the row and move everything on it to the previous line.<br /><br />

                    We can achieve that with the following:
                </p>
                <CodeBlock text="Console.cpp" linkToFile={"https://github.com/nathandavis18/NotVim-Editor/blob/fb343d3b9e572f8e3705fc9bbeb7fae303b7c1a2/src/Console/Console.cpp#L566"}>
                <VariableType>void</VariableType> <FunctionText>deleteChar</FunctionText>{'(){'}<br />
                    &emsp;&emsp;std::<UserVariableType>string</UserVariableType>& <VariableName>currentLine</VariableName> = <VariableName>fileRows</VariableName>.<FunctionText>at</FunctionText>{'('}<VariableName>cursorY</VariableName>{')'};
                    <br />
                    &emsp;&emsp;<ControlKeyword>if</ControlKeyword>{'('}<VariableName>cursorX</VariableName> == 0{'){'}<br />
                    &emsp;&emsp;&emsp;&emsp;<ControlKeyword>if</ControlKeyword>{'('}<VariableName>cursorY</VariableName> == 0{')'} <ControlKeyword>return</ControlKeyword>; <CommentText>//Don't do anything if at beginning of file</CommentText> <br />
                    &emsp;&emsp;&emsp;&emsp;<ControlKeyword>else</ControlKeyword>{'{'}<br />
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;std::<UserVariableType>string</UserVariableType>& <VariableName>previousLine</VariableName> = <VariableName>fileRows</VariableName>.<FunctionText>at</FunctionText>{'('}<VariableName>cursorY</VariableName> - 1{')'}; <br />
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<VariableName>previousLine</VariableName>.<FunctionText>append</FunctionText>{'('}<VariableName>currentLine</VariableName>{')'}; <br />
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<VariableName>fileRows</VariableName>.<FunctionText>erase</FunctionText>{'('}<VariableName>fileRows</VariableName>.<FunctionText>begin</FunctionText>{'()'} + <VariableName>cursorY</VariableName>{')'}; <br />
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;--<VariableName>cursorY</VariableName>; <br />
                    &emsp;&emsp;&emsp;&emsp;{'}'} <br />
                    &emsp;&emsp;{'}'} <br />
                    &emsp;&emsp;<ControlKeyword>else</ControlKeyword>{'{'}<br />
                    &emsp;&emsp;&emsp;&emsp;<VariableName>currentLine</VariableName>.<FunctionText>erase</FunctionText>{'('}<VariableName>currentLine</VariableName>.<FunctionText>begin</FunctionText>{'()'}, <VariableName>cursorX</VariableName> - 1{')'}; <br />
                    &emsp;&emsp;&emsp;&emsp;--<VariableName>cursorX</VariableName>; <br />
                    &emsp;&emsp;{'}'} <br />
                    {'}'}
                </CodeBlock>
                <p className="text-xl mb-3 mt-5">
                    Arrow key functionality is pretty simple, just moving <VariableName>cursorX</VariableName> and <VariableName>cursorY</VariableName> depending
                    on which arrow key was pressed. It requires similar bounds checking to make sure you don't go past the begining/end of the line/file, but otherwise pretty straight-forward. 
                    <br /><br />
                    Also, notice how we were using references of the lines this time? References are named aliases to whatever they are referencing, meaning they 'are' the item they are referencing, just a different name. 
                    We can use references to pass items around to functions without creating copies, much like pointers, without the need for the arrow-operator. We can also use references like this 
                    to make it easier to access a specific element of a vector so we don't have to keep doing std::<UserVariableType>vector</UserVariableType>::<FunctionText>at</FunctionText>(index).
                </p>
            </div>
        </div>
    );
}