import { TOURS_DATA } from '../data/tours.js';

const TOURS_STORAGE_KEY = 'viettour_admin_tours';
const BOOKINGS_STORAGE_KEY = 'viettour_admin_bookings';

const INITIAL_BOOKINGS = [
  {
    id: 'BK-1001',
    customerName: 'Nguyễn Văn An',
    phone: '0912 345 678',
    email: 'an.nguyen@gmail.com',
    tourTitle: 'Tour Khám Phá Vịnh Hạ Long - Du Thuyền 5 Sao',
    tourId: 1,
    departDate: '2026-10-15',
    guests: 2,
    totalPrice: 7780000,
    status: 'pending', // pending, confirmed, cancelled
    createdAt: '2026-09-20 14:30'
  },
  {
    id: 'BK-1002',
    customerName: 'Trần Thị Mai',
    phone: '0988 765 432',
    email: 'mai.tran@hotmail.com',
    tourTitle: 'Nghỉ Dưỡng Đảo Ngọc Phú Quốc - Sunset Town',
    tourId: 2,
    departDate: '2026-10-20',
    guests: 4,
    totalPrice: 21160000,
    status: 'confirmed',
    createdAt: '2026-09-19 09:15'
  },
  {
    id: 'BK-1003',
    customerName: 'Lê Hoàng Long',
    phone: '0903 112 233',
    email: 'long.le@yahoo.com',
    tourTitle: 'Hành Trình Di Sản Đà Nẵng - Hội An - Bà Nà Hills',
    tourId: 3,
    departDate: '2026-11-05',
    guests: 2,
    totalPrice: 6900000,
    status: 'confirmed',
    createdAt: '2026-09-18 16:45'
  },
  {
    id: 'BK-1004',
    customerName: 'Phạm Minh Đức',
    phone: '0934 556 789',
    email: 'duc.pm@gmail.com',
    tourTitle: 'Săn Mây Sa Pa - Chinh Phục Đỉnh Fansipan',
    tourId: 4,
    departDate: '2026-09-28',
    guests: 1,
    totalPrice: 2690000,
    status: 'cancelled',
    createdAt: '2026-09-17 11:20'
  }
];

// --- TOURS SERVICE ---
export function getTours() {
  const data = localStorage.getItem(TOURS_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(TOURS_DATA));
    return [...TOURS_DATA];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [...TOURS_DATA];
  }
}

export function saveTours(tours) {
  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(tours));
}

export function addTour(tourData) {
  const tours = getTours();
  const newTour = {
    ...tourData,
    id: Date.now(),
    rating: tourData.rating || 5.0,
    reviews: 0,
    priceFormatted: Number(tourData.price).toLocaleString('vi-VN') + ' đ'
  };
  tours.unshift(newTour);
  saveTours(tours);
  return newTour;
}

export function updateTour(id, updatedFields) {
  const tours = getTours();
  const index = tours.findIndex(t => t.id === Number(id));
  if (index !== -1) {
    if (updatedFields.price) {
      updatedFields.priceFormatted = Number(updatedFields.price).toLocaleString('vi-VN') + ' đ';
    }
    tours[index] = { ...tours[index], ...updatedFields };
    saveTours(tours);
    return tours[index];
  }
  return null;
}

export function deleteTour(id) {
  let tours = getTours();
  tours = tours.filter(t => t.id !== Number(id));
  saveTours(tours);
}

// --- BOOKINGS SERVICE ---
export function getBookings() {
  const data = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS));
    return [...INITIAL_BOOKINGS];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [...INITIAL_BOOKINGS];
  }
}

export function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
}

export function updateBookingStatus(id, newStatus) {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = newStatus;
    saveBookings(bookings);
    return bookings[index];
  }
  return null;
}

export function deleteBooking(id) {
  let bookings = getBookings();
  bookings = bookings.filter(b => b.id !== id);
  saveBookings(bookings);
}

// --- STATS HELPER ---
export function getStats() {
  const tours = getTours();
  const bookings = getBookings();

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const pendingBookings = bookings.filter(b => b.status === 'pending').length;

  return {
    totalTours: tours.length,
    totalBookings: bookings.length,
    pendingBookings,
    totalRevenue
  };
}
