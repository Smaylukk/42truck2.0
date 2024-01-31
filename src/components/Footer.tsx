import React, { useState } from 'react'
import { Alert, Paper, Container, Typography, Snackbar } from '@mui/material'

export const Footer = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const copyCode = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setOpenAlert(true)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  const handleClose = () => {
    setOpenAlert(false)
  }
  return (
    <Container maxWidth='md'>
      <Paper elevation={8} sx={{ px: 2 }}>
        <Typography variant='h6' align='center' gutterBottom>
          Реквізити
        </Typography>
        <Typography variant='subtitle1' align='left' color='text.secondary' component='div'>
          Дякуємо, що рухаєте світ. Якщо хочете підтримати проєкт, реквізити тут:
          <br />
          Приват -{' '}
          <b
            className={'Amount Hand'}
            onClick={() => {
              copyCode('5168745105614421')
            }}
          >
            5168745105614421
          </b>{' '}
          (Антон Сененко)
          <br />
          PayPal -{' '}
          <b
            className={'Amount Hand'}
            onClick={() => {
              copyCode('senenkoanton@gmail.com')
            }}
          >
            senenkoanton@gmail.com
          </b>
          <br />
          Криптовалюта USDT -{' '}
          <b
            className={'Amount Hand'}
            onClick={() => {
              copyCode('0xdf89978Ca0F80a30DB5D140b2042e99441ec43A4')
            }}
          >
            0xdf89978Ca0F80a30DB5D140b2042e99441ec43A4
          </b>{' '}
          (Ethereum (ERC20))
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
          Поповнення рахунку СЕНЕНКО АНТОН ІГОРОВИЧ, безповоротна фінансова/благодійна допомога ЗСУ)
          <br />
          <br />
          Принагідно лишаю реквізити Мартін Брест, з яким ми разом реалізуємо проєкт:
          <br />
          Моно:{' '}
          <b
            className={'Amount Hand'}
            onClick={() => {
              copyCode('4441114443028624')
            }}
          >
            4441114443028624
          </b>
          <br />
          PayPal:{' '}
          <b
            className={'Amount Hand'}
            onClick={() => {
              copyCode('Oleg.boldyriev@gmail.com')
            }}
          >
            Oleg.boldyriev@gmail.com
          </b>
          <br />
          Приват:{' '}
          <b
            className={'Amount Hand'}
            onClick={() => {
              copyCode('4149499371016518')
            }}
          >
            4149499371016518
          </b>
        </Typography>
        <Typography variant='subtitle1' align='center' gutterBottom>
          Розробка - Головаченко Дмитро
          <br />
          <a href='mailto:smaylukk@gmail.com' target='_top' className={'Amount'}>
            smaylukk@gmail.com
          </a>
        </Typography>
      </Paper>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Скопійовано!
        </Alert>
      </Snackbar>
    </Container>
  )
}
