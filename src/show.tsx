import React, { useContext, useLayoutEffect } from 'react'
import marked from 'marked'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xss = require('xss')

import { Context } from './reducer'

import markedOptions from './marked-options'

// interface IShowProps extends Pick<IProps, 'defaultValue'> {}

export default function Show(props: any): JSX.Element {
  const { state } = useContext(Context)

  useLayoutEffect(() => {
    marked.setOptions(markedOptions)
  }, [])

  // return <div>{renderContent()}</div>
  // return <div dangerouslySetInnerHTML={{ __html: renderContent() }} />
  // function renderContent() {
  //   const val =
  //     state.value === '请输入内容' && defaultValue ? defaultValue : state.value
  //   return marked(val)
  // }
  return (
    <div className="content">
      {/* {xss(marked(state.value))} */}
      <div dangerouslySetInnerHTML={{ __html: xss(marked(state.value)) }} />
      <style jsx>{`
        .content {
          flex-shrink: 0;
          width: 50%;
          border: 1px solid red;
        }
      `}</style>
    </div>
  )
}
