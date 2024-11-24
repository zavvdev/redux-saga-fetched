import * as yup from "yup";
import { bookSchema } from "../../entity/book";
import { API_URL } from "./_config";

export var BooksApi = {
  getAll: async function () {
    var response = await fetch(`${API_URL}/books`);
    var books = await response.json();

    return yup
      .array()
      .of(bookSchema)
      .validateSync(books, { strict: true });
  },

  order: async function (dto) {
    var request = yup
      .object({
        book_ids: yup.array().of(yup.number()).required(),
        order_email: yup.string().email().required(),
      })
      .validateSync(dto, { strict: true });

    return await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(request),
    });
  },
};
