import React, { useState } from "react";
import classes from "./Feedback.module.css";

import is from "is_js";
import emailjs from "emailjs-com";
import { Form } from "../../components/Form/Form";
import { Button } from "../../components/UI/Button/Button";
import { Input } from "../../components/UI/Input/Input";
import { Label } from "../UI/Label/Label";
import Axios from "axios";

export default function Feedback(props) {
  const [email, setEmail] = useState(props.userEmail);
  const [name, setName] = useState(props.userName);
  const [feedback, setFeedback] = useState(" ");

  const [inputName, setInputName] = useState(false);
  const [inputEmail, setInputEmail] = useState(false);
  const [inputArea, setInputArea] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidMessage, setIsValidMessage] = useState(false);
  const sendEmail = async (userName, messageText) => {
    const templateParams = {
      to_name: "Alexander Rusak",
      from_name: userName,
      message_html: messageText,
    };

    console.log(feedback);

    /*      emailjs
      .send(
        "default_service",
        "template_4FlX60QA",
        templateParams,
        "user_SEcJpr8uA5IQqLVDofPSr"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setFeedback(feedback);
          props.isSend(true);
        },
        (err) => {
          console.log("FAILED...", err);
          props.isSend(false);
          setFeedback("Вы пока что не оставили отзыв");
        }
      );  */
    /* const signInUser = localStorage.getItem("userId");

    const fireBaseData = await Axios.get(
      "https://rusakjewsbank-32815.firebaseio.com/users.json"
    ).catch((err) => {
      console.log(err);
    });
    let users = {};
    const userData = [];
    for (const dataBaselength in fireBaseData.data) {
      if (fireBaseData.data[dataBaselength].id === signInUser) {
        fireBaseData.data[dataBaselength].feedback = messageText;
      }
      users = fireBaseData.data;
    }
    console.log(fireBaseData.data);
    console.log(userData[0]);
    const feed = await Axios.put(
      `https://rusakjewsbank-32815.firebaseio.com/users.json`,
      {
        users,
      }
    );
    console.log(feed); */
  };
  const onSendEmail = () => {
    props.isSend(false);
    sendEmail(name, feedback);
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
    setFeedback(value);
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
  const onToggleNameInput = () => {
    setInputName(!inputName);
  };
  const onToggleEmailInput = () => {
    setInputEmail(!inputEmail);
  };
  const onToggleAreaInput = () => {
    setInputArea(!inputArea);
  };
  return (
    <Form>
      <h3>Напишите нам</h3>

      <div className={classes.Feedback}>
        <div className={classes.InputGroup}>
          {inputName ? (
            <Input
              label={"Ваше имя"}
              type="text"
              value={localStorage.getItem("userFeedback")}
              valid={isValidName}
              onChange={onChangeName}
              errorMessage={"Введите имя"}
            />
          ) : (
            <Label label={"Ваше имя"} value={name} />
          )}
          {!inputName ? (
            <i onClick={onToggleNameInput} className="fa fa-edit"></i>
          ) : (
            <i onClick={onToggleNameInput} className="fa fa-save"></i>
          )}
        </div>
        <div className={classes.InputGroup}>
          {inputEmail ? (
            <Input
              label={"Почта"}
              value={email}
              type="text"
              valid={isValidEmail}
              onChange={onChangeMail}
              errorMessage={"Введите свою почту"}
            />
          ) : (
            <Label label={"Почта"} value={email} />
          )}
          {!inputEmail ? (
            <i onClick={onToggleEmailInput} className="fa fa-edit"></i>
          ) : (
            <i onClick={onToggleEmailInput} className="fa fa-save"></i>
          )}
        </div>
        <div className={classes.InputGroup}>
          {inputArea ? (
            <Input
              label={"Сообщение"}
              height={"230px"}
              value={feedback}
              type="textarea"
              valid={isValidMessage}
              onChange={onChangeMessage}
              errorMessage={"Слишком короткое сообщение"}
            />
          ) : (
            <Label type="textarea" label="Сообщение" value={feedback} />
          )}
          {!inputArea ? (
            <i onClick={onToggleAreaInput} className="fa fa-edit"></i>
          ) : (
            <i onClick={onToggleAreaInput} className="fa fa-save"></i>
          )}
        </div>
        <div className={classes.InputGroup}>
          <Button
            title="Сохранить"
            onClick={onSendEmail}
            disabled={
              isValidEmail &&
              isValidMessage &&
              isValidName &&
              !inputArea &&
              !inputName &&
              !inputEmail
            }
          />
        </div>
      </div>
    </Form>
  );
}
