const BASE_URL = "https://book-library-1fb71-default-rtdb.asia-southeast1.firebasedatabase.app";
let books = [];
let members = [];

// --- LOAD STATE FROM localStorage ---
let booksState = JSON.parse(localStorage.getItem('booksState')) || {
    filters: { search: '', genre: '', available: '', author: '' },
    sort: { key: 'title', dir: 'asc' } // keys: title, author, publishedYear
};
let membersState = JSON.parse(localStorage.getItem('membersState')) || {
    filters: { search: '', active: '', membershipDate: '' },
    sort: { key: 'name', dir: 'asc' } // keys: name, membershipDate
};

// --- FETCH DATA ---
function fetchBooks() {
    fetch(`${BASE_URL}/books.json`).then(r => r.json()).then(data => {
        books = toArray(data);
        renderBookGenres();
        renderBooks();
    });
}
function fetchMembers() {
    fetch(`${BASE_URL}/members.json`).then(r => r.json()).then(data => {
        members = toArray(data);
        renderMembers();
    });
}

// --- UTILITIES ---
function toArray(obj) {
    if (!obj) return [];
    return Object.keys(obj).map(key => ({ ...obj[key], dbKey: key }));
}
function persistState() {
    localStorage.setItem('booksState', JSON.stringify(booksState));
    localStorage.setItem('membersState', JSON.stringify(membersState));
}

// --- RENDER BOOKS ---
function renderBookGenres() {
    const select = document.getElementById('book-genre-filter');
    if (!select) return;
    const genres = Array.from(new Set(books.map(b => b.genre))).sort();
    select.innerHTML = `<option value="">All Genres</option>`;
    genres.forEach(g => {
        select.innerHTML += `<option value="${g}">${g}</option>`;
    });
}

function renderBooks() {
    let { search, genre, available } = booksState.filters;
    let { key, dir } = booksState.sort;
    let filtered = books.filter(b => {
        let matches = true;
        if (search)
            matches = (b.title?.toLowerCase().includes(search.toLowerCase()) || b.author?.toLowerCase().includes(search.toLowerCase()));
        if (matches && genre)
            matches = b.genre === genre;
        if (matches && available)
            matches = (String(b.available) === available);
        return matches;
    });
    if (key === 'publishedYear') {
        filtered.sort((a, b) => dir === 'asc' ? (a.publishedYear - b.publishedYear) : (b.publishedYear - a.publishedYear));
    } else {
        filtered.sort((a, b) => {
            let av = (a[key] || '').toString().toLowerCase(), bv = (b[key] || '').toString().toLowerCase();
            return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
        });
    }
    document.getElementById('books-list').innerHTML = filtered.map(b =>
        `<div class="book">
          <strong>${b.title}</strong> by ${b.author}<br>
          Genre: ${b.genre}, Year: ${b.publishedYear} <br>
          ${b.available ? '<span style="color:green">Available</span>' : '<span style="color:red">Unavailable</span>'}
          <button onclick="editBook('${b.dbKey}')">Edit</button>
          <button onclick="deleteBook('${b.dbKey}')">Delete</button>
        </div>`
    ).join('') || `<em>No books found.</em>`;
}

// --- RENDER MEMBERS ---
function renderMembers() {
    let { search, active } = membersState.filters;
    let { key, dir } = membersState.sort;
    let filtered = members.filter(m => {
        let matches = true;
        if (search && !m.name?.toLowerCase().includes(search.toLowerCase()))
            matches = false;
        if (matches && active)
            matches = String(m.active) === active;
        return matches;
    });
    if (key === 'membershipDate') {
        filtered.sort((a, b) => dir === 'asc'
            ? (new Date(a.membershipDate) - new Date(b.membershipDate))
            : (new Date(b.membershipDate) - new Date(a.membershipDate)));
    } else {
        filtered.sort((a, b) => {
            let av = (a[key] || '').toString().toLowerCase(), bv = (b[key] || '').toString().toLowerCase();
            return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
        });
    }
    document.getElementById('members-list').innerHTML = filtered.map(m =>
        `<div class="member">
          <strong>${m.name}</strong><br>
          Join: ${m.membershipDate} <br>
          ${m.active ? '<span style="color:green">Active</span>' : '<span style="color:red">Inactive</span>'}
          <button onclick="editMember('${m.dbKey}')">Edit</button>
          <button onclick="deleteMember('${m.dbKey}')">Delete</button>
        </div>`
    ).join('') || `<em>No members found.</em>`;
}

