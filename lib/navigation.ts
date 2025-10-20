export function handlePrevTab(
  tab: string,
  currentMonth: number,
  setCurrentMonth: (cb: (m: number) => number) => void,
  setCurrentYear: (cb: (y: number) => number) => void,
  setCurrentMonthlyYear: (cb: (y: number) => number) => void
) {
  if (tab === "daily" || tab === "calendar") {
    if (currentMonth === 0) {
      setCurrentMonth(() => 11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  } else if (tab === "monthly") {
    setCurrentMonthlyYear((y) => y - 1);
  }
}

export function handleNextTab(
  tab: string,
  currentMonth: number,
  setCurrentMonth: (cb: (m: number) => number) => void,
  setCurrentYear: (cb: (y: number) => number) => void,
  setCurrentMonthlyYear: (cb: (y: number) => number) => void
) {
  if (tab === "daily" || tab === "calendar") {
    if (currentMonth === 11) {
      setCurrentMonth(() => 0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  } else if (tab === "monthly") {
    setCurrentMonthlyYear((y) => y + 1);
  }
}
