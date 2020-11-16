const { fields } = require('./fields.json');

const maxToShuffle = {
  health: 5,
  security: 3,
  finance: 5,
  education: 13,
  transportation: 3,
  others: 8,
};

module.exports = function (req, res) {
  if (req.method == 'POST') {
    const plan = Object.keys(maxToShuffle).map((field) => {
      const max = getQuantityToShuffle(maxToShuffle[field]);
      const tenders = shuffle(field, max);

      return tenders;
    });

    return res.json(plan);
  } else {
    return res.redirect('/');
  }
};

function getQuantityToShuffle(max = 1) {
  return Math.round(Math.random() * (max - 1) + 1);
}

function shuffle(fieldName = '', max) {
  const inserted = [];
  const tenders = {
    [fieldName]: [],
  };

  const field = fields[fieldName];
  const length = field.length;

  for (let index = 0; index < max; index++) {
    let position;
    do {
      position = Math.floor(Math.random() * length);
    } while (inserted.includes(position));

    const element = field[position];
    tenders[fieldName].push(element);
    inserted.push(position);
  }

  return tenders;
}
