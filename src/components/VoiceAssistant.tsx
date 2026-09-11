import React, {createContext, useCallback, useContext, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ConversationProvider, useConversation} from '@elevenlabs/react-native';
import {ELEVENLABS_AGENT_ID, isElevenLabsConfigured} from '../config/elevenLabs';
import {
  resolveSyunikDestination,
  supportedDestinationNames,
  type AssistantDestination,
} from '../data/assistantLocations';
import Icon from 'react-native-vector-icons/MaterialIcons';


export type AssistantPageContext = {
  page: string;
  title: string;
  detail?: string;
};

type TranscriptLine = {
  id: string;
  role: 'user' | 'agent';
  text: string;
};

type VoiceAssistantContextValue = {
  openAssistant: (context: AssistantPageContext) => void;
  updatePageContext: (context: AssistantPageContext) => void;
};

const VoiceAssistantContext = createContext<VoiceAssistantContextValue | null>(null);

type VoiceAssistantProviderProps = {
  children: React.ReactNode;
  onNavigate: (destination: AssistantDestination) => void;
};

export function VoiceAssistantProvider({children, onNavigate}: VoiceAssistantProviderProps) {
  return (
    <ConversationProvider agentId={ELEVENLABS_AGENT_ID}>
      <VoiceAssistantController onNavigate={onNavigate}>{children}</VoiceAssistantController>
    </ConversationProvider>
  );
}

/** Opens the assistant from any page while keeping one live conversation session. */
export function useVoiceAssistant() {
  const context = useContext(VoiceAssistantContext);
  if (!context) {
    throw new Error('useVoiceAssistant must be used inside VoiceAssistantProvider.');
  }
  return context;
}

function formatPageContext(context: AssistantPageContext) {

  return context.detail ? `${context.title}. ${context.detail}` : context.title;
}

