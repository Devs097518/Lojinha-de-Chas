import { writable } from 'svelte/store';

export const userCode = writable("");
export const userInfo = writable<any[]>([]);
export const sacola = writable<any[]>([]);