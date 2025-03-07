
export async function fetchPlayerUsername(playerId: string): Promise<string | null> {
  try {
    console.log(`Fetching username for player ID: ${playerId}`);
    
    // Simulating API call to PUBG servers (in a real app, you would use actual PUBG API)
    // Note: PUBG official API requires authentication and API key
    
    // Simulated delay to mimic network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // For demo purposes: Generate a username based on player ID
    // This is just a simulation - in a real app, you would parse the API response
    
    if (playerId.length < 6) {
      return null;
    }
    
    // Common PUBG usernames (for demonstration)
    const prefixes = ['PUBG_', 'Elite_', 'Pro_', 'Sniper_', 'Ghost_', 'Legend_', 'Warrior_'];
    const suffixes = ['Player', 'Killer', 'Gamer', 'Boss', 'King', 'Master', 'Shooter'];
    
    // Use the player ID to deterministically generate a username
    const hash = Array.from(playerId).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const prefix = prefixes[hash % prefixes.length];
    const suffix = suffixes[(hash * 13) % suffixes.length];
    
    // Use characters from the ID to make it look related to the ID
    const idPart = playerId.substring(0, 4);
    
    const username = `${prefix}${idPart}${suffix}`;
    
    console.log(`Username retrieved: ${username} for player ID: ${playerId}`);
    return username;
  } catch (error) {
    console.error("Error fetching player username:", error);
    return null;
  }
}
