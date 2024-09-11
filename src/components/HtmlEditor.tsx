import React, { FC, useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {
  ClassicEditor,
  Autoformat,
  Alignment,
  Bold,
  Italic,
  Underline,
  BlockQuote,
  Base64UploadAdapter,
  CloudServices,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
  Indent,
  IndentBlock,
  Link,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  FontColor,
  FontBackgroundColor,
  FontFamily,
  FontSize,
} from 'ckeditor5'
import editorAPI from '../http/editorAPI'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import '../translations/uk'
import 'ckeditor5/ckeditor5.css'
import { Alert, Collapse } from '@mui/material'

export const EditorHTML: FC<{ name: string }> = ({ name }) => {
  const [successAlertShow, setSuccessAlertShow] = useState(false)
  const [errorAlertShow, setErrorAlertShow] = useState(false)
  const [editorData, setEditorData] = useState('')
  useEffect(() => {
    editorAPI.getEditorData(name).then((data) => {
      setEditorData(data)
    })
  }, [name])
  const saveEditorData = async () => {
    const result = await editorAPI.saveEditorData(name, editorData)

    if (!result) {
      setErrorAlertShow(true)
    } else {
      setSuccessAlertShow(true)
    }
  }
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Stack direction='row' spacing={2} sx={{ my: 1, flexWrap: 'wrap' }} useFlexGap>
        <Button size='small' variant='contained' onClick={saveEditorData}>
          Зберегти
        </Button>
      </Stack>
      <Collapse in={successAlertShow}>
        <Alert severity='success' onClose={() => setSuccessAlertShow(false)}>
          Успішно збережено
        </Alert>
      </Collapse>
      <Collapse in={errorAlertShow}>
        <Alert severity='warning' onClose={() => setErrorAlertShow(false)}>
          Помилка при збереженні
        </Alert>
      </Collapse>
      <CKEditor
        editor={ClassicEditor}
        config={{
          language: { ui: 'uk' },
          toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'link',
            'uploadImage',
            'insertTable',
            'blockQuote',
            'mediaEmbed',
            '|',
            'alignment',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'fontFamily',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
          ],
          heading: {
            options: [
              {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph',
              },
              {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                class: 'ck-heading_heading1',
              },
              {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2',
              },
              {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                class: 'ck-heading_heading3',
              },
              {
                model: 'heading4',
                view: 'h4',
                title: 'Heading 4',
                class: 'ck-heading_heading4',
              },
            ],
          },
          image: {
            resizeOptions: [
              {
                name: 'resizeImage:original',
                label: 'Default image width',
                value: null,
              },
              {
                name: 'resizeImage:50',
                label: '50% page width',
                value: '50',
              },
              {
                name: 'resizeImage:75',
                label: '75% page width',
                value: '75',
              },
            ],
            toolbar: [
              'imageTextAlternative',
              'toggleImageCaption',
              '|',
              'imageStyle:inline',
              'imageStyle:wrapText',
              'imageStyle:breakText',
              '|',
              'resizeImage',
            ],
          },
          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
          },
          initialData: '<p>Hello from CKEditor 5 in React!</p>',
          plugins: [
            Autoformat,
            Alignment,
            BlockQuote,
            Bold,
            CloudServices,
            Essentials,
            Heading,
            Image,
            ImageCaption,
            ImageResize,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            Base64UploadAdapter,
            Indent,
            IndentBlock,
            Italic,
            Link,
            List,
            MediaEmbed,
            Mention,
            Paragraph,
            PasteFromOffice,
            PictureEditing,
            Table,
            TableColumnResize,
            TableToolbar,
            TextTransformation,
            Underline,
            FontColor,
            FontBackgroundColor,
            FontFamily,
            FontSize,
          ],
        }}
        data={editorData}
        onChange={(e, editor) => setEditorData(editor.getData())}
      />
    </Box>
  )
}
