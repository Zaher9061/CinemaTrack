const RAW = [
  ['Начало', 2010, 'Кристофер Нолан', ['Фантастика', 'Триллер'], 148, 'movie', 'watched'],
  ['Интерстеллар', 2014, 'Кристофер Нолан', ['Фантастика', 'Драма'], 169, 'movie', 'watched'],
  ['Побег из Шоушенка', 1994, 'Фрэнк Дарабонт', ['Драма'], 142, 'movie', 'watched'],
  ['Крёстный отец', 1972, 'Фрэнсис Форд Коппола', ['Криминал', 'Драма'], 175, 'movie', 'watched'],
  ['Матрица', 1999, 'Лана и Лилли Вачовски', ['Фантастика', 'Боевик'], 136, 'movie', 'watched'],
  ['Бойцовский клуб', 1999, 'Дэвид Финчер', ['Драма', 'Триллер'], 139, 'movie', 'watched'],
  ['Форрест Гамп', 1994, 'Роберт Земекис', ['Драма', 'Комедия'], 142, 'movie', 'watched'],
  ['Остров проклятых', 2010, 'Мартин Скорсезе', ['Триллер', 'Детектив'], 138, 'movie', 'watched'],
  ['Гладиатор', 2000, 'Ридли Скотт', ['Боевик', 'Драма'], 155, 'movie', 'watched'],
  ['Престиж', 2006, 'Кристофер Нолан', ['Драма', 'Детектив'], 130, 'movie', 'watched'],
  ['Паразиты', 2019, 'Пон Джун-хо', ['Триллер', 'Драма'], 132, 'movie', 'watched'],
  ['Довод', 2020, 'Кристофер Нолан', ['Фантастика', 'Боевик'], 150, 'movie', 'watched'],

  ['Во все тяжкие', 2008, 'Винс Гиллиган', ['Криминал', 'Драма'], 47, 'series', 'watching'],
  ['Шерлок', 2010, 'Марк Гэтисс', ['Детектив', 'Драма'], 88, 'series', 'watching'],
  ['Игра престолов', 2011, 'Дэвид Бениофф', ['Фэнтези', 'Драма'], 57, 'series', 'watching'],
  ['Чернобыль', 2019, 'Йохан Ренк', ['Драма', 'История'], 65, 'series', 'watching'],
  ['Дюна', 2021, 'Дени Вильнёв', ['Фантастика', 'Приключения'], 155, 'movie', 'watching'],
  ['Оппенгеймер', 2023, 'Кристофер Нолан', ['Драма', 'История'], 180, 'movie', 'watching'],

  ['Бегущий по лезвию 2049', 2017, 'Дени Вильнёв', ['Фантастика', 'Драма'], 164, 'movie', 'planned'],
  ['Малхолланд Драйв', 2001, 'Дэвид Линч', ['Триллер', 'Драма'], 147, 'movie', 'planned'],
  ['Помни', 2000, 'Кристофер Нолан', ['Триллер', 'Детектив'], 113, 'movie', 'planned'],
  ['Властелин колец: Братство кольца', 2001, 'Питер Джексон', ['Фэнтези', 'Приключения'], 178, 'movie', 'planned'],
  ['Тёмный рыцарь', 2008, 'Кристофер Нолан', ['Боевик', 'Криминал'], 152, 'movie', 'planned'],
  ['Джокер', 2019, 'Тодд Филлипс', ['Драма', 'Криминал'], 122, 'movie', 'planned'],
  ['Хороший, плохой, злой', 1966, 'Серджо Леоне', ['Вестерн'], 161, 'movie', 'planned'],
  ['Таксист', 1976, 'Мартин Скорсезе', ['Драма', 'Криминал'], 114, 'movie', 'planned'],
  ['Амели', 2001, 'Жан-Пьер Жёне', ['Комедия', 'Романтика'], 122, 'movie', 'planned'],
  ['Артист', 2011, 'Мишель Хазанавичус', ['Драма', 'Комедия'], 100, 'movie', 'planned'],

  ['Заводной апельсин', 1971, 'Стэнли Кубрик', ['Драма', 'Криминал'], 136, 'movie', 'recommended'],
  ['Сияние', 1980, 'Стэнли Кубрик', ['Ужасы', 'Триллер'], 146, 'movie', 'recommended'],
  ['Прибытие', 2016, 'Дени Вильнёв', ['Фантастика', 'Драма'], 116, 'movie', 'recommended'],
  ['Выживший', 2015, 'Алехандро Иньярриту', ['Драма', 'Приключения'], 156, 'movie', 'recommended'],
  ['Достать ножи', 2019, 'Райан Джонсон', ['Детектив', 'Комедия'], 130, 'movie', 'recommended'],
  ['Ла-Ла Ленд', 2016, 'Дэмьен Шазелл', ['Мюзикл', 'Романтика'], 128, 'movie', 'recommended'],
  ['Одержимость', 2014, 'Дэмьен Шазелл', ['Драма', 'Музыка'], 106, 'movie', 'recommended'],

  ['Кольца власти', 2022, 'Джей Ди Пэйн', ['Фэнтези', 'Приключения'], 60, 'series', 'dropped'],
];

