import '../style.scss';

const input = document.getElementsByTagName('input')[0];
const inputContainer = document.getElementById('input-container');
const dropdown = document.getElementById('dropdown');
const facets = [
  'Frame Rate',
  'Aspect Ratio',
  'Subtitles',
  'Status',
  'File Format',
];
const xIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" preserveAspectRatio="none">
<polygon points="25.192 5.393 16 14.586 6.808 5.393 5.393 6.808 14.586 16 5.393 25.192 6.808 26.607 16 17.414 25.192 26.607 26.607 25.192 17.414 16 26.607 6.808 25.192 5.393"></polygon>
</svg>`;

const onSearchInput = (e) => {
  emptyDropdown();
  const val = e.target.value.toLowerCase();
  // if (!val) return;
  const matches = facets.filter((facet) => {
    const facetSubstr = facet.toLowerCase().substr(0, val.length);
    return facetSubstr === val;
  });
  bestMatch = matches[0];
  matches.forEach((match) => {
    appendDropdownRow(match);
  });
  dropdown.style.left = input.offsetLeft + 'px ';
};

const onRowSelect = (e) => {
  input.value = '';
  const tagContainer = document.createElement('div');
  const tag = document.createElement('input');
  const x = document.createElement('div');
  tagContainer.className = 'search-tag-container';
  x.className = 'x';
  x.innerHTML = xIcon;
  tagContainer;
  tag.className = 'search-tag';
  tag.value = e.target.innerText + ': ';
  let length = tag.value.length;
  tag.style.width = length + 'ch';
  tagContainer.appendChild(tag);
  tagContainer.appendChild(x);
  inputContainer.insertBefore(tagContainer, input);
  tag.addEventListener('focus', () => {
    inputContainer.style.backgroundColor = '#2c2c30';
    input.disabled = true;
  });
  tag.addEventListener('input', (e) => {
    if (e.target.value.length < length) {
      e.target.parentNode.remove();
      input.disabled = false;
      input.focus();
    } else {
      let widthNR = e.target.value.length;
      e.target.style.width = widthNR + 'ch';
    }
  });
  tag.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && tag.value.length > length) {
      e.preventDefault();
      input.disabled = false;
      input.focus();
    }
  });
  x.addEventListener('click', (e) => {
    x.parentElement.remove();
  });
  tag.focus();
  emptyDropdown();
};

const emptyDropdown = () => {
  dropdown.innerHTML = '';
};

const appendDropdownRow = (text) => {
  const row = document.createElement('button');
  row.className = 'dropdown-row';
  row.addEventListener('click', onRowSelect);
  row.innerText = text;
  dropdown.appendChild(row);
};

input.addEventListener('input', onSearchInput);
document.addEventListener('click', (e) => {
  if (e.target.className === 'dropdown-row') return;
  if (e.target.id === 'input') {
    input.disabled = false;
    input.focus();
    return;
  }
  // inputContainer.style.backgroundColor = '#0f0f11';
  emptyDropdown();
});
input.addEventListener('focus', (e) => {
  onSearchInput(e);
  inputContainer.style.backgroundColor = '#2c2c30';
});
input.addEventListener('blur', (e) => {
  if (document.getElementsByClassName('search-tag-container')[0]) return;
  inputContainer.style.backgroundColor = '#0f0f11';
});

document.onkeydown = (e) => {
  if (
    e.key === 'Backspace' &&
    input.value.length === 0 &&
    input === document.activeElement &&
    input.previousElementSibling
  ) {
    inputContainer.removeChild(input.previousElementSibling);
    dropdown.style.left = input.offsetLeft + 'px ';
  }
};
