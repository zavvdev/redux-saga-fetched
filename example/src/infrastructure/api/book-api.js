import * as yup from "yup";
import { bookSchema } from "../../entity/book";
import { delay } from "../utilities";
import { booksMock } from "./_mock";

export var BooksApi = {
  getAll: async function () {
    await delay(2000);

    return yup
      .array()
      .of(bookSchema)
      .validateSync(booksMock, { strict: true });
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
