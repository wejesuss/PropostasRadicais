window.addEventListener('DOMContentLoaded', () => {
  const url = `${window.location.origin}/api`;
  const displayContentButton = document.querySelector('.ButtonDiv button');
  let plan;

  async function getPhrases() {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'same-origin',
    });

    plan = await res.json();
  }

  function setPlan(field, content = '') {
    document.querySelectorAll(field).forEach((list) => {
      list.innerHTML = content;
    });
  }

  function createListItem(tenders) {
    return tenders.reduce((prev, tender) => {
      prev += `<li>${tender}</li>`;
      return prev;
    }, '');
  }

  function createTender() {
    plan.forEach((field) => {
      const [name] = Object.keys(field);
      const char = name.slice(0, 1).toUpperCase();
      const fieldName = char + name.slice(1);
      const phrases = createListItem(field[name]);
      setPlan(`.Topic.${fieldName} ul`, phrases);
    });
  }

  displayContentButton.addEventListener('click', async () => {
    await getPhrases();
    setPlan('.Topic ul');
    createTender();
  });
});
