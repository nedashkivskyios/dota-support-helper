export const formatTime = (seconds: number) => {
    // Визначте, чи відлік від'ємний
    const isNegative = seconds < 0;

    // Перетворіть від'ємний час на позитивний для розрахунків
    const absoluteSeconds = Math.abs(seconds);

    const minutes = Math.floor(absoluteSeconds / 60);
    const remainingSeconds = absoluteSeconds % 60;

    // Використовуйте string interpolation або конкатенацію для форматування результату
    const formattedTime = `${isNegative ? '-' : ''}${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    return formattedTime;
  }