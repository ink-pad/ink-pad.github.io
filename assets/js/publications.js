// ===== Publications Filter & Search =====
(function () {
  var searchInput = document.getElementById('pub-search');
  var yearSelect = document.getElementById('filter-year');
  var venueSelect = document.getElementById('filter-venue');
  var pubCount = document.getElementById('pub-count');
  var cards = document.querySelectorAll('.paper-card');

  if (!cards.length) return;

  var total = cards.length;

  function filterCards() {
    var search = (searchInput ? searchInput.value : '').toLowerCase();
    var year = yearSelect ? yearSelect.value : '';
    var venue = venueSelect ? venueSelect.value : '';
    var visible = 0;

    cards.forEach(function (card) {
      var matchYear = !year || card.getAttribute('data-year') === year;
      var matchVenue = !venue || card.getAttribute('data-venue') === venue;
      var matchSearch = true;
      if (search) {
        var text = card.textContent.toLowerCase();
        matchSearch = text.indexOf(search) !== -1;
      }

      if (matchYear && matchVenue && matchSearch) {
        card.removeAttribute('hidden');
        visible++;
      } else {
        card.setAttribute('hidden', '');
      }
    });

    if (pubCount) {
      pubCount.textContent = 'Showing ' + visible + ' of ' + total + ' publications';
    }
  }

  // Debounce search
  var searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(filterCards, 300);
    });
  }

  if (yearSelect) yearSelect.addEventListener('change', filterCards);
  if (venueSelect) venueSelect.addEventListener('change', filterCards);

})();
