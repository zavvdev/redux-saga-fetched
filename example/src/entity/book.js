import * as yup from "yup";

export var bookSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().required(),
  author_fullname: yup.string().required(),
  publish_date: yup.string().required(),
  price: yup.string().required(),
});
