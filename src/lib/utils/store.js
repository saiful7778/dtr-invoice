"use client";

export function getValue(fieldName) {
  return localStorage.getItem(fieldName);
}

export function setValue(fieldName, fieldValue) {
  return localStorage.setItem(fieldName, fieldValue);
}
