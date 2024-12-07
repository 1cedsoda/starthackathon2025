export function getUsernameServerside(
  headersList: Headers
): string | undefined {
  // Get the 'Authorization' header
  const authHeader = headersList.get("authorization");

  // Check if the 'Authorization' header exists and starts with 'Bearer '
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token after 'Bearer '
    return authHeader.substring(7);
  } else {
    return undefined;
  }
}
