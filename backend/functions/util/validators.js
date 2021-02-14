const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

const filterInt = (value) => {
  if (/^[-+]?(\d+|Infinity)$/.test(value)) {
    return Number(value)
  } else {
    return NaN
  }
}

exports.validateSignupData = user => {
  let errors = {};

  if (isEmpty(user.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(user.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(user.password)) errors.password = 'Must not be empty';
  if (isEmpty(user.displayName)) errors.displayName = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = user => {
  let errors = {};

  if (isEmpty(user.email)) errors.email = 'Must not be empty';
  if (isEmpty(user.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmpty(data.displayName.trim())) userDetails.displayName = data.displayName;
  if (!isEmpty(data.sprite.trim())) userDetails.sprite = data.sprite;
  if (filterInt(data.playerStartX)>=0) userDetails.playerStartX = data.playerStartX;
  if (filterInt(data.playerStartY)>=0) userDetails.playerStartY = data.playerStartY;
  if (filterInt(data.score)>=0) userDetails.score = data.score;
  userDetails.lastActivityOn = new Date().toISOString();

  return userDetails;
};