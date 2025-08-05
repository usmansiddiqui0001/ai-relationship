import { Topic, Mood, Relationship } from './types';

export const RELATIONSHIP_OPTIONS = [
    { value: Relationship.Girlfriend, label: "Girlfriend 👩‍❤️‍👨" },
    { value: Relationship.Boyfriend, label: "Boyfriend 👨‍❤️‍💋‍👨" },
    { value: Relationship.Wife, label: "Wife 💍" },
    { value: Relationship.Husband, label: "Husband 🤵" },
    { value: Relationship.Friend, label: "Friend 🤗" },
    { value: Relationship.FamilyMember, label: "Family Member 👨‍👩‍👧‍👦" },
    { value: Relationship.Boss, label: "Boss 👔" },
    { value: Relationship.Client, label: "Client 🤝" },
    { value: Relationship.Colleague, label: "Colleague 🧑‍💼" },
];

export const MOOD_OPTIONS = [
  { value: Mood.Angry, label: "Angry 😠" },
  { value: Mood.Sad, label: "Sad 😢" },
  { value: Mood.Silent, label: "Silent 🤫" },
  { value: Mood.Ignoring, label: "Ignoring 😒" },
  { value: Mood.Disappointed, label: "Disappointed 😞" },
  { value: Mood.MixedEmotions, label: "Mixed Emotions 😕" },
];

export const TOPIC_OPTIONS = [
  { value: Topic.Apology, label: "Apology 💔" },
  { value: Topic.EmotionalMessage, label: "Emotional Message 💬" },
  { value: Topic.CallScheduler, label: "Call Scheduler 📞" },
  { value: Topic.LoveAndCare, label: "Love & Care ❤️" },
  { value: Topic.SpecialMemory, label: "Special Memory 🌸" },
];

export const LANGUAGE_OPTIONS = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi (हिन्दी)" },
    { value: "Spanish", label: "Spanish (Español)" },
    { value: "French", label: "French (Français)" },
    { value: "German", label: "German (Deutsch)" },
    { value: "Mandarin Chinese", label: "Mandarin Chinese (普通话)" },
];


export const DEFAULT_COLORS = {
  background: "#ff9999",
};
