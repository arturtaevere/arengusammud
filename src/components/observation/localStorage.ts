
// Functions for localStorage
export const getLastObservedTeacher = (): string | null => {
  return localStorage.getItem('lastObservedTeacher');
};

export const saveLastObservedTeacher = (teacherName: string): void => {
  localStorage.setItem('lastObservedTeacher', teacherName);
};
