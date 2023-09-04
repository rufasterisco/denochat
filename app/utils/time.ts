export function formatTimestampToRelativeTime(timestamp: Date) {
  const now = new Date();

  const timeDiffInMilliseconds: number = now.getTime() -
    timestamp.getTime();
  const timeDiffInMinutes = Math.floor(timeDiffInMilliseconds / (1000 * 60));

  if (timeDiffInMinutes < 60) {
    return `${timeDiffInMinutes} minutes ago`;
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const timeString = new Intl.DateTimeFormat("en-US", options).format(
    timestamp,
  );

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isYesterday = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() + 1 === d2.getDate();

  if (isSameDay(now, timestamp)) {
    return `Today at ${timeString}`;
  } else if (isYesterday(timestamp, now)) {
    return `Yesterday at ${timeString}`;
  } else {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(timestamp);
  }
}

// Example usage:
const date = new Date();
console.log(formatTimestampToRelativeTime(date)); // Output: "0 minutes ago"

const someMinutesAgo = new Date(Date.now() - 55 * 60 * 1000);
console.log(formatTimestampToRelativeTime(someMinutesAgo)); // Output: "55 minutes ago"

const earlierToday = new Date();
earlierToday.setHours(earlierToday.getHours() - 3);
console.log(formatTimestampToRelativeTime(earlierToday)); // Output: "Today at XX:XX"

const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
console.log(formatTimestampToRelativeTime(yesterday)); // Output: "Yesterday at XX:XX"

const someDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
console.log(formatTimestampToRelativeTime(someDaysAgo)); // Output: "Aug 30 at XX:XX" (date will vary)
