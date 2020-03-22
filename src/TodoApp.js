import React from 'react'
import { Form, Formik, FieldArray } from 'formik'

import TodoItem from './TodoItem'

const TodoApp = () => (
  <Formik
    initialValues={{ todos: [] }}
    validateOnBlur
    validateOnChange={false}
    validate={val => {
      console.log(val)
    }}
  >
    <Form>
      <FieldArray name='todos' validateOnChange>
        {({
          form: { values, setValues, validateForm },
          ...fieldArrayHelpers
        }) => {
          const onAddClick = async () => {
            await fieldArrayHelpers.push({
              id: values.todos.length,
              content: '',
              isCompleted: false
            })
            validateForm()
          };

          const onRemoveClick = () => {
            const newTodos = values.todos.filter(
              ({ isCompleted }) => !isCompleted
            )
            setValues({ todos: newTodos })
          }

          return (
            <React.Fragment>
              <button onClick={onAddClick} type="button">
                Add Item
              </button>
              <button onClick={onRemoveClick} type="button">
                Remove
              </button>
              {values.todos.map(({ id }, index) => (
                <TodoItem key={id} index={index} />
              ))}
            </React.Fragment>
          )
        }}
      </FieldArray>
    </Form>
  </Formik>
)

export default TodoApp
