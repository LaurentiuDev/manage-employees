import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService<T extends { id: string }> {
  public getAll(key: string): Observable<T[]> {
    const localStorageItem = localStorage.getItem(key);
    if (localStorageItem) {
      return of(JSON.parse(localStorageItem));
    }
    return of([]);
  }

  public add(key: string, object: T): Observable<T> {
    const localStorageItem = localStorage.getItem(key) ?? '';
    const items = !localStorageItem ? [] : JSON.parse(localStorageItem);
    items.push({ ...object, id: uuid.v4() });
    localStorage.setItem(key, JSON.stringify(items));
    return of(object);
  }

  public update(key: string, object: T): Observable<T> {
    const localStorageItem = localStorage.getItem(key) ?? '';
    const items = JSON.parse(localStorageItem);
    const updatedItems = items.map((item: T) => item.id === object.id ? object : item);
    localStorage.setItem('employees', JSON.stringify(updatedItems))
    return of(object);
  }

  public delete(key: string, id: string): Observable<string> {
    const localStorageItem = localStorage.getItem(key) ?? '';
    const items = JSON.parse(localStorageItem);
    const updatedItems = items.filter((item: T) => item.id !== id);
    localStorage.setItem('employees', JSON.stringify(updatedItems));
    return of(id);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
