export enum Relationship {
  Girlfriend = "Girlfriend",
  Boyfriend = "Boyfriend",
  Wife = "Wife",
  Husband = "Husband",
  Friend = "Friend",
  FamilyMember = "Family Member",
  Boss = "Boss",
  Client = "Client",
  Colleague = "Colleague",
}

export enum Mood {
  Angry = "Angry 😠",
  Sad = "Sad 😢",
  Silent = "Silent 🤫",
  Ignoring = "Ignoring 😒",
  Disappointed = "Disappointed 😞",
  MixedEmotions = "Mixed Emotions 😕",
}

export enum Topic {
  Apology = "Apology 💔",
  EmotionalMessage = "Emotional Message 💬",
  CallScheduler = "Call Scheduler 📞",
  LoveAndCare = "Love & Care ❤️",
  SpecialMemory = "Special Memory 🌸",
}

export interface FormData {
  relationship: Relationship;
  mood: Mood;
  mistake: string;
  topic: Topic;
  useEmojis: boolean;
  language: string;
  colors: {
    background: string;
  };
}
