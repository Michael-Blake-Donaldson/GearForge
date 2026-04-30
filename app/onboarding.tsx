import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { theme } from "@/constants/theme";
import { regions } from "@/data/regions";
import { useProgressStore, validateUsername } from "@/store/useProgressStore";

const SCREEN_WIDTH = Dimensions.get("window").width;

// ── Slide data ─────────────────────────────────────────────────────────────
// Three slides: Welcome, Region Picker, Username. Data is declarative so we
// can add or reorder slides without touching the render loop.
const SLIDE_COUNT = 3;

export default function OnboardingScreen() {
  const router = useRouter();
  const completeOnboarding = useProgressStore((s) => s.completeOnboarding);

  // Current slide index driven by the FlatList scroll position
  const [slideIndex, setSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Slide 3 state: username input and validation error
  const [username, setUsername] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);

  // Slide 2 state: selected region id
  const [selectedRegion, setSelectedRegion] = useState<string>(regions[0].id);

  // ── Navigation helpers ────────────────────────────────────────────────────

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setSlideIndex(index);
  };

  const handleNext = () => {
    if (slideIndex < SLIDE_COUNT - 1) {
      goToSlide(slideIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    // Validate username before completing onboarding
    const error = validateUsername(username);
    if (error) {
      setNameError(error);
      return;
    }
    setNameError(null);
    // Persist onboarding state and navigate to main app
    completeOnboarding(username.trim(), selectedRegion);
    router.replace("/(tabs)/learn");
  };

  // ── Slide renderers ────────────────────────────────────────────────────────

  const renderSlide = ({ index }: { item: number; index: number }) => {
    if (index === 0) return <WelcomeSlide />;
    if (index === 1)
      return (
        <RegionSlide
          selectedRegion={selectedRegion}
          onSelect={setSelectedRegion}
        />
      );
    return (
      <UsernameSlide
        username={username}
        onChange={(v) => {
          setUsername(v);
          if (nameError) setNameError(validateUsername(v));
        }}
        error={nameError}
      />
    );
  };

  const isLastSlide = slideIndex === SLIDE_COUNT - 1;

  return (
    <View style={styles.screen}>
      {/* Slide pager */}
      <FlatList
        ref={flatListRef}
        data={Array.from({ length: SLIDE_COUNT }, (_, i) => i)}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        scrollEnabled={false} // programmatic only — prevents accidental swipe past validation
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === slideIndex && styles.dotActive]}
          />
        ))}
      </View>

      {/* Navigation buttons */}
      <View style={styles.buttonRow}>
        {slideIndex > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goToSlide(slideIndex - 1)}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.nextButton,
            slideIndex === 0 && styles.nextButtonFull, // full width on first slide
          ]}
          onPress={handleNext}
          activeOpacity={0.7}
        >
          <Text style={styles.nextButtonText}>
            {isLastSlide ? "Start Learning" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ── Slide 1: Welcome ──────────────────────────────────────────────────────

function WelcomeSlide() {
  return (
    <View style={[styles.slide, styles.slideCenter]}>
      <Text style={styles.emoji}>🔧</Text>
      <Text style={styles.slideTitle}>Welcome to GearForge</Text>
      <Text style={styles.slideBody}>
        Learn automotive engineering the way you would learn a language — one
        concept at a time, with quizzes and streaks to keep you sharp.
      </Text>
      <View style={styles.featureList}>
        {[
          "🏁  6 learning regions",
          "📚  30 structured lessons",
          "🎯  Quizzes and XP rewards",
          "🔥  Daily streaks and badges",
        ].map((f) => (
          <Text key={f} style={styles.featureItem}>
            {f}
          </Text>
        ))}
      </View>
    </View>
  );
}

// ── Slide 2: Region Picker ────────────────────────────────────────────────

function RegionSlide({
  selectedRegion,
  onSelect,
}: {
  selectedRegion: string;
  onSelect: (id: string) => void;
}) {
  return (
    <View style={styles.slide}>
      <Text style={styles.slideTitle}>Choose Your Starting Region</Text>
      <Text style={styles.slideBody}>
        Pick the automotive world you want to explore first. You can always
        switch regions later.
      </Text>
      {/* Scrollable region list inside the slide */}
      <ScrollView
        style={styles.regionList}
        showsVerticalScrollIndicator={false}
      >
        {regions.map((region) => {
          const active = region.id === selectedRegion;
          return (
            <TouchableOpacity
              key={region.id}
              style={[
                styles.regionCard,
                active && {
                  borderColor: region.accentColor,
                  backgroundColor: region.accentColor + "18",
                },
              ]}
              onPress={() => onSelect(region.id)}
              activeOpacity={0.7}
            >
              <View style={styles.regionCardRow}>
                <Text
                  style={[
                    styles.regionName,
                    active && { color: region.accentColor },
                  ]}
                >
                  {region.name}
                </Text>
                {active && (
                  <Text style={[styles.checkmark, { color: region.accentColor }]}>
                    ✓
                  </Text>
                )}
              </View>
              <Text style={styles.regionDescription}>{region.description}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

// ── Slide 3: Username ─────────────────────────────────────────────────────

function UsernameSlide({
  username,
  onChange,
  error,
}: {
  username: string;
  onChange: (v: string) => void;
  error: string | null;
}) {
  return (
    <View style={[styles.slide, styles.slideCenter]}>
      <Text style={styles.emoji}>👤</Text>
      <Text style={styles.slideTitle}>What Should We Call You?</Text>
      <Text style={styles.slideBody}>
        Choose a username for your GearForge profile. 3–20 characters,
        letters, numbers, underscores, and hyphens only.
      </Text>

      <TextInput
        style={[styles.usernameInput, error ? styles.usernameInputError : null]}
        value={username}
        onChangeText={onChange}
        placeholder="Enter username"
        placeholderTextColor={theme.colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        returnKeyType="done"
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    paddingBottom: 40,
  },
  // Each slide must be exactly SCREEN_WIDTH wide for paging to work
  slide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  slideCenter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 20,
  },
  slideTitle: {
    color: theme.colors.textPrimary,
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  slideBody: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  featureList: {
    alignSelf: "stretch",
    gap: 12,
  },
  featureItem: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  regionList: {
    flex: 1,
    marginTop: 8,
  },
  regionCard: {
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: 14,
    marginBottom: 10,
  },
  regionCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  regionName: {
    color: theme.colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  checkmark: {
    fontSize: 18,
    fontWeight: "800",
  },
  regionDescription: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  usernameInput: {
    alignSelf: "stretch",
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginTop: 8,
  },
  usernameInputError: {
    borderColor: theme.colors.danger,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
  },
  dotActive: {
    backgroundColor: theme.colors.neon,
    width: 22,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
  },
  backButton: {
    flex: 1,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 14,
    alignItems: "center",
  },
  backButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: "700",
  },
  nextButton: {
    flex: 2,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.neon,
    paddingVertical: 14,
    alignItems: "center",
  },
  nextButtonFull: {
    // First slide — no back button, so next button takes full width
    flex: 1,
  },
  nextButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "800",
  },
});
