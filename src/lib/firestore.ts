// Firebase Firestore service layer
// All Firestore read/write operations for the app

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  increment,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

// ============ TOURNAMENTS ============

export async function getTournaments() {
  const snap = await getDocs(collection(db, "tournaments"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getTournament(id: string) {
  const snap = await getDoc(doc(db, "tournaments", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function addTournament(data: DocumentData) {
  return addDoc(collection(db, "tournaments"), { ...data, createdAt: serverTimestamp() });
}

export async function updateTournament(id: string, data: DocumentData) {
  return updateDoc(doc(db, "tournaments", id), data);
}

export async function deleteTournament(id: string) {
  return deleteDoc(doc(db, "tournaments", id));
}

// ============ REGISTRATIONS ============

export async function getRegistrations(tournamentId?: string) {
  const ref = collection(db, "registrations");
  const q = tournamentId
    ? query(ref, where("tournamentId", "==", tournamentId), orderBy("createdAt", "desc"))
    : query(ref, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addRegistration(data: DocumentData) {
  const docRef = await addDoc(collection(db, "registrations"), {
    ...data,
    createdAt: serverTimestamp(),
    status: "confirmed",
  });
  // Increment slot count
  if (data.tournamentId) {
    await updateDoc(doc(db, "tournaments", data.tournamentId), {
      currentSlots: increment(1),
    });
  }
  return docRef;
}

// ============ COUPONS ============

export async function getCoupons() {
  const snap = await getDocs(collection(db, "coupons"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function validateCoupon(code: string) {
  const q = query(collection(db, "coupons"), where("code", "==", code.toUpperCase()), where("active", "==", true));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as DocumentData & { id: string };
}

export async function addCoupon(data: DocumentData) {
  return addDoc(collection(db, "coupons"), { ...data, active: true, createdAt: serverTimestamp() });
}

export async function updateCoupon(id: string, data: DocumentData) {
  return updateDoc(doc(db, "coupons", id), data);
}

export async function deleteCoupon(id: string) {
  return deleteDoc(doc(db, "coupons", id));
}

// ============ LEADERBOARD ============

export async function getLeaderboard() {
  const q = query(collection(db, "leaderboard"), orderBy("points", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d, i) => ({ id: d.id, rank: i + 1, ...d.data() }));
}

export async function addLeaderboardEntry(data: DocumentData) {
  return addDoc(collection(db, "leaderboard"), data);
}

export async function updateLeaderboardEntry(id: string, data: DocumentData) {
  return updateDoc(doc(db, "leaderboard", id), data);
}

export async function deleteLeaderboardEntry(id: string) {
  return deleteDoc(doc(db, "leaderboard", id));
}

// ============ BLOG ============

export async function getBlogPosts() {
  const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addBlogPost(data: DocumentData) {
  return addDoc(collection(db, "blog"), { ...data, createdAt: serverTimestamp() });
}

export async function updateBlogPost(id: string, data: DocumentData) {
  return updateDoc(doc(db, "blog", id), data);
}

export async function deleteBlogPost(id: string) {
  return deleteDoc(doc(db, "blog", id));
}
