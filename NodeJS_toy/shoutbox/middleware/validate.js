/**
 *
 * Validation function for submitting post related data.
 *
 * @author jingjiejiang
 * @history May 5, 2022
 *
 */
const alertWindow = require('alert');

// parse entry[name] notification
function parseField(field) {
  return field
    .split(/\[|\]/)
    .filter((s) => s);
}

// Looks up property based on parseField() results
function getField(req, field) {
  let val = req.body;
  field.forEach((prop) => {
    val = val[prop];
  });
  return val;
}

exports.required = (field) => {
  const newField = parseField(field);
  return (req, res, next) => {
    // check whether field has a value, if yes, move on to next middleware
    if (getField(req, newField)) {
      next();
    } else {
      alertWindow(`${newField.join(' ')} is required`);
      res.redirect('back');
    }
  };
};

// the title must exist specified len
exports.lengthAbove = (field, len) => {
  const newField = parseField(field);
  return (req, res, next) => {
    if (getField(req, newField).length > len) {
      next();
    } else {
      alertWindow(`${newField.join(' ')} must have more than ${len} characters`);
      res.redirect('back');
    }
  };
};