// ---- CRUD FUNCTIONS BOOKS ----
window.editBook = function (dbKey) {
    const b = books.find(x => x.dbKey === dbKey);
    if (!b) return;
    document.getElementById('book-id').value = dbKey;
    document.getElementById('book-title').value = b.title;
    document.getElementById('book-author').value = b.author;
    document.getElementById('book-genre').value = b.genre;
    document.getElementById('book-year').value = b.publishedYear;
    document.getElementById('book-available').value = String(b.available);
}

window.deleteBook = function(dbKey) {
    fetch(`${BASE_URL}/books/${dbKey}.json`, { method: 'DELETE' }).then(fetchBooks);
}

// ---- CRUD FUNCTIONS MEMBERS ----
window.editMember = function(dbKey) {
    const m = members.find(x => x.dbKey === dbKey);
    if (!m) return;
    document.getElementById('member-id').value = dbKey;
    document.getElementById('member-name').value = m.name;
    document.getElementById('member-date').value = m.membershipDate;
    document.getElementById('member-active').value = String(m.active);
};

window.deleteMember = function(dbKey) {
    fetch(`${BASE_URL}/members/${dbKey}.json`, { method: 'DELETE' }).then(fetchMembers);
}

// --- EVENT LISTENERS ---
// BOOKS
document.getElementById('book-search').addEventListener('input', (e) => {
    booksState.filters.search = e.target.value;
    persistState(); renderBooks();
});
document.getElementById('book-genre-filter').addEventListener('change', (e) => {
    booksState.filters.genre = e.target.value;
    persistState(); renderBooks();
});
document.getElementById('book-availability-filter').addEventListener('change', (e) => {
    booksState.filters.available = e.target.value;
    persistState(); renderBooks();
});
document.getElementById('book-sort').addEventListener('change', (e) => {
    let [key, dir] = e.target.value.split('-');
    booksState.sort = { key, dir };
    persistState(); renderBooks();
});
document.getElementById('book-form').addEventListener('submit', function(e){
    e.preventDefault();
    const id = document.getElementById('book-id').value;
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const genre = document.getElementById('book-genre').value;
    const year = Number(document.getElementById('book-year').value);
    const available = document.getElementById('book-available').value === "true";
    const body = { title, author, genre, publishedYear: year, available };
    if (id) {
        fetch(`${BASE_URL}/books/${id}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(() => { fetchBooks(); this.reset(); });
    } else {
        fetch(`${BASE_URL}/books.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(() => { fetchBooks(); this.reset(); });
    }
});

// MEMBERS
document.getElementById('member-search').addEventListener('input', (e) => {
    membersState.filters.search = e.target.value;
    persistState(); renderMembers();
});
document.getElementById('member-status-filter').addEventListener('change', (e) => {
    membersState.filters.active = e.target.value;
    persistState(); renderMembers();
});
document.getElementById('member-sort').addEventListener('change', (e) => {
    let [key, dir] = e.target.value.split('-');
    if (key === 'date') key = 'membershipDate';
    membersState.sort = { key, dir };
    persistState(); renderMembers();
});
document.getElementById('member-form').addEventListener('submit', function(e){
    e.preventDefault();
    const id = document.getElementById('member-id').value;
    const name = document.getElementById('member-name').value;
    const membershipDate = document.getElementById('member-date').value;
    const active = document.getElementById('member-active').value === "true";
    const body = { name, membershipDate, active };
    if (id) {
        fetch(`${BASE_URL}/members/${id}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(() => { fetchMembers(); this.reset(); });
    } else {
        fetch(`${BASE_URL}/members.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(() => { fetchMembers(); this.reset(); });
    }
});

// ---- INITIALIZE ----
window.onload = function() {
    fetchBooks();
    fetchMembers();
};
