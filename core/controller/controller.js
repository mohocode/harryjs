const autoBind = require("auto-bind");
const {
  removeTags,
  encodeHTML,
} = require("../../app/common/util/helpers.uitl");
const { validationResult } = require("express-validator");

class Controller {
  constructor() {
    // super();
    autoBind(this);
  }

  jsonResponse(res, code, message) {
    return res.status(code).json({ message });
  }

  sanitizeField(data) {
    data = this.stripTags(data);
    return data;
  }

  validation(req, res) {
    let data = [];

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        data.push(err.msg);
      });

      return data ;
    }

    return true;
  }

  stripTags(data) {
    data = removeTags(data); // $ Remove tags HTML (
    data = encodeHTML(data); // disable HTML tags
    return data;
  }
}

module.exports = Controller;
