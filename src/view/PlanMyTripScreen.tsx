import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CalendarDays, Check, ChevronRight, MapPin, Sparkles } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderBack } from '../components/HeaderBack';
import { colors } from '../config/theme';
import type { TransportType, TripDuration, TripInterest } from '../features/trips/types';

import {
  useTripPlannerStore,
  type TripStartingLocation,
} from '../features/trips/store/tripPlannerStore';

type PlanMyTripScreenProps = {
  onBack: () => void;
  onCreateItinerary: () => void;
};

type DurationOption = { label: string; value: TripDuration };

const durationOptions: DurationOption[] = [
  { label: '2 hours', value: '2_hours' },
  { label: 'Half day', value: 'half_day' },
  { label: '1 day', value: '1_day' },
  { label: '2–3 days', value: '2_3_days' },
  { label: '1 week', value: '1_week' },
];

const interestOptions: Array<{ label: string; value: TripInterest; icon: string }> = [
  { label: 'Nature', value: 'nature', icon: '🏔' },
  { label: 'History', value: 'history', icon: '🏛' },
  { label: 'Adventure', value: 'adventure', icon: '🥾' },
  { label: 'Food', value: 'food', icon: '🍽' },
  { label: 'Photography', value: 'photography', icon: '📸' },
  { label: 'Culture', value: 'culture', icon: '🏘' },
  { label: 'Relaxation', value: 'relaxation', icon: '🌅' },
];

const startingLocations: Array<{ label: string; value: TripStartingLocation; icon?: string }> = [
  { label: 'Use my current location', value: 'Use my current location', icon: '📍' },
  { label: 'Kapan', value: 'Kapan' },
  { label: 'Goris', value: 'Goris' },
  { label: 'Tatev', value: 'Tatev' },
  { label: 'Meghri', value: 'Meghri' },
  { label: 'Sisian', value: 'Sisian' },
];

const transportationOptions: Array<{ label: string; value: TransportType; icon: string }> = [
  { label: 'Car', value: 'car', icon: '🚗' },
  { label: 'Taxi', value: 'taxi', icon: '🚕' },
  { label: 'Public transport', value: 'public_transport', icon: '🚌' },
  { label: 'Walking', value: 'walking', icon: '🚶' },
];

