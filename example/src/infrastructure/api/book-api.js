import * as yup from "yup";
import { bookSchema } from "../../entity/book";
import { delay } from "../utilities";
import { booksMock } from "./_mock";

export var BooksApi = {
  getAll: async function (error = false) {
    await delay(2000);

    if (error) {
      throw new Error("Failed to fetch books");
    }

    return yup
      .array()
      .of(bookSchema)
      .validateSync(booksMock, { strict: true })
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  },

  order: async function (dto, error = false) {
    var request = yup
      .object({
        book_ids: yup.array().of(yup.number()).required(),
        order_email: yup.string().email().required(),
      })
      .validateSync(dto, { strict: true });

    await delay(2000);

    if (error) {
      throw new Error("Order failed");
    } else {
      return request;
    }
  },
};
