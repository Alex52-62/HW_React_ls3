import "./App.css";

// eslint-disable-next-line
export const Message = (props) => <div className="card" >
    <div>Author: {props.author}</div>
    <div>text: {props.text}</div>
    <div>id: {props.id}</div>
    </div>;

