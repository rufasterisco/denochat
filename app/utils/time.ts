const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;

const isSameDay = (d1: Date, d2: Date): boolean => (
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate()
);

const isYesterday = (d1: Date, d2: Date): boolean => (
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() + 1 === d2.getDate()
);

export function formatTimestampToRelativeTime(timestamp: Date): string {
  const now = new Date();
  const timeDiffInMilliseconds = now.getTime() - timestamp.getTime();
  const timeDiffInMinutes = Math.floor(
    timeDiffInMilliseconds / (MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE),
  );

  if (timeDiffInMinutes < 1) {
    return "Just now";
  }

  if (timeDiffInMinutes < MINUTES_IN_AN_HOUR) {
    return `${timeDiffInMinutes} minutes ago`;
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const timeString = new Intl.DateTimeFormat("en-US", timeOptions).format(
    timestamp,
  );

  if (isSameDay(now, timestamp)) {
    return `Today at ${timeString}`;
  }

  if (isYesterday(timestamp, now)) {
    return `Yesterday at ${timeString}`;
  }

  const fullOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", fullOptions).format(timestamp);
}

// these examples could be turned into tests

// const date = new Date();
// console.log(formatTimestampToRelativeTime(date)); // Output: "0 minutes ago"

// const someMinutesAgo = new Date(Date.now() - 55 * 60 * 1000);
// console.log(formatTimestampToRelativeTime(someMinutesAgo)); // Output: "55 minutes ago"

// const earlierToday = new Date();
// earlierToday.setHours(earlierToday.getHours() - 3);
// console.log(formatTimestampToRelativeTime(earlierToday)); // Output: "Today at XX:XX"

// const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
// console.log(formatTimestampToRelativeTime(yesterday)); // Output: "Yesterday at XX:XX"

// const someDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
// console.log(formatTimestampToRelativeTime(someDaysAgo)); // Output: "Aug 30 at XX:XX" (date will vary)
