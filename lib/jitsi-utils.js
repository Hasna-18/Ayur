/**
 * Jitsi utility functions for generating room names and expiry times
 */

export const generateJitsiRoomName = (appointmentId) => {
  const suffix = Math.random().toString(36).slice(2, 10);
  return `meet-${appointmentId}-${suffix}`;
};

export const getJitsiRoomExpiry = (appointmentTime) => {
  if (!appointmentTime) return null;
  const expiresAt = new Date(appointmentTime);
  expiresAt.setHours(expiresAt.getHours() + 12);
  return expiresAt.toISOString();
};

export const isJitsiRoomActive = (appointmentTime) => {
  if (!appointmentTime) return false;
  const expiresAt = new Date(appointmentTime);
  expiresAt.setHours(expiresAt.getHours() + 12);
  return new Date() <= expiresAt;
};

export const getJitsiLink = (roomName) => {
  return `https://meet.jit.si/${roomName}`;
};
