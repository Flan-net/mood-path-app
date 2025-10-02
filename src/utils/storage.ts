import { DailyEntry } from "@/types/wellness";

const STORAGE_KEY = "wellness_entries";

export const saveEntry = (entry: DailyEntry): void => {
  const entries = getEntries();
  const existingIndex = entries.findIndex(e => e.date === entry.date);
  
  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const getEntries = (): DailyEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getEntryByDate = (date: string): DailyEntry | undefined => {
  const entries = getEntries();
  return entries.find(e => e.date === date);
};

export const getEntriesLast30Days = (): DailyEntry[] => {
  const entries = getEntries();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return entries
    .filter(e => new Date(e.date) >= thirtyDaysAgo)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
