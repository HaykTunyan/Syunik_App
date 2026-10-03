import React, {useState} from 'react';
import DateTimePicker, {type DateTimePickerEvent} from '@react-native-community/datetimepicker';
import {CalendarDays, MapPin, Plus, Trash2} from 'lucide-react-native';
import {Alert as NativeAlert, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../config/theme';
import {searchPlaces, type Place} from '../data/places';
import {profileStrings} from '../strings';
import {PlaceSearchInput} from './PlaceSearchInput';

export type Visit = {
  id: string;
  place: string;
  visitedAt: string;
};

type VisitHistoryProps = {
  visits: Visit[];
  onAdd: (place: string, visitedAt: Date) => Promise<boolean>;
  onDelete: (id: string) => void;
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {year: 'numeric', month: 'short', day: 'numeric'}).format(date);
}

export function VisitHistory({visits, onAdd, onDelete}: VisitHistoryProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [visitDate, setVisitDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [hint, setHint] = useState('');

  const sortedVisits = [...visits].sort(
    (left, right) => new Date(right.visitedAt).getTime() - new Date(left.visitedAt).getTime(),
  );

  const selectPlace = (place: Place) => {
    setSelectedPlace(place);
    setQuery(place.name);
    setHint('');
  };

  const changeQuery = (value: string) => {
    setQuery(value);
    setSelectedPlace(null);
  };

  const addVisit = async () => {
    if (!selectedPlace) {
      setHint(profileStrings.visits.selectHint);
      return;
    }

    const saved = await onAdd(selectedPlace.name, visitDate);
    if (saved) {
      setIsAdding(false);
      setQuery('');
      setSelectedPlace(null);
      setVisitDate(new Date());
      setHint('');
    }
  };

  const confirmDelete = (visit: Visit) => {
    NativeAlert.alert(profileStrings.visits.delete, profileStrings.visits.confirmDelete, [
      {text: profileStrings.settings.cancel, style: 'cancel'},
      {
        text: profileStrings.visits.delete,
        style: 'destructive',
        onPress: () => onDelete(visit.id),
      },
    ]);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS !== 'ios') {
      setIsDatePickerVisible(false);
    }
    if (event.type === 'set' && selectedDate) {
      setVisitDate(selectedDate);
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <MapPin size={19} color={colors.brand} />
        <Text style={styles.title}>{profileStrings.visits.title}</Text>
      </View>
      <Text style={styles.description}>{profileStrings.visits.description}</Text>

      {sortedVisits.length ? (
        <View>
          {sortedVisits.map(visit => (
            <View key={visit.id} style={styles.visitRow}>
              <View style={styles.visitInfo}>
                <Text style={styles.placeName}>{visit.place}</Text>
                <Text style={styles.dateText}>{formatDate(new Date(visit.visitedAt))}</Text>
              </View>
              <Pressable
                onPress={() => confirmDelete(visit)}
                style={({pressed}) => [styles.deleteButton, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel={`${profileStrings.visits.delete}: ${visit.place}`}>
                <Trash2 size={18} color={colors.accent} />
              </Pressable>
            </View>
          ))}
          {!isAdding && (
            <Pressable
              onPress={() => setIsAdding(true)}
              style={({pressed}) => [styles.outlineButton, pressed && styles.pressed]}
              accessibilityRole="button">
              <Plus size={17} color={colors.brand} />
              <Text style={styles.outlineButtonText}>{profileStrings.visits.addFirst}</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <MapPin size={24} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>{profileStrings.visits.emptyTitle}</Text>
          <Text style={styles.emptyDescription}>{profileStrings.visits.emptyDescription}</Text>
          {!isAdding && (
            <Pressable
              onPress={() => setIsAdding(true)}
              style={({pressed}) => [styles.primaryButton, pressed && styles.pressed]}
              accessibilityRole="button">
              <Plus size={17} color={colors.white} />
              <Text style={styles.primaryButtonText}>{profileStrings.visits.addFirst}</Text>
            </Pressable>
          )}
        </View>
      )}

      {isAdding && (
        <View style={styles.addForm}>
          <PlaceSearchInput
            label={profileStrings.visits.search}
            query={query}
            placeholder={profileStrings.visits.search}
            noResultsText={profileStrings.visits.noMatches}
            suggestions={query === selectedPlace?.name ? [] : searchPlaces(query)}
            onChangeQuery={changeQuery}
            onSelect={selectPlace}
          />
          <Pressable
            onPress={() => setIsDatePickerVisible(current => !current)}
            style={styles.dateButton}
            accessibilityRole="button"
            accessibilityLabel={profileStrings.visits.chooseDate}>
            <CalendarDays size={18} color={colors.brand} />
            <Text style={styles.dateButtonText}>{formatDate(visitDate)}</Text>
          </Pressable>
          {isDatePickerVisible && (
            <DateTimePicker
              value={visitDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'compact' : 'default'}
              maximumDate={new Date()}
              onChange={onDateChange}
            />
          )}
          {!!hint && <Text style={styles.hint}>{hint}</Text>}
          <Pressable
            onPress={addVisit}
            style={({pressed}) => [styles.primaryButton, pressed && styles.pressed]}
            accessibilityRole="button">
            <Plus size={17} color={colors.white} />
            <Text style={styles.primaryButtonText}>{profileStrings.visits.addFirst}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {marginTop: 28},
  heading: {flexDirection: 'row', alignItems: 'center', gap: 9},
  title: {color: colors.text, fontSize: 19, fontWeight: '800'},
  description: {color: colors.textSecondary, fontSize: 14, lineHeight: 20, marginTop: 6, marginBottom: 14},
  visitRow: {minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.inputBorder},
  visitInfo: {flex: 1, paddingVertical: 8},
  placeName: {color: colors.text, fontSize: 15, fontWeight: '700'},
  dateText: {color: colors.textMuted, fontSize: 12, marginTop: 4},
  deleteButton: {width: 44, height: 44, alignItems: 'center', justifyContent: 'center'},
  emptyState: {alignItems: 'center', paddingVertical: 22},
  emptyTitle: {color: colors.text, fontSize: 16, fontWeight: '800', marginTop: 10},
  emptyDescription: {color: colors.textSecondary, fontSize: 13, textAlign: 'center', marginTop: 5},
  addForm: {gap: 10, marginTop: 12},
  dateButton: {minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 8, backgroundColor: colors.surface, paddingHorizontal: 14},
  dateButtonText: {color: colors.text, fontSize: 14, fontWeight: '700'},
  hint: {color: colors.accent, fontSize: 12},
  primaryButton: {minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, backgroundColor: colors.brand, paddingHorizontal: 18, marginTop: 12},
  primaryButtonText: {color: colors.white, fontSize: 14, fontWeight: '800'},
  outlineButton: {minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.brand, marginTop: 14},
  outlineButtonText: {color: colors.brand, fontSize: 14, fontWeight: '800'},
  pressed: {opacity: 0.8},
});