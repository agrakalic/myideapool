import config from '/js/config'

const validationMessage = (fields) => {

  let message = '';

  const regex = {

    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$\-\_!%*?&]{8,}$/,
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  }

  for (let field of fields) {
    let val = field[0];
    let type = field[1];

    if (type !== undefined) {
      let pattern = regex[type];
      let re = new RegExp(pattern);
      if (!re.test(val)) message += config.content.validationMessages[type] + ' ';
    } else {
      if (val.length < 1) message += config.content.validationMessages.empty + ' ';
    }

  }

  return message;

}

export default validationMessage
