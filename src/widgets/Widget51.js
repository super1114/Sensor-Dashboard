import { makeStyles } from '@material-ui/core/styles'

import useNodeRed from 'hooks/useNodeRed'

import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import Font from '@ckeditor/ckeditor5-font/src/font'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import List from '@ckeditor/ckeditor5-list/src/list'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 8,
    overflow: 'hidden',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    borderRadius: 8,
  },

  title: {
    fontFamily: theme.typography.mediumFontFamily,
    color: theme.palette.common.thirdBlue,
    letterSpacing: 1.33,
    fontSize: 16,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%',
    position: 'relative',
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    height: 351,
    borderRadius: 10,
    border: `2px solid ${theme.palette.common.thirdBlue}`,
    background: 'transparent',
    color: theme.palette.common.primaryBlack,
    fontSize: 16,
    lineHeight: '18.75px',
    letterSpacing: 1.29,
    overflow: 'hidden',
  },
  wrapper: {
    width: '100%',
    height: '99%',
    overflow: 'auto',
  },
}))

const Widget51 = ({ style = {}, width = 580, height = 385, topic = 'topic-51' }) => {
  // const { title, data } = useNodeRed(topic)
  const classes = useStyles()
  const title = 'Highlights'
  const [data, setData] = useState(`
  <ul>
    <li>Underlying profit before tax in 2017 reduced by £6.3m, or 2.3% driven by an increase in costs on the prior year.</li>
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin mattis malesuada.</li>
    <li>Nullam tincidunt justo leo, vitae porta dolor pharetra sit amet. Curabitur eget arcu condimentum, mattis ante sit amet tellis.</li>
    <li>Praesent in ligula quis sapien varius tempor sed id nulla. Ut tristique, ante eu imperdiet vestibulum, nibh felis egestas massa.</li>
    <li>Cras libero lorem, bibendum a tincidunt dapibus, convallis id tortor.</li>
    <li>Fusce vel libero quis ipsum euismod rutrum eu sit amet nisl. Vestibulum est velit, mattis in posuere eu, dictum eget velit. Vestibulum sed turpis mauris.</li>
  </ul>
  `)

  if (!title) {
    return ''
  }

  return (
    <div
      className={classes.root}
      style={{
        ...style,
        width: width,
        height: height,
      }}
    >
      <div className={classes.title}>{title}</div>
      <div className={classes.body}>
        <div className={clsx(classes.wrapper)} id="highlight-ckeditor">
          <CKEditor
            editor={ClassicEditor}
            config={{
              plugins: [Heading, Essentials, Paragraph, Font, FontFamily, Bold, Italic, Underline, Alignment, List],
              fontFamily: {
                options: ['SF UI Display', 'Ubuntu, Arial, sans-serif', 'Ubuntu Mono, Courier New, Courier, monospace'],
              },
              fontSize: {
                options: ['tiny', 'small', 'default', 'big', 'huge'],
              },
              toolbar: [
                'heading',
                '|',
                'fontFamily',
                'fontSize',
                'bold',
                'italic',
                'underline',
                'fontColor',
                '|',
                'alignment:left',
                'alignment:right',
                'alignment:center',
                'alignment:justify',
                '|',
                'bulletedList',
                'numberedList',
                '|',
              ],
            }}
            data={data}
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
              setData(editor.getData())
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Widget51
