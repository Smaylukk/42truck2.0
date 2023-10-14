import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";

export const Footer = () => {
  return (
    <Box>
      <Container maxWidth="md">
        <Typography variant="h6" align="center" gutterBottom>
          Реквізити
        </Typography>
        <Typography
          variant="subtitle1"
          align="left"
          color="text.secondary"
          component="div"
        >
          Дякуємо, що рухаєте світ. Якщо хочете підтримати проєкт, реквізити
          тут:
          <br />
          Приват - <b className={"Amount"}>5168745105614421</b> (Антон Сененко)
          <br />
          PayPal - <b className={"Amount"}>senenkoanton@gmail.com</b>
          <br />
          <br />
          Детальні реквізити: <br />
          Установа банку - ПриватБанк
          <br />
          МФО банку - 305299 <br />
          Отримувач платежу - СЕНЕНКО АНТОН ІГОРОВИЧ
          <br />
          IBAN - UA953052990000026201691360906 <br />
          Рахунок отримувача - 26201691360906
          <br />
          Валюта картки - UAH <br />
          РНОКПП отримувача - 3136215494
          <br />
          Призначення платежу -
          <br />
          Поповнення рахунку СЕНЕНКО АНТОН ІГОРОВИЧ, безповоротна
          фінансова/благодійна допомога ЗСУ)
          <br />
          <br />
          Принагідно лишаю реквізити Мартин Брест, з яким ми разом реалізуємо
          проєкт:
          <br />
          Моно: <b className={"Amount"}>4441114443028624</b>
          <br />
          PayPal: <b className={"Amount"}>Oleg.boldyriev@gmail.com</b>
          <br />
          Приват: <b className={"Amount"}>4149499371016518</b>
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Розробка - Головаченко Дмитро
          <br />
          <a
            href="mailto:smaylukk@gmail.com"
            target="_top"
            className={"Amount"}
          >
            smaylukk@gmail.com
          </a>
        </Typography>
      </Container>
    </Box>
  );
};
