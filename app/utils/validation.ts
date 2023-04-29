import { setLocale } from "yup";

setLocale({
  mixed: {
    required(params) {
      return "Trường bắt buộc nhập";
    },
  },
});
