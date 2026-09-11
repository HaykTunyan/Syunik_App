/**
 * ElevenLabs agent IDs are public identifiers, not API keys. Keep API keys and
 * private conversation tokens on a server; never place them in the mobile app.
 */
export const ELEVENLABS_AGENT_ID = '';

export const isElevenLabsConfigured = ELEVENLABS_AGENT_ID.startsWith('agent_');
