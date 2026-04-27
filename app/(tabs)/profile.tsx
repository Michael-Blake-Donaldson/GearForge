import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import Badge from '@/components/Badge';
import { theme } from '@/constants/theme';
import { useProgressStore } from '@/store/useProgressStore';

export default function ProfileScreen() {
  const username = useProgressStore((state) => state.username);
  const xp = useProgressStore((state) => state.xp);
  const level = useProgressStore((state) => state.level);
  const getRank = useProgressStore((state) => state.getRank);
  const badges = useProgressStore((state) => state.badges);
  const setUsername = useProgressStore((state) => state.setUsername);

  const [draftName, setDraftName] = useState(username);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={draftName}
          onChangeText={setDraftName}
          placeholder="Enter username"
          placeholderTextColor={theme.colors.textSecondary}
        />

        <Pressable style={styles.saveButton} onPress={() => setUsername(draftName.trim() || 'GearSmith')}>
          <Text style={styles.saveText}>Save Name</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>XP</Text>
        <Text style={styles.value}>{xp}</Text>

        <Text style={styles.label}>Level</Text>
        <Text style={styles.value}>{level}</Text>

        <Text style={styles.label}>Rank</Text>
        <Text style={styles.value}>{getRank()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.badgesTitle}>Achievements</Text>
        <View style={styles.badgesWrap}>
          {badges.length === 0 ? (
            <Text style={styles.empty}>Complete lessons to unlock achievements.</Text>
          ) : (
            badges.map((badge) => <Badge key={badge} label={badge} />)
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
    gap: 12,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  card: {
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  input: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    color: theme.colors.textPrimary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 8,
  },
  saveButton: {
    marginTop: 10,
    borderRadius: theme.radii.md,
    alignItems: 'center',
    backgroundColor: theme.colors.neon,
    paddingVertical: 10,
  },
  saveText: {
    color: '#07191b',
    fontWeight: '800',
  },
  badgesTitle: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  badgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  empty: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
});