function VoiceAssistantController({children, onNavigate}: VoiceAssistantProviderProps) {

  const [isVisible, setIsVisible] = useState(false);
  const [pageContext, setPageContext] = useState<AssistantPageContext>({
    page: 'home',
    title: 'Syunik Dreams home',
  });
  const pageContextRef = useRef(pageContext);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [localMessage, setLocalMessage] = useState<string>();
  const conversationRef = useRef<ReturnType<typeof useConversation> | null>(null);

  const moveToDestination = useCallback(
    (destination: AssistantDestination) => {
      const nextContext: AssistantPageContext = {
        page: destination.kind,
        title: `Viewing ${destination.title}`,
        detail: destination.context,
      };
      pageContextRef.current = nextContext;
      setPageContext(nextContext);
      onNavigate(destination);
      return `Opened ${destination.title}. The visitor is now viewing: ${destination.context}`;
    },
    [onNavigate],
  );

  const conversation = useConversation({
    clientTools: {
      // Configure these exact tool names on the ElevenLabs Agent dashboard.
      navigate_to_syunik_location: (parameters: {destination?: string; location?: string; query?: string}) => {
        const request = parameters.destination ?? parameters.location ?? parameters.query ?? '';
        const destination = resolveSyunikDestination(request);
        if (!destination) {
          return `I could not find "${request}" in Syunik Dreams. Ask the visitor a short follow-up question.`;
        }
        return moveToDestination(destination);
      },
      get_current_page_context: () => formatPageContext(pageContextRef.current),
    },
    onMessage: message => {
      setTranscript(current => {
        const next = [...current, {id: `${message.role}-${message.event_id ?? Date.now()}-${current.length}`, role: message.role, text: message.message}];
        return next.slice(-12);
      });

      // Navigation is also resolved locally from the visitor's completed speech.
      // This makes place navigation dependable even if the agent has not elected
      // to call its client tool for a particular phrasing.
      if (message.role === 'user') {
        const destination = resolveSyunikDestination(message.message);
        if (destination) {
          moveToDestination(destination);
        }
      }
    },
    onError: error => setLocalMessage(error),
    onUnhandledClientToolCall: tool =>
      setLocalMessage(`The agent requested an unavailable action: ${tool.tool_name}.`),
  });
  conversationRef.current = conversation;

  const updatePageContext = useCallback((context: AssistantPageContext) => {
    const previousContext = pageContextRef.current;
    const changed = formatPageContext(previousContext) !== formatPageContext(context);
    pageContextRef.current = context;

    if (previousContext.page !== context.page || previousContext.title !== context.title || previousContext.detail !== context.detail) {
      setPageContext(context);
    }

    if (changed && conversationRef.current?.status === 'connected') {
      conversationRef.current.sendContextualUpdate(`The visitor is now on: ${formatPageContext(context)}.`);
    }
  }, []);

  const openAssistant = useCallback(
    (context: AssistantPageContext) => {
      updatePageContext(context);
      setIsVisible(true);
    },
    [updatePageContext],
  );

  const startConversation = () => {
    if (!isElevenLabsConfigured) {
      setLocalMessage('Add your ElevenLabs Agent ID in src/config/elevenLabs.ts before starting a voice conversation.');
      return;
    }

    setLocalMessage(undefined);
    setTranscript([]);
    conversation.startSession({
      dynamicVariables: {
        current_page: pageContextRef.current.title,
        current_page_context: formatPageContext(pageContextRef.current),
        supported_destinations: supportedDestinationNames.join(', '),
      },
    });
  };

  const endConversation = () => {
    conversation.endSession();
    setIsVisible(false);
  };

  const contextValue = useMemo(
    () => ({openAssistant, updatePageContext}),
    [openAssistant, updatePageContext],
  );

  const isConnecting = conversation.status === 'connecting';
  const isConnected = conversation.status === 'connected';
  const statusText = isConnecting
    ? 'Connecting to your guide…'
    : isConnected
      ? conversation.isSpeaking
        ? 'Your guide is speaking'
        : 'Listening — speak naturally'
      : 'Ready when you are';

  return (
    <VoiceAssistantContext.Provider value={contextValue}>
      {children}
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}>
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setIsVisible(false)}
            accessibilityRole="button"
            accessibilityLabel="Minimize AI Assistant"
          />
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.eyebrow}>SYUNIK DREAMS</Text>
                <Text style={styles.title}>AI Tourist Assistant</Text>
              </View>
              <Pressable
                onPress={() => setIsVisible(false)}
                style={styles.minimizeButton}
                accessibilityRole="button"
                accessibilityLabel="Minimize AI Assistant">
               <Icon name="chat-bubble-outline" size={20} color="#000" />
              </Pressable>
            </View>

            <View style={styles.contextCard}>
              <Text style={styles.contextLabel}>CURRENT APP CONTEXT</Text>
              <Text style={styles.contextTitle}>{pageContext.title}</Text>
              {!!pageContext.detail && <Text style={styles.contextDetail}>{pageContext.detail}</Text>}
            </View>

            <View style={styles.statusRow}>
              <View style={[styles.statusDot, isConnected && styles.statusDotActive]} />
              <Text style={styles.statusText}>{statusText}</Text>
            </View>

            {!isConnected ? (
              <Pressable
                onPress={startConversation}
                disabled={isConnecting}
                style={({pressed}) => [styles.startButton, (pressed || isConnecting) && styles.buttonPressed]}
                accessibilityRole="button"
                accessibilityLabel="Start conversation with the AI tourist assistant">
                {isConnecting ? <ActivityIndicator color="#fff" /> : <Text style={styles.micIcon}>🎙</Text>}
                <Text style={styles.startButtonText}>{isConnecting ? 'Starting…' : 'Start conversation'}</Text>
              </Pressable>
            ) : (
              <View style={styles.liveActions}>
                <Pressable
                  onPress={() => conversation.setMuted(!conversation.isMuted)}
                  style={styles.muteButton}
                  accessibilityRole="button"
                  accessibilityLabel={conversation.isMuted ? 'Unmute microphone' : 'Mute microphone'}>
                  <Text style={styles.muteButtonText}>{conversation.isMuted ? 'Unmute mic' : 'Mute mic'}</Text>
                </Pressable>
                <Pressable
                  onPress={endConversation}
                  style={styles.endButton}
                  accessibilityRole="button"
                  accessibilityLabel="End AI assistant conversation">
                  <Text style={styles.endButtonText}>End conversation</Text>
                </Pressable>
              </View>
            )}

            {!!localMessage && <Text style={styles.notice}>{localMessage}</Text>}

            <ScrollView contentContainerStyle={styles.transcript} showsVerticalScrollIndicator={false}>
              {transcript.length === 0 ? (
                <Text style={styles.emptyTranscript}>
                  Ask about places, roads, routes, landmarks, or history in Syunik. I’ll open the relevant details as we talk.
                </Text>
              ) : (
                transcript.map(line => (
                  <View key={line.id} style={[styles.messageBubble, line.role === 'user' ? styles.userBubble : styles.agentBubble]}>
                    <Text style={styles.messageRole}>{line.role === 'user' ? 'YOU' : 'GUIDE'}</Text>
                    <Text style={styles.messageText}>{line.text}</Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </VoiceAssistantContext.Provider>
  );
}

const styles = StyleSheet.create({
  modalRoot: {flex: 1, justifyContent: 'flex-end'},
  backdrop: {...StyleSheet.absoluteFill, backgroundColor: 'rgba(20, 31, 20, 0.42)'},
  sheet: {maxHeight: '84%', minHeight: 520, backgroundColor: '#f8f3ea', borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 20, paddingBottom: 24},
  handle: {alignSelf: 'center', width: 42, height: 5, borderRadius: 3, backgroundColor: '#c8c1b4', marginTop: 10, marginBottom: 15},
  headerRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  eyebrow: {fontSize: 10, fontWeight: '800', color: '#70845e', letterSpacing: 1.2},
  title: {marginTop: 3, fontSize: 24, fontWeight: '800', color: '#2f3e2f'},
  minimizeButton: {width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 19, backgroundColor: '#e7eee1', borderColor: '#d0d9c8', borderWidth: 1},
  minimizeText: {fontSize: 26, lineHeight: 27, color: '#375a37', fontWeight: '700'},
  contextCard: {marginTop: 16, padding: 14, borderRadius: 15, backgroundColor: '#e8f0e2', borderWidth: 1, borderColor: '#d4e0cc'},
  contextLabel: {fontSize: 10, fontWeight: '800', color: '#64805a', letterSpacing: 0.8},
  contextTitle: {marginTop: 4, color: '#2f3e2f', fontSize: 15, fontWeight: '800'},
  contextDetail: {marginTop: 4, color: '#4d6149', fontSize: 12, lineHeight: 17},
  statusRow: {flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 15, marginBottom: 11},
  statusDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: '#9aa58c'},
  statusDotActive: {backgroundColor: '#4d813e'},
  statusText: {fontSize: 13, fontWeight: '700', color: '#53634d'},
  startButton: {height: 58, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#385c36'},
  buttonPressed: {opacity: 0.75},
  micIcon: {fontSize: 21},
  startButtonText: {fontSize: 16, fontWeight: '800', color: '#fff'},
  liveActions: {flexDirection: 'row', gap: 10},
  muteButton: {flex: 1, height: 52, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#e2eadb'},
  muteButtonText: {color: '#36542f', fontSize: 14, fontWeight: '800'},
  endButton: {flex: 1, height: 52, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: '#773f38'},
  endButtonText: {color: '#fff', fontSize: 14, fontWeight: '800'},
  notice: {marginTop: 12, padding: 10, borderRadius: 10, color: '#7a4236', fontSize: 12, lineHeight: 17, backgroundColor: '#f5e5df'},
  transcript: {paddingTop: 14, paddingBottom: 4, gap: 9},
  emptyTranscript: {paddingVertical: 14, color: '#697267', fontSize: 14, lineHeight: 20, textAlign: 'center'},
  messageBubble: {maxWidth: '92%', padding: 11, borderRadius: 13},
  userBubble: {alignSelf: 'flex-end', backgroundColor: '#dcebd5'},
  agentBubble: {alignSelf: 'flex-start', backgroundColor: '#fffdf8', borderWidth: 1, borderColor: '#e6dccd'},
  messageRole: {fontSize: 9, fontWeight: '800', letterSpacing: 0.8, color: '#70845e', marginBottom: 3},
  messageText: {fontSize: 13, lineHeight: 18, color: '#354234'},
});
