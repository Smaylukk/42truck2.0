import React, { FC, useEffect, useState } from 'react'
import { Container, Paper } from '@mui/material'
import ReactHtmlParser from 'react-html-parser'
import editorAPI from '../http/editorAPI'

export const HtmlText: FC<{ name: string }> = ({ name }) => {
  const [content, setContent] = useState('')
  useEffect(() => {
    editorAPI.getEditorData(name).then((data) => {
      setContent(data)
    })
  }, [name])
  return (
    <Container maxWidth='md'>
      <Paper elevation={8} sx={{ px: 2 }}>
        {ReactHtmlParser(content)}
      </Paper>
    </Container>
  )
}
