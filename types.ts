// Fix: Import React to make React types like React.ReactNode available.
import React from 'react';

export interface NavItemType {
  icon: React.ReactNode;
  label: string;
  isHeader?: boolean;
}

export enum StatCardColor {
  Green = 'green',
  Yellow = 'yellow',
  Red = 'red',
}

export interface StatCardProps {
  value: number;
  label: string;
  color: StatCardColor;
  icon: React.ReactNode;
}

export interface Student {
  id: number;
  name: string;
  class: string;
  points: number;
  photo?: string;
  gender?: 'male' | 'female';
}

export interface Guru {
  id: number;
  name: string;
  position: string;
  username: string;
  password?: string | number;
  gender?: 'male' | 'female';
}

export enum UserRole {
  Admin = 'Admin',
  GuruBK = 'Guru BK',
  GuruMapel = 'Guru Mapel',
  Siswa = 'Siswa',
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
  username: string;
  avatar?: string;
  gender?: 'male' | 'female';
}

// Added for Student Profile Page
export interface AchievementLog {
  id: number;
  date: string;
  description: string;
  points: number;
}

export interface ViolationLog {
  id: number;
  date: string;
  description: string;
  points: number; // Will be negative
}

export interface PointLog {
  id: number; // Will use timestamp for uniqueness
  studentId: number;
  studentName: string;
  studentClass: string;
  type: 'prestasi' | 'pelanggaran';
  description: string;
  points: number;
  recordedBy: string; // Name of the user/teacher who recorded it
  date: string; // ISO string date
}