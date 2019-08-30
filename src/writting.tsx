import React, { useContext } from 'react'

import { Context } from './reducer'

export interface IWrittingProps {
  autofocus?: boolean
  onChange?: (param?: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Writting(props: IWrittingProps): JSX.Element {
  const { autofocus, onChange } = props
  const { state, dispatch } = useContext(Context)

  return (
    <>
      <textarea
        autoFocus={autofocus}
        name="md"
        className="input"
        id="textarea"
        spellCheck={true}
        wrap="hard"
        onChange={handleChange}
        value={state.value}
      />
      <style jsx>{`
        textarea {
          width: 50%;
          height: 100%;
          border: none;
          border-right: 1px solid green;
          outline: 0;
          resize: none;
        }
      `}</style>
    </>
  )

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    if (onChange && typeof onChange === 'function') {
      onChange(e)
    }
    dispatch({ type: 'mdInput', value: e.target.value })
  }
}

Writting.defaultProps = {
  autofocus: false,
}
