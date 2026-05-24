/**
 * Builds a display name for an invitation envelope from party members.
 *
 * Rules:
 * - Takes the first 2 members only (kids/extras fill in at RSVP step)
 * - 1 member:                  "Eli Minsky"
 * - 2 members, same last name: "Frank and Helen Risch"
 * - 2 members, diff last name: "Eli Minsky and Naomi Alsberg"
 *
 * CSV order controls display order — list male partner first in the CSV
 * for traditional ordering.
 */
export function buildPartyDisplayName(
  members: { first_name: string; last_name: string }[]
): string {
  const [a, b] = members.slice(0, 2);
  if (!a) return '';
  if (!b) return `${a.first_name} ${a.last_name}`;

  if (a.last_name.toLowerCase() === b.last_name.toLowerCase()) {
    return `${a.first_name} and ${b.first_name} ${a.last_name}`;
  }
  return `${a.first_name} ${a.last_name} and ${b.first_name} ${b.last_name}`;
}
