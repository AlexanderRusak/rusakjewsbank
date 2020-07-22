import React, { useState } from "react";
import classes from "./Feedback.module.css";

import is from "is_js";
import emailjs from "emailjs-com";
import { Form } from "../../components/Form/Form";
import { Button } from "../../components/UI/Button/Button";
import { Input } from "../../components/UI/Input/Input";

export default function Feedback(props) {
  const [email, setEmail] = useState(props.userEmail);
  const [name, setName] = useState(props.userName);
  const [message, setMessage] = useState("");


  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidMessage, setIsValidMessage] = useState(false);
  const sendEmail = (userName, messageText) => {
    const templateParams = {
      to_name: "Alexander Rusak",
      from_name: userName,
      message_html: messageText,
    };
    emailjs
      .send(
        "default_service",
        "template_4FlX60QA",
        templateParams,
        "user_SEcJpr8uA5IQqLVDofPSr"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setMessage("");
          props.isSend(true);
        },
        (err) => {
          console.log("FAILED...", err);
          props.isSend(false);
          setMessage("");
        }
      );
  };
  const onSendEmail = () => {
    props.isSend(false);
    sendEmail(name, message);
  };
  const onChangeMail = (value) => {
    setEmail(value);
    validationEmail(value);
  };
  const onChangeName = (value) => {
    setName(value);
    validationName(value);
  };
  const onChangeMessage = (value) => {
    setMessage(value);
    validationMessage(value);
  };

  const validationEmail = (email) => {
    setIsValidEmail(email.length === 0 || !is.email(email) ? false : true);
  };
  const validationName = (name) => {
    setIsValidName(name.length === 0 ? false : true);
  };
  const validationMessage = (message) => {
    setIsValidMessage(message.length <= 5 ? false : true);
  };

  return (
    <Form>
      <h3>Напишите нам</h3>

      <div className={classes.Feedback}>
        <Input
          label={"Ваше имя"}
          type="text"
          value={name}
          valid={isValidName}
          onChange={onChangeName}
          errorMessage={"Введите имя"}
        />
        <Input
          label={"Почта"}
          value={email}
          type="text"
          valid={isValidEmail}
          onChange={onChangeMail}
          errorMessage={"Введите свою почту"}
        />
        <Input
          label={"Сообщение"}
          type="textarea"
          cols="80"
          rows="5"
          value={message}
          valid={isValidMessage}
          onChange={onChangeMessage}
          errorMessage={"Слишком короткое сообщение"}
        />
        <Button
          onClick={onSendEmail}
          disabled={isValidEmail && isValidMessage && isValidName}
        />
      </div>
    </Form>
  );
}