export function PlanMyTripScreen({ onBack, onCreateItinerary }: PlanMyTripScreenProps) {

  /**
   * 
   * PlanMy Trip Screen 
   */


  const preferences = useTripPlannerStore(state => state.preferences);
  const generateItinerary = useTripPlannerStore(state => state.generateItinerary);
  const insets = useSafeAreaInsets();
  const isMounted = useRef(true);
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState<DurationOption | null>(null);
  const [interests, setInterests] = useState<TripInterest[]>([]);
  const [startingLocation, setStartingLocation] = useState<TripStartingLocation | null>(null);
  const [transportation, setTransportation] = useState<TransportType | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  const toggleInterest = useCallback((interest: TripInterest) => {
    setInterests(current =>
      current.includes(interest)
        ? current.filter(item => item !== interest)
        : [...current, interest],
    );
  }, []);

  const goBack = useCallback(() => {
    if (step === 1) {
      onBack();
      return;
    }
    setStep(current => current - 1);
  }, [onBack, step]);

  const canContinue = step === 1
    ? duration !== null
    : step === 2
      ? interests.length > 0
      : step === 3
        ? startingLocation !== null
        : transportation !== null;

  const continueToNextStep = useCallback(async () => {
    if (!canContinue || isCreating) {
      return;
    }

    if (step < 4) {
      setStep(current => current + 1);
      return;
    }

    if (!duration || !startingLocation || !transportation || interests.length === 0) {
      return;
    }

    setIsCreating(true);
    await new Promise<void>(resolve => setTimeout(resolve, 450));
    if (!isMounted.current) {
      return;
    }

    const nextPreferences = {
      ...preferences,
      duration: duration.value,
      durationLabel: duration.label,
      interests,
      startingLocation,
      transportation,
    };
    setIsCreating(false);
    generateItinerary(nextPreferences);
    onCreateItinerary();
  }, [canContinue, duration, generateItinerary, interests, isCreating, onCreateItinerary, preferences, startingLocation, step, transportation]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}><HeaderBack onBack={goBack} /></View>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{step} / 4</Text>
        <Text style={styles.progressHint}>PLAN YOUR TRIP</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${step * 25}%` }]} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {renderStep({
          step,
          duration,
          interests,
          startingLocation,
          transportation,
          setDuration,
          toggleInterest,
          setStartingLocation,
          setTransportation,
        })}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(20, insets.bottom + 12) }]}>
        <Pressable
          accessibilityLabel={step === 4 ? 'Create my itinerary' : 'Continue'}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canContinue || isCreating, busy: isCreating }}
          onPress={continueToNextStep}
          disabled={!canContinue || isCreating}
          style={({ pressed }) => [styles.continueButton, !canContinue && styles.continueButtonDisabled, pressed && styles.pressed]}>
          {isCreating ? <ActivityIndicator color={colors.white} /> : <>{step === 4 && <Sparkles size={18} color={colors.white} />}<Text style={[styles.continueButtonText, !canContinue && styles.continueButtonTextDisabled]}>{step === 4 ? 'Create my itinerary' : 'Continue'}</Text>{step < 4 && <ChevronRight size={19} color={colors.white} />}</>}
        </Pressable>
      </View>
    </View>
  );
}

type StepContentProps = {
  step: number;
  duration: DurationOption | null;
  interests: TripInterest[];
  startingLocation: TripStartingLocation | null;
  transportation: TransportType | null;
  setDuration: (option: DurationOption) => void;
  toggleInterest: (interest: TripInterest) => void;
  setStartingLocation: (location: TripStartingLocation) => void;
  setTransportation: (transportation: TransportType) => void;
};

function renderStep(props: StepContentProps): React.ReactNode {
  if (props.step === 1) {
    return (
      <StepFrame eyebrow="A LITTLE CONTEXT" title="How much time do you have?" subtitle="We’ll shape the route around the time you can enjoy in Syunik.">
        <View style={styles.optionList}>
          {durationOptions.map(option => (
            <ChoiceRow key={option.label} label={option.label} selected={props.duration?.label === option.label} onPress={() => props.setDuration(option)} />
          ))}
        </View>
      </StepFrame>
    );
  }

  if (props.step === 2) {
    return (
      <StepFrame eyebrow="FOLLOW YOUR CURIOSITY" title="What are you interested in?" subtitle="Pick as many as you like. Your route can hold more than one kind of magic.">
        <View style={styles.interestGrid}>
          {interestOptions.map(option => (
            <ChoiceTile key={option.value} label={option.label} icon={option.icon} selected={props.interests.includes(option.value)} onPress={() => props.toggleInterest(option.value)} />
          ))}
        </View>
      </StepFrame>
    );
  }

  if (props.step === 3) {
    return (
      <StepFrame eyebrow="SET YOUR STARTING POINT" title="Where are you starting from?" subtitle="This helps us shape a natural first day. You can change it later.">
        <View style={styles.optionList}>
          {startingLocations.map(option => (
            <ChoiceRow key={option.value} label={option.label} icon={option.icon} selected={props.startingLocation === option.value} onPress={() => props.setStartingLocation(option.value)} />
          ))}
        </View>
        <View style={styles.mockNote}><MapPin size={14} color={colors.textMuted} /><Text style={styles.mockNoteText}>Current location is mocked for now.</Text></View>
      </StepFrame>
    );
  }

  return (
    <StepFrame eyebrow="THE WAY YOU MOVE" title="How will you travel?" subtitle="Choose the rhythm that feels right for your Syunik adventure.">
      <View style={styles.optionList}>
        {transportationOptions.map(option => (
          <ChoiceRow key={option.value} label={option.label} icon={option.icon} selected={props.transportation === option.value} onPress={() => props.setTransportation(option.value)} />
        ))}
      </View>
      <View style={styles.readyCard}><CalendarDays size={19} color={colors.accent} /><Text style={styles.readyText}>Your itinerary will be a flexible mock plan based on these choices.</Text></View>
    </StepFrame>
  );
}

function StepFrame({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: React.ReactNode }) {

  return (
    <View>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.stepBody}>{children}</View>
    </View>
  )
    ;
}

function ChoiceRow({ label, icon, selected, onPress }: { label: string; icon?: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityLabel={`${label}${selected ? ', selected' : ''}`} accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.choiceRow, selected && styles.choiceRowSelected, pressed && styles.pressed]}>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <Check size={14} color={colors.white} />}
      </View>
      {icon && <Text style={styles.choiceIcon}>{icon}</Text>}
      <Text style={[styles.choiceLabel, selected && styles.choiceLabelSelected]}>{label}</Text>
      <ChevronRight size={18} color={selected ? colors.white : colors.textMuted} />
    </Pressable>
  );
}

function ChoiceTile({ label, icon, selected, onPress }: { label: string; icon: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityLabel={`${label}${selected ? ', selected' : ''}`} accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.choiceTile, selected && styles.choiceTileSelected, pressed && styles.pressed]}>
      <Text style={styles.tileIcon}>{icon}</Text>
      <Text style={[styles.tileLabel, selected && styles.tileLabelSelected]}>
        {label}
        </Text>{selected && <View style={styles.tileCheck}>
        <Check size={12} color={colors.white} /></View>
        }
      </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16 },
  progressHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  progressLabel: { color: colors.text, fontSize: 14, fontWeight: '800' },
  progressHint: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1.3 },
  progressTrack: { backgroundColor: colors.border, borderRadius: 4, height: 5, marginHorizontal: 20, marginTop: 10, overflow: 'hidden' },
  progressFill: { backgroundColor: colors.accent, borderRadius: 4, height: '100%' },
  scroll: { flex: 1 },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 30 },
  eyebrow: { color: colors.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1.3 },
  title: { color: colors.text, fontSize: 29, fontWeight: '800', letterSpacing: -0.5, marginTop: 13 },
  subtitle: { color: colors.textSecondary, fontSize: 15, lineHeight: 22, marginTop: 8 },
  stepBody: { marginTop: 28 },
  optionList: { gap: 10 },
  choiceRow: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 15, borderWidth: 1, flexDirection: 'row', minHeight: 58, paddingHorizontal: 14 },
  choiceRowSelected: { backgroundColor: colors.brand, borderColor: colors.brand },
  radio: { alignItems: 'center', borderColor: colors.inputBorder, borderRadius: 10, borderWidth: 1.5, height: 20, justifyContent: 'center', width: 20 },
  radioSelected: { backgroundColor: colors.accent, borderColor: colors.accent },
  choiceIcon: { fontSize: 18, marginLeft: 10 },
  choiceLabel: { color: colors.text, flex: 1, fontSize: 15, fontWeight: '700', marginLeft: 12 },
  choiceLabelSelected: { color: colors.white },
  interestGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  choiceTile: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 15, borderWidth: 1, minHeight: 104, justifyContent: 'center', paddingHorizontal: 8, position: 'relative', width: '31%' },
  choiceTileSelected: { backgroundColor: colors.brand, borderColor: colors.brand },
  tileIcon: { fontSize: 26 },
  tileLabel: { color: colors.text, fontSize: 12, fontWeight: '700', marginTop: 7, textAlign: 'center' },
  tileLabelSelected: { color: colors.white },
  tileCheck: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: 9, height: 18, justifyContent: 'center', position: 'absolute', right: 7, top: 7, width: 18 },
  mockNote: { alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 14 },
  mockNoteText: { color: colors.textMuted, fontSize: 12 },
  readyCard: { alignItems: 'center', backgroundColor: colors.surfaceAlt, borderColor: colors.border, borderRadius: 15, borderWidth: 1, flexDirection: 'row', gap: 10, marginTop: 19, padding: 14 },
  readyText: { color: colors.textSecondary, flex: 1, fontSize: 12, lineHeight: 18 },
  footer: { backgroundColor: colors.background, borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth, padding: 20 },
  continueButton: { alignItems: 'center', backgroundColor: colors.accent, borderRadius: 13, flexDirection: 'row', gap: 8, justifyContent: 'center', minHeight: 52 },
  continueButtonDisabled: { backgroundColor: colors.inputBorder },
  continueButtonText: { color: colors.white, fontSize: 15, fontWeight: '800' },
  continueButtonTextDisabled: { color: colors.textMuted },
  pressed: { opacity: 0.78 },
});
