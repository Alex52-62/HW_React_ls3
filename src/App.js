import "./App.css";
import { Message } from "./components/Message/index.js";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import ChatIcon from "@material-ui/icons/Chat";
import TextField from "@material-ui/core/TextField";
import CheckboxListSecondary from "./components/ChatList/index.js";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles.js";
import { lightTheme, darkTheme } from "./components/Themes";
import { useDarkMode } from "./components/useDarkMode";
import Toggle from "./components/Toggler";

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();
  const [MessageList, setMessageList] = useState([]);
  const [value, setValue] = useState("");
  const names = ["Alex", "Peter", "John", "Alan", "Phil", "Bryan", "Boris"];
  const rand = Math.floor(Math.random() * names.length);

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    console.log("App did mount");
  }, []);

  useEffect(() => {
    if (MessageList[MessageList.length - 1]?.author === "Boris") {
      const timer = setTimeout(() => {
        setMessageList((prevMessageList) => [
          ...prevMessageList,
          {
            text: <h4 style={{ color: "red" }}>message from Bot!</h4>,
            author: "Bot in fact",
            id: `${uuidv4()}`,
          },
        ]);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (!mountedComponent) return <div />;
  }, [value, MessageList, mountedComponent]);

  function handleMessageList(e) {
    e.preventDefault();
    setFlag(!flag);
    setMessageList((prevMessageList) => [
      ...prevMessageList,
      { text: value, author: names[rand], id: `${uuidv4()}` },
    ]);
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [flag, setFlag] = React.useState(true);

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className="App">
          <Toggle theme={theme} toggleTheme={themeToggler} />
          <CheckboxListSecondary />
          <div className="container">
            <form onSubmit={handleMessageList}>
              <div className="cover">
                <Button
                  variant="contained"
                  color={flag ? "primary" : "secondary"}
                  onClick={handleMessageList}
                >
                  <ChatIcon />
                  &nbsp;&nbsp;&nbsp;Add message
                </Button>
              </div>
              <TextField
                id="standard-secondary"
                autoFocus={true}
                label="start chat input"
                color="secondary"
                value={value}
                onChange={handleChange}
              />
            </form>
            {MessageList.map((message, id) => (
              <Message
                key={id}
                text={message.text}
                author={message.author}
                id={message.id}
              />
            ))}
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
