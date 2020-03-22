import React, { useEffect, useRef, useState } from 'react'
import { useField } from 'formik'

import './TodoItem.css'

const TodoItem = ({ index }) => {
  const [completedField, completedMeta, completedHelpers] = useField({
    name: `todos[${index}].isCompleted`,
    type: "checkbox"
  })

  const [contentField, contentMeta, contentHelpers] = useField(
    `todos[${index}].content`
  )

  const [isFocused, setIsFocused] = useState(false)

  const onContentInput = e => {
    contentHelpers.setValue(e.currentTarget.innerText);
  }

  const onContentBlur = () => {
    setIsFocused(false)
    contentHelpers.setTouched(true)
  }

  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      // contentRef.current.focus();
    }
  }, [])

  return (
    <div
      className={[
        'todo-item',
        isFocused && 'focused',
        completedField.checked && 'completed',
        contentMeta.error && contentMeta.touched && 'invalid'
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        type='checkbox'
        name={completedField.name}
        checked={completedField.checked}
        onChange={({ target }) => {
          completedHelpers.setValue(target.checked)
          completedHelpers.setTouched(true)
        }}
      />
      <span
        contentEditable
        ref={contentRef}
        className={"todo-text"}
        onInput={onContentInput}
        onFocus={() => setIsFocused(true)}
        onBlur={onContentBlur}
        dangerouslySetInnerHTML={{ __html: contentMeta.initialValue }}
      />
    </div>
  )
}

export default TodoItem
