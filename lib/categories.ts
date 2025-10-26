import { Utensils, Users, PawPrint, Bus, Music, Home, Shirt, Sparkles, HeartPulse, GraduationCap, Gift, MoreHorizontal, Wallet, Banknote, Coins, Gem } from "lucide-react";

export const expenseCategories = [
  { value: "Food", label: "Food", icon: Utensils },
  { value: "Social Life", label: "Social Life", icon: Users },
  { value: "Pets", label: "Pets", icon: PawPrint },
  { value: "Transport", label: "Transport", icon: Bus },
  { value: "Culture", label: "Culture", icon: Music },
  { value: "Household", label: "Household", icon: Home },
  { value: "Apparel", label: "Apparel", icon: Shirt },
  { value: "Beauty", label: "Beauty", icon: Sparkles },
  { value: "Health", label: "Health", icon: HeartPulse },
  { value: "Education", label: "Education", icon: GraduationCap },
  { value: "Gift", label: "Gift", icon: Gift },
  { value: "Other", label: "Other", icon: MoreHorizontal },
];

export const incomeCategories = [
  { value: "Allowance", label: "Allowance", icon: Wallet },
  { value: "Salary", label: "Salary", icon: Banknote },
  { value: "Pretty Cash", label: "Pretty Cash", icon: Coins },
  { value: "Bonus", label: "Bonus", icon: Gem },
  { value: "Other", label: "Other", icon: MoreHorizontal },
];
