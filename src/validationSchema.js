import * as yup from "yup";

export const validationSchema = yup.object().shape({
  todos: yup.array().of(
    yup.object({
      content: yup.string().required("Required")
    })
  )
});