const FRIENDS = [
  { name: 'Алексей Орлов', email: 'orlov@example.com', phone: '+7 900 111-22-33' },
  { name: 'Мария Ковальская', email: 'maria.k@example.com', phone: '+48 600 123 456' },
  { name: 'Дмитрий Лебедев', email: 'lebedev@example.com', phone: '+7 911 222-33-44' },
  { name: 'Анна Соколова', email: 'a.sokolova@example.com', phone: '+375 29 555-66-77' },
  { name: 'Игорь Бондарь', email: 'bondar@example.com', phone: '+380 50 777-88-99' },
];

const PLACES = [
  { country: 'Россия', city: 'Москва', street: 'ул. Тверская, 12', latitude: 55.7558, longitude: 37.6173 },
  { country: 'Россия', city: 'Санкт-Петербург', street: 'Невский пр., 45', latitude: 59.9343, longitude: 30.3351 },
  { country: 'Беларусь', city: 'Минск', street: 'пр. Независимости, 18', latitude: 53.9006, longitude: 27.559 },
  { country: 'Польша', city: 'Варшава', street: 'ul. Marszałkowska 104', latitude: 52.2297, longitude: 21.0122 },
  { country: 'Украина', city: 'Киев', street: 'ул. Хрещатик, 22', latitude: 50.4501, longitude: 30.5234 },
  { country: 'Казахстан', city: 'Алматы', street: 'пр. Абая, 60', latitude: 43.222, longitude: 76.8512 },
];

const PRIORITIES = ['low', 'medium', 'high'];

const FLOW = ['recommended', 'planned', 'watching', 'watched'];

const dateFor = (index, offsetDays) =>
  new Date(Date.UTC(2026, 0, 5 + index * 3 + offsetDays, 12, 0, 0)).toISOString();

function buildHistory(index, status) {
  if (status === 'dropped') {
    return [
      { status: 'planned', changedAt: dateFor(index, 0), comment: 'Добавлено в список' },
      { status: 'watching', changedAt: dateFor(index, 4), comment: 'Начал смотреть' },
      { status: 'dropped', changedAt: dateFor(index, 9), comment: 'Не зашло, бросил' },
    ];
  }
  const comments = {
    recommended: 'Посоветовал друг',
    planned: 'Добавлено в список',
    watching: 'Начал смотреть',
    watched: 'Досмотрел',
  };
  const last = FLOW.indexOf(status);
  return FLOW.slice(0, last + 1).map((s, step) => ({
    status: s,
    changedAt: dateFor(index, step * 5),
    comment: comments[s],
  }));
}

function buildMovie(row, index) {
  const [title, year, director, genres, durationMinutes, type, status] = row;
  const place = PLACES[index % PLACES.length];
  const id = `movie-${String(index + 1).padStart(2, '0')}`;

  let progress = 0;
  if (status === 'watched') progress = 1;
  if (status === 'watching') progress = 0.15 + (index % 5) * 0.15;
  if (status === 'dropped') progress = 0.2;

  return {
    id,
    title,
    year,
    type,
    genres,
    director,
    durationMinutes,
    status,
    priority: PRIORITIES[(index * 7) % 3],
    progress: Number(progress.toFixed(2)),
    rating: status === 'watched' ? 7 + (index % 4) : null,
    notes: '',
    recommendedBy: FRIENDS[index % FRIENDS.length],
    location: {
      address: {
        country: place.country,
        city: place.city,
        street: place.street,
      },
      coordinates: {
        latitude: place.latitude,
        longitude: place.longitude,
      },
    },
    statusHistory: buildHistory(index, status),
    photos: [
      { id: `${id}-p1`, uri: `https://picsum.photos/seed/${id}-a/400/600` },
      { id: `${id}-p2`, uri: `https://picsum.photos/seed/${id}-b/600/400` },
    ],
    createdAt: dateFor(index, 0),
    updatedAt: dateFor(index, 10),
  };
}

export const MOCK_MOVIES = RAW.map(buildMovie);
